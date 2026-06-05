import { generate_train_icon_2 } from "./editor_visualstuff.js";
import { autotime, autoprogress } from "./editor_helpers.js";

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function nextUniqueLineId(vm) {
    const used = new Set(vm.lines.map(l => Number(l.line_id)).filter(n => Number.isFinite(n)));
    let candidate = used.size > 0 ? Math.max(...used) + 1 : 1;
    while (used.has(candidate)) candidate += 1;
    return candidate;
}

export function nextUniqueBranchId(vm, lineIndex) {
    const branches = vm.lines[lineIndex]?.branches || [];
    const used = new Set(branches.map(b => Number(b.branch_id)).filter(n => Number.isFinite(n)));
    let candidate = used.size > 0 ? Math.max(...used) + 1 : 0;
    while (used.has(candidate)) candidate += 1;
    return candidate;
}

export function nextUniqueLineName(vm, baseName) {
    const used = new Set(vm.lines.map(l => (l.name || '').trim()).filter(Boolean));
    const base = (baseName || 'New Line').trim() || 'New Line';
    let candidate = `${base} (Copy)`;
    if (!used.has(candidate)) return candidate;
    let i = 2;
    while (used.has(`${candidate} ${i}`)) i += 1;
    return `${candidate} ${i}`;
}

export function addLine(vm) {
    const newLine = {
        line_id: vm.lines.length + 1,
        name: 'New Line',
        line_color: '#' + Math.floor(Math.random()*16777215).toString(16),
        branches: []
    };
    vm.lines.push(newLine);
    vm.activeTab = vm.lines.length - 1;
}

export function cloneLine(vm, lineIndex) {
    const original = vm.lines[lineIndex];
    if (!original) return;

    const cloned = deepClone(original);
    cloned.line_id = nextUniqueLineId(vm);
    cloned.name = nextUniqueLineName(vm, original.name);

    vm.lines.splice(lineIndex + 1, 0, cloned);
    vm.activeTab = lineIndex + 1;
}

export function requestDeleteLine(vm, lineIndex) {
    const lineName = vm.lines[lineIndex].name || `Line ${lineIndex + 1}`;
    vm.confirmModal = {
        show: true,
        message: `Are you sure you want to delete "${lineName}"? This will remove the entire line and all its branches and stations.`,
        pendingDelete: { type: 'line', lineIndex }
    };
}

export function requestDeleteBranch(vm, lineIndex, branchIndex) {
    const lineName = vm.lines[lineIndex].name || `Line ${lineIndex + 1}`;
    vm.confirmModal = {
        show: true,
        message: `Are you sure you want to delete Branch ${branchIndex + 1} of "${lineName}"? All stations in this branch will be removed.`,
        pendingDelete: { type: 'branch', lineIndex, branchIndex }
    };
}

export function requestDeleteStation(vm, lineIndex, branchIndex, stationIndex) {
    const stationName = vm.lines[lineIndex].branches[branchIndex].stations[stationIndex].name || 'this station';
    vm.confirmModal = {
        show: true,
        message: `Are you sure you want to delete the station "${stationName}"?`,
        pendingDelete: { type: 'station', lineIndex, branchIndex, stationIndex }
    };
}

export function requestDeleteCheckpoint(vm, lineIndex, branchIndex, stationIndex, checkpointIndex) {
    vm.confirmModal = {
        show: true,
        message: `Are you sure you want to delete Checkpoint ${checkpointIndex + 1}?`,
        pendingDelete: { type: 'checkpoint', lineIndex, branchIndex, stationIndex, checkpointIndex }
    };
}

export function confirmDelete(vm) {
    const p = vm.confirmModal.pendingDelete;
    if (!p) return;
    if (p.type === 'line') deleteLine(vm, p.lineIndex);
    else if (p.type === 'branch') deleteBranch(vm, p.lineIndex, p.branchIndex);
    else if (p.type === 'station') deleteStation(vm, p.lineIndex, p.branchIndex, p.stationIndex);
    else if (p.type === 'checkpoint') deleteCheckpoint(vm, p.lineIndex, p.branchIndex, p.stationIndex, p.checkpointIndex);
    vm.confirmModal = { show: false, message: '', pendingDelete: null };
}

export function cancelDelete(vm) {
    vm.confirmModal = { show: false, message: '', pendingDelete: null };
}

export function deleteLine(vm, lineIndex) {
    vm.lines.splice(lineIndex, 1);
    if (vm.activeTab >= vm.lines.length && vm.activeTab > 0) {
        vm.activeTab = vm.lines.length - 1;
    }
}

