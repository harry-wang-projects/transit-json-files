//some variables
//seconds in one tick
let TICK_LENGTH = 1;

//map here

let accel_func = [0.0002380952381,0.0009523809524,0.002142857143,0.00380952381,0.005952380952,0.008571428571,0.01166666667,0.01523809524,0.01928571429,0.02380952381,0.02880952381,0.03428571429,0.04023809524,0.04666666667,0.05357142857,0.06095238095,0.06880952381,0.07714285714,0.08595238095,0.09523809524,0.105,0.1152380952,0.125952381,0.1371428571,0.1488095238,0.160952381,0.1735714286,0.1866666667,0.2002380952,0.2142857143,0.2285714286,0.2428571429,0.2571428571,0.2714285714,0.2857142857,0.3, 0.3142857143,0.3285714286,0.3428571429,0.3571428571,0.3714285714,0.3857142857,0.4,0.4142857143,0.4285714286,0.4428571429,0.4571428571,0.4714285714,0.4857142857,0.5,0.5142857143,0.5285714286,0.5428571429,0.5571428571,0.5714285714,0.5857142857,0.6,0.6142857143,0.6285714286,0.6428571429,0.6571428571,0.6714285714,0.6857142857,0.7,0.7142857143,0.7285714286,0.7428571429,0.7571428571,0.7714285714,0.7857142857,0.7997619048,0.8133333333,0.8264285714,0.839047619,0.8511904762,0.8628571429,0.874047619,0.8847619048,0.895,0.9047619048,0.914047619,0.9228571429,0.9311904762,0.939047619,0.9464285714,0.9533333333,0.9597619048,0.9657142857,0.9711904762,0.9761904762,0.9807142857,0.9847619048,0.9883333333,0.9914285714,0.994047619,0.9961904762,0.9978571429,0.999047619,0.9997619048,1]

