
export function calculateDistance(lat1, lon1, lat2, lon2) {
    // Earth's radius in meters
    const R = 6371000;
    
    // Convert degrees to radians
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    // Haversine formula
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Distance in meters
    const distance = R * c;
    
    return distance;
}

export function dist2time(distance, speed, acceleration) {
    let min_fullspeed_dist = (0.5 * acceleration * (speed / acceleration) * (speed / acceleration) ) * 2;
    if(distance >= min_fullspeed_dist){
        //it can reach full speed;
        let accel_decel_time = (speed / acceleration) * 2;
        return accel_decel_time + (distance - min_fullspeed_dist) / speed;
    }else{
        //it doesn't reach full speed.
        let s = distance / 2;
        //1/2 at^2 = s, t = sqrt(2s / a)
        //multiply the time by 2 to include deceleration.
        return Math.sqrt(s * 2 / acceleration) * 2;
    }
}

export function autotime(input_stations, speed, acceleration, circular) {
    console.log(input_stations);
    let return_array = [];
    for(let i = 0; i < input_stations.length - 1; i++){
        console.log(i);
        if(input_stations[i].hasOwnProperty("checkpoints")){
            if(input_stations[i].checkpoints.length > 0){
                //add the checkpoints up.
                let distance = 0;
                let lat1 = input_stations[i].lat;
                let lng1 = input_stations[i].lng;
                let lat2 = input_stations[i].checkpoints[0].lat;
                let lng2 = input_stations[i].checkpoints[0].lng;
                distance += (calculateDistance(lat1, lng1, lat2, lng2));
                for(let j = 0; j < input_stations[i].checkpoints.length - 1; j++){
                    lat1 = input_stations[i].checkpoints[j].lat;
                    lng1 = input_stations[i].checkpoints[j].lng;
                    lat2 = input_stations[i].checkpoints[j+1].lat;
                    lng2 = input_stations[i].checkpoints[j+1].lng;
                    distance += (calculateDistance(lat1, lng1, lat2, lng2));
                }
                lat1 = input_stations[i].checkpoints[input_stations[i].checkpoints.length - 1].lat;
                lng1 = input_stations[i].checkpoints[input_stations[i].checkpoints.length - 1].lng;
                lat2 = input_stations[i + 1].lat;
                lng2 = input_stations[i + 1].lng;
                distance += (calculateDistance(lat1, lng1, lat2, lng2));
                console.log(distance);
                return_array.push(dist2time(distance, speed, acceleration));
            }else{
                return_array.push(dist2time(calculateDistance(input_stations[i].lat, input_stations[i].lng, input_stations[i+1].lat, input_stations[i+1].lng), speed, acceleration));
            }
        }else{
            //no checkpoints, very easy.
            console.log(calculateDistance(input_stations[i].lat, input_stations[i].lng, input_stations[i+1].lat, input_stations[i+1].lng));
            return_array.push(dist2time(calculateDistance(input_stations[i].lat, input_stations[i].lng, input_stations[i+1].lat, input_stations[i+1].lng), speed, acceleration));
        }
    }
    //what if it is a circle line? Need to make it for the last station.
    if(circular == true){
        let pos=input_stations.length - 1;
        if(input_stations[pos].hasOwnProperty("checkpoints")){
            if(input_stations[pos].checkpoints.length > 0){
                //add the checkpoints up.
                let distance = 0;
                let lat1 = input_stations[pos].lat;
                let lng1 = input_stations[pos].lng;
                let lat2 = input_stations[pos].checkpoints[0].lat;
                let lng2 = input_stations[pos].checkpoints[0].lng;
                distance += (calculateDistance(lat1, lng1, lat2, lng2));
                for(let j = 0; j < input_stations[pos].checkpoints.length - 1; j++){
                    lat1 = input_stations[pos].checkpoints[j].lat;
                    lng1 = input_stations[pos].checkpoints[j].lng;
                    lat2 = input_stations[pos].checkpoints[j+1].lat;
                    lng2 = input_stations[pos].checkpoints[j+1].lng;
                    distance += (calculateDistance(lat1, lng1, lat2, lng2));
                }
                lat1 = input_stations[pos].checkpoints[input_stations[pos].checkpoints.length - 1].lat;
                lng1 = input_stations[pos].checkpoints[input_stations[pos].checkpoints.length - 1].lng;
                lat2 = input_stations[0].lat;
                lng2 = input_stations[0].lng;
                distance += (calculateDistance(lat1, lng1, lat2, lng2));
                return_array.push(dist2time(distance, speed, acceleration));
            }
        }else{
            return_array.push(dist2time(calculateDistance(input_stations[pos].lat, input_stations[pos].lng, input_stations[0].lat, input_stations[0].lng), speed, acceleration));
        }
    }
    return return_array;
}

export function autoprogress(input_station, nextstation_lat, nextstation_lng) {
    if(!input_station.hasOwnProperty("checkpoints")){
        return [];
    };
    if(input_station.checkpoints.length == 0){
        return [];
    }
    //returns the progress of each checkpoint.
    let return_array = [];
    let distances = [];
    let total_distance = 0;
    
    //add the checkpoints up.
    let lat1 = input_station.lat;
    let lng1 = input_station.lng;
    let lat2 = input_station.checkpoints[0].lat;
    let lng2 = input_station.checkpoints[0].lng;
    distances[0] = calculateDistance(lat1, lng1, lat2, lng2)
    total_distance += distances[0];
    for(let j = 0; j < input_station.checkpoints.length - 1; j++){
        lat1 = input_station.checkpoints[j].lat;
        lng1 = input_station.checkpoints[j].lng;
        lat2 = input_station.checkpoints[j+1].lat;
        lng2 = input_station.checkpoints[j+1].lng;
        //it is accumulative distance, not real distance.
        distances[j + 1] = total_distance + calculateDistance(lat1, lng1, lat2, lng2);
        total_distance = distances[j + 1];
    }
    lat1 = input_station.checkpoints[input_station.checkpoints.length - 1].lat;
    lng1 = input_station.checkpoints[input_station.checkpoints.length - 1].lng;
    lat2 = nextstation_lat;
    lng2 = nextstation_lng;
    total_distance += (calculateDistance(lat1, lng1, lat2, lng2));

    for(let i = 0; i < distances.length; i++){
        return_array[i] = distances[i] / total_distance;
    }
    return return_array;
}