export function addBranch(vm, lineIndex) {
    vm.lines[lineIndex].branches.push({
        branch_id: vm.lines[lineIndex].branches.length,
        SPAWN_EVERY: 300,
        offset_time: 0,
        stations: []
    });
    vm.setActiveBranchTab(lineIndex, vm.lines[lineIndex].branches.length - 1);
}

export function cloneBranch(vm, lineIndex, branchIndex) {
    const line = vm.lines[lineIndex];
    const original = line?.branches?.[branchIndex];
    if (!line || !original) return;

    const cloned = deepClone(original);
    cloned.branch_id = nextUniqueBranchId(vm, lineIndex);

    line.branches.splice(branchIndex + 1, 0, cloned);
    vm.setActiveBranchTab(lineIndex, branchIndex + 1);
}

export function deleteBranch(vm, lineIndex, branchIndex) {
    vm.lines[lineIndex].branches.splice(branchIndex, 1);
    if (vm.getActiveBranchTab(lineIndex) >= vm.lines[lineIndex].branches.length && vm.getActiveBranchTab(lineIndex) > 0) {
        vm.setActiveBranchTab(lineIndex, vm.lines[lineIndex].branches.length - 1);
    }
}

export function updateicon(vm, lineIndex) {
    vm.lines[lineIndex].icon = generate_train_icon_2(vm.lines[lineIndex].markertype, vm.lines[lineIndex].line_color, vm.lines[lineIndex].label, vm.lines[lineIndex].image);
    console.log(vm.lines[lineIndex].icon);
}

export function addStation(vm, lineIndex, branchIndex) {
    let branch_length = vm.lines[lineIndex].branches[branchIndex].stations.length;
    let default_lat = 0, default_lng = 0;
    if (branch_length > 0) {
        default_lat = vm.lines[lineIndex].branches[branchIndex].stations[branch_length - 1].lat;
        default_lng = vm.lines[lineIndex].branches[branchIndex].stations[branch_length - 1].lng;
    } else {
        default_lat = 22;
        default_lng = 140;
    }
    const newStation = {
        name: 'New Station',
        lat: default_lat,
        lng: default_lng,
        run: 90,
        dwell: 30
    };
    vm.lines[lineIndex].branches[branchIndex].stations.push(newStation);
    const stationIndex = vm.lines[lineIndex].branches[branchIndex].stations.length - 1;
    vm.coordinateMode = { target: 'station', lineIndex, branchIndex, stationIndex };
}

export function deleteStation(vm, lineIndex, branchIndex, stationIndex) {
    vm.lines[lineIndex].branches[branchIndex].stations.splice(stationIndex, 1);
}

export function addCheckpoint(vm, lineIndex, branchIndex, stationIndex) {
    const station = vm.lines[lineIndex].branches[branchIndex].stations[stationIndex];
    if (!station.checkpoints) {
        station.checkpoints = [];
    }
    station.checkpoints.push({
        lat: station.lat,
        lng: station.lng,
        progress: 1
    });
    const checkpointIndex = station.checkpoints.length - 1;
    vm.coordinateMode = { target: 'checkpoint', lineIndex, branchIndex, stationIndex, checkpointIndex };
}

export function insertCheckpointAt(vm, lineIndex, branchIndex, stationIndex, insertIndex) {
    const station = vm.lines[lineIndex].branches[branchIndex].stations[stationIndex];
    if (!station.checkpoints) {
        station.checkpoints = [];
    }
    const newCheckpoint = {
        lat: station.lat,
        lng: station.lng,
        progress: 0.5
    };
    station.checkpoints.splice(insertIndex, 0, newCheckpoint);
    vm.coordinateMode = { target: 'checkpoint', lineIndex, branchIndex, stationIndex, checkpointIndex: insertIndex };
    vm.mapHighlight = { type: 'checkpoint', lineIndex, branchIndex, stationIndex, checkpointIndex: insertIndex };
    vm.updateMap(false);
}

export function deleteCheckpoint(vm, lineIndex, branchIndex, stationIndex, checkpointIndex) {
    vm.lines[lineIndex].branches[branchIndex].stations[stationIndex].checkpoints.splice(checkpointIndex, 1);
}