/* =========  CONFIGURATION  ============================================= */
//run = seconds from station i to station i + 1
//dwell = seconds stopped at station i
// Lines are composed of branches. Each branch can have different routes, frequencies, and offset times.
let lines = [
  {
    line_id: 2,
    name: "Disneyland Resort Line",
    line_color: "#f173ac",
    markertype: "hkmtr",
    image: "assets/mtr_train1.png",
    branches: [
      {
        branch_id: 0,
        SPAWN_EVERY: 300,
        offset_time: 0,
        stations: [
    {name:"Sunny Bay", lat:22.3317, lng:114.0289, run:210, dwell:90, checkpoints: [{lat:22.3332, lng:114.0316, progress: 0.1}, {lat:22.3306, lng:114.0355, progress: 0.25}, {lat:22.3173, lng:114.0374, progress: 0.8}]},
    {name:"Disneyland Resort", lat:22.3156, lng:114.0450, run:90, dwell:90},
        ]
      }
    ]
  },
  {
    line_id: 3,
    name: "Tseung Kwan O line",
    line_color: "#7d499d",
    markertype: "hkmtr",
    image: "assets/train1.png",
    branches: [
      {
        branch_id: 0,
        SPAWN_EVERY: 396,
        offset_time: 0,
        stations: [
          {name:"North Point", lat:22.2908, lng:114.2008, run:90, dwell:90},
          {name:"Quarry Bay", lat:22.2878, lng:114.2097, run:210, dwell:30},
          {name:"Yau Tong", lat:22.2978, lng:114.2372, run:150, dwell:30, checkpoints: [{lat:22.2944, lng:114.2419, progress: 0.3}]},
          {name:"Tiu Keng Leng", lat:22.3042, lng:114.2525, run:90, dwell:30},
          {name:"Tseung Kwan O", lat:22.3075, lng:114.2600, run:90, dwell:30},
          {name:"Hang Hau", lat:22.3156, lng:114.2644, run:90, dwell:30},
          {name:"Po Lam", lat:22.3225, lng:114.2581, run:90, dwell:90},
        ]
      },
      {
        branch_id: 1,
        SPAWN_EVERY: 396,
        offset_time: 132,
        stations: [
          {name:"North Point", lat:22.2908, lng:114.2008, run:90, dwell:90},
          {name:"Quarry Bay", lat:22.2878, lng:114.2097, run:210, dwell:30},
          {name:"Yau Tong", lat:22.2978, lng:114.2372, run:150, dwell:30, checkpoints: [{lat:22.2944, lng:114.2419, progress: 0.3}]},
          {name:"Tiu Keng Leng", lat:22.3042, lng:114.2525, run:90, dwell:30},
          {name:"Tseung Kwan O", lat:22.3075, lng:114.2600, run:90, dwell:30},
          {name:"Hang Hau", lat:22.3156, lng:114.2644, run:90, dwell:30},
          {name:"Po Lam", lat:22.3225, lng:114.2581, run:90, dwell:90},
        ]
      },
      {
        branch_id: 2,
        SPAWN_EVERY: 396,
        offset_time: 264,
        stations: [
          {name:"North Point", lat:22.2908, lng:114.2008, run:90, dwell:90},
          {name:"Quarry Bay", lat:22.2878, lng:114.2097, run:210, dwell:30},
          {name:"Yau Tong", lat:22.2978, lng:114.2372, run:150, dwell:30, checkpoints: [{lat:22.2944, lng:114.2419, progress: 0.3}]},
          {name:"Tiu Keng Leng", lat:22.3042, lng:114.2525, run:90, dwell:30},
          {name:"Tseung Kwan O", lat:22.3075, lng:114.2600, run:150, dwell:30,  checkpoints: [{lat:22.3105, lng:114.2689, progress: 0.3}, {lat:22.3021, lng:114.2750, progress: 0.7}]},
          {name:"LOHAS Park", lat:22.2958, lng:114.2689, run:90, dwell:120},
        ]
      }
    ]
  },
  {
    line_id: 10,
    name: "Test line",
    line_color: "#01ffff",
    branches: [
      {
        branch_id: 0,
        SPAWN_EVERY: 100,
        offset_time: 0,
        branch_type: "circular",
        stations: [
          {name:"station 1", lat:22.3103, lng:114.1235, run:60, dwell:30},
          {name:"station 2", lat:22.3003, lng:114.1429, run:180, dwell:30},
          {name:"station 3", lat:22.2967, lng:114.1149, run:90, dwell:30, checkpoints: [{lat:22.3000, lng:114.1100, progress: 0.4}]},
        ]
      },
    ]
  },
];

/* =========  END CONFIG  ================================================ */
function reset_animation(){
  // Stop video/playback and clear playback state
  stopPlayback();
  clearPlaybackMarkers();
  if(typeof animationTrajectories !== 'undefined') animationTrajectories = [];
  if(typeof currentPlaybackTime !== 'undefined') currentPlaybackTime = 0;
  if(typeof tick !== 'undefined') tick = 0;
}



