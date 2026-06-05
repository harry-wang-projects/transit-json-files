//split bidirectional branches into opposite-facing unidirectional branches
function split_bidirectional(){
  for(let i = 0; i < lines.length; i++){
    const newBranches = [];
    for(let j = 0; j < lines[i].branches.length; j++){
      const branch = lines[i].branches[j];
      if(!branch.hasOwnProperty("branch_type")){
        continue;
      }
      if(!branch.hasOwnProperty("scheduling")){
        continue;
      }
      if(branch.branch_type != "bidirectional"){
        continue;
      }

      // Convert original branch to unidirectional (forward direction)
      branch.branch_type = "unidirectional";

      // Build flipped stations for the reverse-direction branch
      const stations = branch.stations;
      const n = stations.length;
      const flippedStations = [];

      for(let k = 0; k < n; k++){
        const origStation = stations[n - 1 - k];
        const flippedStation = {
          name: origStation.name,
          lat: origStation.lat,
          lng: origStation.lng,
          dwell: origStation.dwell,
        };

        if(k < n - 1){
          // Run time from flipped[k] to flipped[k+1] equals original stations[n-2-k].run
          flippedStation.run = stations[n - 2 - k].run;

          // Checkpoints between flipped[k] and flipped[k+1] come from original stations[n-2-k].checkpoints,
          // reversed in order, with each progress replaced by 1 - original_progress
          const srcCheckpoints = stations[n - 2 - k].checkpoints;
          if(srcCheckpoints && Array.isArray(srcCheckpoints) && srcCheckpoints.length > 0){
            flippedStation.checkpoints = [...srcCheckpoints].reverse().map(cp => ({
              lat: cp.lat,
              lng: cp.lng,
              progress: 1 - (cp.progress !== undefined ? cp.progress : (cp.progresss !== undefined ? cp.progresss : 0))
            }));
          }
        }

        flippedStations.push(flippedStation);
      }

      const flippedBranch = {
        branch_type: "unidirectional",
        scheduling: branch.scheduling,
        timetable: JSON.parse(JSON.stringify(branch.timetable)),
        stations: flippedStations,
      };

      newBranches.push(flippedBranch);
    }

    // Append all flipped branches after iterating to avoid processing them in the same loop
    lines[i].branches.push(...newBranches);
  }
}


//time parsing

function parseTime24(timeStr) {
      // Expected format: HH:MM:SS (24-hour)
      const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(timeStr.trim());
      if (!match) throw new Error("Invalid format. Use HH:MM:SS, e.g. 16:53:22.");

      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      const seconds = Number(match[3]);

      // Basic range checks
      if (hours < 0 || hours > 23) throw new Error("Hours must be 00 through 23.");
      if (minutes < 0 || minutes > 59) throw new Error("Minutes must be 00 through 59.");
      if (seconds < 0 || seconds > 59) throw new Error("Seconds must be 00 through 59.");

      return hours * 60 * 60 + minutes * 60 + seconds;
}

//preprocessing of lines
function process_lines(){
  for(let i = 0; i < lines.length; i++){
    for(let j = 0; j < lines[i].branches.length; j++){
      if(!lines[i].branches[j].hasOwnProperty("branch_type")){
        continue;
      }
      if(!lines[i].branches[j].hasOwnProperty("scheduling")){
        continue;
      }
      if(lines[i].branches[j].branch_type != "unidirectional"){
        continue;
      }

      //sort the times just in case
      lines[i].branches[j].timetable = lines[i].branches[j].timetable.sort((a, b) => a.time.localeCompare(b.time));
      console.log("sorted:")
      console.log(lines[i].branches[j].timetable);
      
      //array of times in seconds since 00:00:00
      lines[i].branches[j].spawn_times = [];

      //time array - logs the events.
      //todo: Make this more efficient. Can reduce to a 1440 length array. Make it so that spawning/despawning can only be accurate to the minute.
      lines[i].branches[j].events = new Array(1440).fill(0);

      //the range of trains that are active
      //note: head = the newest train, tail = the oldest train.
      //head > tail at all times.
      lines[i].branches[j].head = 0;
      lines[i].branches[j].tail = 0;

      if(lines[i].branches[j].scheduling == "scheduled_frequencies"){
        //first loop: Record down the begin times of each

        //need an extra array to store when the first train of each frequency spawns.
        lines[i].branches[j].first_times = [];
        for(let k = 0; k < lines[i].branches[j].timetable.length; k++){
          console.log(lines[i].branches[j].timetable[k].time + ':00');
          let begin_time = parseTime24(lines[i].branches[j].timetable[k].time + ':00');

          lines[i].branches[j].first_times[k] = begin_time
        }
        //now, for each interval, generate all of the spawns.
        for(let k = 0; k < lines[i].branches[j].timetable.length; k++){
          let begin_time = lines[i].branches[j].first_times[k];
          let next_time = 86399;
          if(k + 1 < lines[i].branches[j].timetable.length){
            next_time = lines[i].branches[j].first_times[k+1];
          }

          let seconds_frequency = Math.ceil(lines[i].branches[j].timetable[k].frequency * 60);

          for(let current_time = begin_time; current_time + lines[i].branches[j].timetable[k].frequency < next_time; current_time += seconds_frequency){
            lines[i].branches[j].spawn_times.push(current_time);
            
            //haven't considered trains starting at 23:00 and ending on the next day yet. For now, assume that they despawn at 23:59.
            lines[i].branches[j].events[Math.floor((current_time)/60)] = 1;
            //since despawn time calculation requires calculating travel time, do this in the generation phase.
            //despawn_time = max(lines[i].branches[j].spawn_times[k] +  travel_time, 86399);
          }
          console.log("scheduled frequency timetable:")
          console.log(lines[i].branches[j].spawn_times);

        }
      }else{
        for(let k = 0; k < lines[i].branches[j].timetable.length; k++){
          console.log(lines[i].branches[j].timetable[k].time + ':00');
          lines[i].branches[j].spawn_times[k] = parseTime24(lines[i]. branches[j].timetable[k].time + ':00');

        //haven't considered trains starting at 23:00 and ending on the next day yet. For now, assume that they despawn at 23:59.
          lines[i].branches[j].events[Math.floor((lines[i].branches[j]. spawn_times[k])/60)] = 1;

          //since despawn time calculation requires calculating travel time, do this in the generation phase.
          //despawn_time = max(lines[i].branches[j].spawn_times[k] +  travel_time, 86399);
        }
      }
    }
  }

}