export function moveStationUp(vm, lineIndex, branchIndex, stationIndex) {
    if (stationIndex <= 0) return;
    const stations = vm.lines[lineIndex].branches[branchIndex].stations;
    const tmp = stations[stationIndex - 1];
    stations[stationIndex - 1] = stations[stationIndex];
    stations[stationIndex] = tmp;

    if (vm.coordinateMode &&
        vm.coordinateMode.lineIndex === lineIndex &&
        vm.coordinateMode.branchIndex === branchIndex &&
        vm.coordinateMode.target === 'station') {
        if (vm.coordinateMode.stationIndex === stationIndex) vm.coordinateMode.stationIndex = stationIndex - 1;
        else if (vm.coordinateMode.stationIndex === stationIndex - 1) vm.coordinateMode.stationIndex = stationIndex;
    }

    if (vm.coordinateMode &&
        vm.coordinateMode.lineIndex === lineIndex &&
        vm.coordinateMode.branchIndex === branchIndex &&
        vm.coordinateMode.target === 'checkpoint') {
        if (vm.coordinateMode.stationIndex === stationIndex) vm.coordinateMode.stationIndex = stationIndex - 1;
        else if (vm.coordinateMode.stationIndex === stationIndex - 1) vm.coordinateMode.stationIndex = stationIndex;
    }
    vm.updateMap(false);
}

export function moveCheckpointUp(vm, lineIndex, branchIndex, stationIndex, checkpointIndex) {
    if (checkpointIndex <= 0) return;
    const station = vm.lines[lineIndex].branches[branchIndex].stations[stationIndex];
    if (!station.checkpoints || !Array.isArray(station.checkpoints)) return;
    const checkpoints = station.checkpoints;
    const tmp = checkpoints[checkpointIndex - 1];
    checkpoints[checkpointIndex - 1] = checkpoints[checkpointIndex];
    checkpoints[checkpointIndex] = tmp;

    if (vm.coordinateMode &&
        vm.coordinateMode.target === 'checkpoint' &&
        vm.coordinateMode.lineIndex === lineIndex &&
        vm.coordinateMode.branchIndex === branchIndex &&
        vm.coordinateMode.stationIndex === stationIndex) {
        if (vm.coordinateMode.checkpointIndex === checkpointIndex) vm.coordinateMode.checkpointIndex = checkpointIndex - 1;
        else if (vm.coordinateMode.checkpointIndex === checkpointIndex - 1) vm.coordinateMode.checkpointIndex = checkpointIndex;
    }
    vm.updateMap(false);
}

export function calculate_progress(vm, lineIndex, branchIndex, stationIndex) {
    let i = lineIndex;
    let j = branchIndex;
    let k = stationIndex;
    let this_station = vm.lines[i].branches[j].stations[k];
    if (!this_station.hasOwnProperty("checkpoints")) {
        return;
    }
    if (this_station.checkpoints.length == 0) {
        return;
    }
    let next_lat = 0;
    let next_lng = 0;
    if (k == vm.lines[i].branches[j].stations.length - 1) {
        if (vm.lines[i].branches[j].hasOwnProperty("branch_type")) {
            if (vm.lines[i].branches[j].branch_type == "circular") {
                next_lat = vm.lines[i].branches[j].stations[0].lat;
                next_lng = vm.lines[i].branches[j].stations[0].lng;
            } else {
                return;
            }
        }
    } else {
        next_lat = vm.lines[i].branches[j].stations[k + 1].lat;
        next_lng = vm.lines[i].branches[j].stations[k + 1].lng;
    }

    let got_array = autoprogress(this_station, next_lat, next_lng);
    for (let l = 0; l < this_station.checkpoints.length; l++) {
        vm.lines[i].branches[j].stations[k].checkpoints[l].progress = got_array[l];
    }
}

export function calculate_allprogresses(vm, lineIndex, branchIndex) {
    for (let i = 0; i < vm.lines[lineIndex].branches[branchIndex].stations.length; i++) {
        calculate_progress(vm, lineIndex, branchIndex, i);
    }
}

export function calculate_traveltimes(vm, lineIndex, branchIndex) {
    let i = lineIndex;
    let j = branchIndex;
    let this_branch = vm.lines[i].branches[j];

    if (!vm.lines[i].hasOwnProperty("max_speed")) {
        vm.lines[i].max_speed = 20;
    }
    if (!vm.lines[i].hasOwnProperty("acceleration")) {
        vm.lines[i].acceleration = 0.8;
    }

    let circularornot = false;
    if (this_branch.hasOwnProperty("branch_type")) {
        if (this_branch.branch_type == "circular") {
            circularornot = true;
        }
    }
    let got_array = autotime(vm.lines[i].branches[j].stations, vm.lines[i].max_speed, vm.lines[i].acceleration, circularornot);
    console.log(got_array);
    for (let k = 0; k < got_array.length; k++) {
        vm.lines[i].branches[j].stations[k].run = Math.ceil(got_array[k]);
    }
}