//drawing the routes and stations
function draw_branchroute(branch, line_color){
  // Build coordinates array including checkpoints
  const branchCoords = [];
  for(let s = 0; s < branch.stations.length; s++){
    const station = branch.stations[s];
    branchCoords.push([station.lat, station.lng]);
    if(s < branch.stations.length - 1 && station.checkpoints && Array.isArray(station.checkpoints)){
      const sortedCheckpoints = [...station.checkpoints].sort((a, b) => {
        const progA = a.progress !== undefined ? a.progress : (a.progresss !== undefined ? a.progresss : 0);
        const progB = b.progress !== undefined ? b.progress : (b.progresss !== undefined ? b.progresss : 0);
        return progA - progB;
      });
      sortedCheckpoints.forEach(cp => branchCoords.push([cp.lat, cp.lng]));
    }
  }
  if(branch.hasOwnProperty("branch_type") && branch.branch_type === "circular"){
    const station = branch.stations[branch.stations.length - 1];
    if(station.checkpoints && Array.isArray(station.checkpoints)){
      const sortedCheckpoints = [...station.checkpoints].sort((a, b) => {
        const progA = a.progress !== undefined ? a.progress : (a.progresss !== undefined ? a.progresss : 0);
        const progB = b.progress !== undefined ? b.progress : (b.progresss !== undefined ? b.progresss : 0);
        return progA - progB;
      });
      sortedCheckpoints.forEach(cp => branchCoords.push([cp.lat, cp.lng]));
    }
    branchCoords.push([branch.stations[0].lat, branch.stations[0].lng]);
  }

  L.polyline(branchCoords, {color: line_color, weight: 2}).addTo(routeLayerGroup);
  allLineCoords.push(...branchCoords);

  branch.stations.forEach(s => {
    L.circleMarker([s.lat, s.lng], {
      radius: 3,
      color: '#fff',
      weight: 2,
      fillColor: line_color,
      fillOpacity: 1
    }).addTo(routeLayerGroup);
    if(s.checkpoints && Array.isArray(s.checkpoints)){
      s.checkpoints.forEach(cp => {
        L.circleMarker([cp.lat, cp.lng], {
          radius: 2,
          color: line_color,
          weight: 1,
          fillColor: line_color,
          fillOpacity: 0.5
        }).addTo(routeLayerGroup);
      });
    }
  });
}

function clear_routes(){
  // Clear map route layers and coords
  if(typeof routeLayerGroup !== 'undefined') routeLayerGroup.clearLayers();
  allLineCoords = [];
}

function reset_lines(){

  // Remove all train markers and clear train arrays
  
  for(let i = 0; i < lines.length; i++){
    const line = lines[i];
    if(!line.branches) continue;
    for(let b = 0; b < line.branches.length; b++){
      const branch = line.branches[b];
      if(branch.trains){
        branch.trains.forEach(t => t.remove());
        branch.trains.length = 0;
      }
    }
  }
  
  clear_routes();


  // Clear status and time tables, then rebuild time tables for current lines
  const statusEl = document.getElementById('status');
  if(statusEl) statusEl.innerHTML = '';
  const timeTablesEl = document.getElementById('timeTables');
  if(timeTablesEl) timeTablesEl.innerHTML = '';

  // Re-draw each line and branch onto the map
  for(let i = 0; i < lines.length; i++){
    // Top display thing
    const line_span = document.createElement('span');
    line_span.setAttribute("id", `line${i}`);
    if(statusEl) statusEl.appendChild(line_span);
    if(statusEl) statusEl.appendChild(document.createElement("br"));

    lines[i].branches = lines[i].branches || [];
    for(let b = 0; b < lines[i].branches.length; b++){
      const branch = lines[i].branches[b];

      // Build coordinates array including checkpoints
      draw_branchroute(branch, lines[i].line_color);

      branch.trains = [];
      branch.spawnEnabled = true;
      branch.firstTrainFinished = false;
      branch.lastspawn = 0;
    }
  }

  if(allLineCoords.length > 0 && typeof map !== 'undefined'){
    map.fitBounds(L.latLngBounds(allLineCoords), { padding: [50, 50] });
  }
  if(document.getElementById("tickdisplay")){
    document.getElementById("tickdisplay").textContent = 'Stopped';
  }
}

/* ---------- map setup (your old code) --------------------------------- */
const map = L.map('map').setView([22.28, 114.18], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'© OSM', maxZoom:19, opacity: 0.8
}).addTo(map);

/* Layer group for all route polylines and station markers (so we can clear and re-draw) */
let routeLayerGroup = L.layerGroup().addTo(map);

/* draw static line */
let allLineCoords = [];
document.getElementById('status').innerHTML = '';
reset_lines();

//train simulation here


/* ---------------------------------------------------------------------- */

/* =====================  SIMULATION  =================================== */
// animationTrajectories[line_id][branch_id] = { trajectory, journeyTimeSeconds, initialProgresses }
let animationTrajectories = [];  // Pre-computed per-branch trajectories (one full journey cycle).
let animationPlaybackDurationSeconds = 0; // User-requested playback length (generation is independent).
let isGenerating = false;
let isPlaying = false;
let currentPlaybackTime = 0;
let playbackMarkers = []; // Markers for playback mode

let tick = 0;               // global time in seconds (used during generation)
let actual_tick = 0;       //how many ticks actually happened
let refreshcoords = 0; //whether or not to update coordinates on the map
let lastrefresh = 0; //last time it refreshed

let finishedticks = 0; //seeing how many ticks actually finished

//TODO: Make these buttons work for many lines in the future


function restart(){
  reset_animation();
  reset_lines();
  for(let i = 0; i < lines.length; i++){
    const line = lines[i];
    for(let b = 0; b < line.branches.length; b++){
      const branch = line.branches[b];
      branch.trains.forEach(t=>t.remove());
      branch.trains.length = 0;
      branch.spawnEnabled = true;
      branch.firstTrainFinished = false;
      branch.lastspawn = 0;
    }
  }
  tick = 0;
}

function clearPlaybackMarkers(){
  playbackMarkers.forEach(m => map.removeLayer(m));
  playbackMarkers = [];
}

//turn everything into integers for travel/dwell times
function remove_decimals(){
  for(let i = 0; i < lines.length; i++){
    for(let j = 0; j < lines[i].branches.length; j++){
      for(let k = 0; k < lines[i].branches[j].stations.length; k++){
        lines[i].branches[j].stations[k].run = Math.ceil(lines[i].branches[j].stations[k].run);
        lines[i].branches[j].stations[k].dwell = Math.ceil(lines[i].branches[j].stations[k].dwell);
      }
    }
  }
}


/* -------------------- Helper function to calculate when all spawning finishes ---- */
/*
function calculateSpawnCompletionTime(){
  let maxSpawnTime = 0;
  
  for(let i = 0; i < lines.length; i++){
    const line = lines[i];
    for(let b = 0; b < line.branches.length; b++){
      const branch = line.branches[b];
      
      // Calculate total journey time for one complete round trip
      let totalJourneyTime = 0;
      for(let s = 0; s < branch.stations.length; s++){
        totalJourneyTime += branch.stations[s].run + branch.stations[s].dwell;
      }
      
      // Time when first train completes journey = offset + journey time
      const firstTrainCompletionTime = branch.offset_time + totalJourneyTime;
      
      maxSpawnTime = Math.max(maxSpawnTime, firstTrainCompletionTime);
    }
  }
  
  return maxSpawnTime;
}
*/


/* -------------------- Helper function to check if all branches have stopped spawning ---- */
/*
function allBranchesStoppedSpawning(){
  for(let i = 0; i < lines.length; i++){
    const line = lines[i];
    for(let b = 0; b < line.branches.length; b++){
      const branch = line.branches[b];
      if(branch.spawnEnabled){
        return false;
      }
    }
  }
  return true;
}
*/

let spawn_completed_time = 0;

function generate_train_icon(markertype, line_color, label, image){
  if(markertype == "hklrt"){
    return L.divIcon({
      className: 'custom-div-icon',
      html:`<div style="
        background: #fff;
        height: 18px; width: 32px;border-radius:9px;font-size: 11px;text-align: center;vertical-align: middle;
        border:2px solid ${line_color};">${label}</div>  `,
        iconSize:[0, 0], iconAnchor:[16,10]
    });
  }else if(markertype == "hkmtr"){
    return L.divIcon({
      className: 'custom-div-icon',
      html:`<div style="
        background:${line_color};overflow: hidden;
        width:24px;height:24px;border-radius:50%;
        border:4px solid ${line_color};"><img src="${image}" style="
        height:100%; width: 100%; object-fit:cover;display:block;"></div>  `,
      iconSize:[0, 0], iconAnchor:[10,10]
    })
  }else if(markertype == "image"){
    return L.icon({
      iconUrl: image,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      className: 'my-image-icon'
    });
  }else{
    return L.divIcon({
      className: 'custom-div-icon',
      html:`<div style="
        background:${line_color};
        width:20px;height:20px;border-radius:50%;
        border:2px solid #fff;"></div>  `,
      iconSize:[0, 0], iconAnchor:[10,10]
    });
  }
}

/* -------------------- PLAYBACK STAGE ----------------------------------- */
function playAnimationFrame(time){
  if(!animationTrajectories || animationTrajectories.length === 0){
    console.warn("No animation trajectories to play");
    return;
  }

  const elapsedSeconds = time - spawn_completed_time;
  if(elapsedSeconds < 0) return;
  /*
  if(elapsedSeconds >= animationPlaybackDurationSeconds){
    stopPlayback();
    return;
  }
  */

  // Clear existing markers
  //clearPlaybackMarkers();

  // Create markers for all virtual trains at this time.
  // Each branch has a trajectory array indexed by `timeProgress` (seconds).
  // A train's `timeProgress` advances by 1 per frame and wraps with modulo.
  for(let i = 0; i < lines.length; i++){
    const lineCfg = lines[i];
    const lineMeta = animationTrajectories[i] || [];
    //const train_image = lineCfg.hasOwnProperty("image") ? lineCfg.image : "";
    //const markertype = lineCfg.hasOwnProperty("markertype") ? lineCfg.markertype : "";
    //const line_icon = generate_train_icon(markertype, lineCfg.line_color, lineCfg.label, train_image);

    let trainsOnThisLine = 0;

    for(let b = 0; b < (lineCfg.branches ? lineCfg.branches.length : 0); b++){
      const branchMeta = lineMeta[b];
      if(!branchMeta) continue;

      const { trajectory, journeyTimeSeconds, initialProgresses } = branchMeta;
      if(!trajectory || journeyTimeSeconds <= 0) continue;

      for(let k = 0; k < initialProgresses.length; k++){
        const timeProgress = (initialProgresses[k] + elapsedSeconds) % journeyTimeSeconds;
        const pos = trajectory[timeProgress];
        if(!pos) continue;

        /*
        const marker = L.marker([pos.lat, pos.lng], { icon: line_icon }).addTo(map);
        playbackMarkers.push(marker);
        */
        trainsOnThisLine++;
        branchMeta.markers[k].setLatLng([pos.lat, pos.lng]);       
      }
    }

    const line_span = document.getElementById(`line${i}`);
    if(line_span){
      line_span.textContent = `${lineCfg.name} Trains ${trainsOnThisLine}`;
    }
  }

  document.getElementById("tickdisplay").textContent = `Playback: ${elapsedSeconds}s`;
}

let playbackIntervalId = null;
let currentPlaybackSpeed = 1;

function startPlayback(playbackSpeed = 1, resetTime = true){
  if(isPlaying && resetTime) return; // Don't restart if already playing and not resetting
  if(!animationTrajectories || animationTrajectories.length === 0){
    alert("Please generate animation data first!");
    return;
  }
  
  // If already playing and just changing speed, update the interval
  if(isPlaying && !resetTime){
    updatePlaybackSpeed(playbackSpeed);
    return;
  }
  
  //generate the train markers. By pre-generating them and updating them each time, I should be able to increase the performance.

  // Clear existing markers
  clearPlaybackMarkers();

  // Create markers for all virtual trains at this time.
  // Each branch has a trajectory array indexed by `timeProgress` (seconds).
  // A train's `timeProgress` advances by 1 per frame and wraps with modulo.
  for(let i = 0; i < lines.length; i++){
    const lineCfg = lines[i];
    const lineMeta = animationTrajectories[i] || [];
    const train_image = lineCfg.hasOwnProperty("image") ? lineCfg.image : "";
    const markertype = lineCfg.hasOwnProperty("markertype") ? lineCfg.markertype : "";
    const line_icon = generate_train_icon(markertype, lineCfg.line_color, lineCfg.label, train_image);

    let trainsOnThisLine = 0;

    for(let b = 0; b < (lineCfg.branches ? lineCfg.branches.length : 0); b++){
      const branchMeta = lineMeta[b];
      if(!branchMeta) continue;

      const { trajectory, journeyTimeSeconds, initialProgresses } = branchMeta;
      if(!trajectory || journeyTimeSeconds <= 0) continue;

      animationTrajectories[i][b].markers = [];

      for(let k = 0; k < initialProgresses.length; k++){
        const timeProgress = (initialProgresses[k]) % journeyTimeSeconds;
        const pos = trajectory[timeProgress];
        if(!pos) continue;

        const marker = L.marker([pos.lat, pos.lng], { icon: line_icon }).addTo(map);
        playbackMarkers.push(marker);
        animationTrajectories[i][b].markers[k] = marker;
        trainsOnThisLine++;
      }
    }

    const line_span = document.getElementById(`line${i}`);
    if(line_span){
      line_span.textContent = `${lineCfg.name} Trains ${trainsOnThisLine}`;
    }
  }

  isPlaying = true;
  currentPlaybackSpeed = playbackSpeed;
  if(resetTime){
    currentPlaybackTime = 0;
  }
  
  // Play at specified speed (frames per second)
  const frameInterval = 1000 / playbackSpeed; // milliseconds between frames
  
  playbackIntervalId = setInterval(() => {
    /*
    if(currentPlaybackTime >= animationPlaybackDurationSeconds){
      stopPlayback();
      return;
    }
    */
    playAnimationFrame(currentPlaybackTime + spawn_completed_time);
    currentPlaybackTime++;
  }, frameInterval);
}

function updatePlaybackSpeed(newSpeed){
  if(!isPlaying) return;
  
  currentPlaybackSpeed = newSpeed;
  
  // Clear existing interval
  if(playbackIntervalId){
    clearInterval(playbackIntervalId);
    playbackIntervalId = null;
  }
  
  // Start new interval with new speed
  const frameInterval = 1000 / newSpeed; // milliseconds between frames
  
  playbackIntervalId = setInterval(() => {
    /*
    if(currentPlaybackTime >= animationPlaybackDurationSeconds){
      stopPlayback();
      return;
    }
    */
    playAnimationFrame(currentPlaybackTime + spawn_completed_time);
    currentPlaybackTime++;
  }, frameInterval);
}

function stopPlayback(){
  if(playbackIntervalId){
    clearInterval(playbackIntervalId);
    playbackIntervalId = null;
  }
  isPlaying = false;
}

function pausePlayback(){
  if(playbackIntervalId){
    clearInterval(playbackIntervalId);
    playbackIntervalId = null;
  }
  isPlaying = false;
}

function resumePlayback(playbackSpeed = 1){
  if(isPlaying) return;
  /*
  if(currentPlaybackTime >= animationPlaybackDurationSeconds){
    currentPlaybackTime = 0;
  }
  */
  startPlayback(playbackSpeed, false); // Don't reset time when resuming
}




/* ---------- UI Controls for Generation and Playback ---------- */
// Generation controls
document.getElementById('generateBtn')?.addEventListener('click', async () => {
  const generateBtn = document.getElementById('generateBtn');
  const statusDiv = document.getElementById('generationStatus');
  
  if(isGenerating){
    return;
  }  
  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating...';
  statusDiv.textContent = 'Starting generation...';
  
  //turn all travel times into integers.
  remove_decimals();
  console.log(lines);

  try {
    await generateAnimation((current, total, spawnEndTime, isPostSpawn, spawningLines) => {
      if(isPostSpawn){
        // After spawn phase: animation duration is counting (requested duration only)
        const progress = Math.round((current - spawnEndTime) / (total - spawnEndTime) * 100);
        statusDiv.textContent = `Generating animation... ${current - spawnEndTime}/${total - spawnEndTime}s of animation (${progress}%) | Total: ${current}/${total}s`;
      } else {
        // During spawn phase: show elapsed time and which lines are still spawning
        const spawningText = spawningLines && spawningLines.length > 0
          ? spawningLines.join(', ')
          : 'none (finalizing…)';
        statusDiv.textContent = `Spawning trains… ${current}s elapsed\nLines still spawning: ${spawningText}\n`;
      }
    });
    
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Animation';
    //animationPlaybackDurationSeconds = duration;
    statusDiv.textContent = `Generation complete! spawn_completed_time=${spawn_completed_time}s.`;
    // Enable playback controls
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;
  } catch(e) {
    console.error('Generation error:', e);
    statusDiv.textContent = 'Generation failed: ' + e.message;
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Animation';
  }
});

// Playback controls
document.getElementById('playBtn')?.addEventListener('click', () => {
  const speed = parseFloat(document.getElementById('playbackSpeed').value) || 1;
  startPlayback(speed);
});

document.getElementById('pauseBtn')?.addEventListener('click', () => {
  pausePlayback();
});

document.getElementById('stopBtn')?.addEventListener('click', () => {
  stopPlayback();
  clearPlaybackMarkers();
  currentPlaybackTime = 0;
  document.getElementById("tickdisplay").textContent = 'Stopped';
});

document.getElementById('playbackSpeed')?.addEventListener('input', e => {
  const speed = parseFloat(e.target.value);
  document.getElementById('playbackSpeedLbl').textContent = speed;
  if(isPlaying){
    // Update speed without resetting playback position
    updatePlaybackSpeed(speed);
  }
});

//settings buttosn
document.getElementById('showroutes')?.addEventListener('click', e => {
  for(let i = 0; i < lines.length; i++){
    lines[i].branches = lines[i].branches || [];
    for(let b = 0; b < lines[i].branches.length; b++){
      draw_branchroute(lines[i].branches[b], lines[i].line_color);
    }
  }
});

document.getElementById('hideroutes')?.addEventListener('click', e => {
  clear_routes();
});



/* ---------- JSON file upload: replace or append lines ------------------ */
function setJsonLoadStatus(msg, isError) {
  const el = document.getElementById('jsonLoadStatus');
  if (el) {
    el.textContent = msg;
    el.style.color = isError ? '#dc3545' : '#666';
  }
}

function normalizeLineIds() {
  for (let i = 0; i < lines.length; i++) {
    lines[i].line_id = i;
    if (!lines[i].branches) lines[i].branches = [];
    for (let b = 0; b < lines[i].branches.length; b++) {
      lines[i].branches[b].branch_id = b;
      if (!lines[i].branches[b].stations) lines[i].branches[b].stations = [];
    }
  }
}

function loadJsonFile(replace) {
  const input = document.getElementById(replace ? 'jsonFileReplace' : 'jsonFileAppend');
  if (input && input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) {
          setJsonLoadStatus('JSON must be an array of lines.', true);
          return;
        }
        if (replace) {
          lines = data;
        } else {
          lines = lines.concat(data);
        }
        normalizeLineIds();
        reset_animation();
        reset_lines();
        setJsonLoadStatus(replace ? 'Lines replaced.' : 'Lines appended.');
        input.value = '';
      } catch (err) {
        setJsonLoadStatus('Invalid JSON: ' + err.message, true);
      }
    };
    reader.onerror = function () {
      setJsonLoadStatus('Failed to read file.', true);
    };
    reader.readAsText(file);
  }
}

document.getElementById('loadJsonReplaceBtn')?.addEventListener('click', function () {
  document.getElementById('jsonFileReplace')?.click();
});
document.getElementById('jsonFileReplace')?.addEventListener('change', function () {
  loadJsonFile(true);
});

document.getElementById('loadJsonAppendBtn')?.addEventListener('click', function () {
  document.getElementById('jsonFileAppend')?.click();
});
document.getElementById('jsonFileAppend')?.addEventListener('change', function () {
  loadJsonFile(false);
});

/* ---------- initial setup ---------- */
restart();   // sets tick=0, clears trains, etc.
// startClock(); // Disabled - using new generation/playback system
/* ======================================================================= */
/* ======================================================================= */