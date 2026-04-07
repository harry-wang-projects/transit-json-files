import {calculateDistance, dist2time, autotime, autoprogress} from "./editor_helpers.js";

let lat1 = 22.3317, lng1 = 114.0289;
let lat2 = 22.3156, lng2 = 114.0450;


let testing_stations= [
    {name:"North Point", lat:22.2908, lng:114.2008, run:90, dwell:90},
    {name:"Quarry Bay", lat:22.2878, lng:114.2097, run:210, dwell:30},
    {name:"Yau Tong", lat:22.2978, lng:114.2372, run:150, dwell:30, checkpoints: [{lat:22.2944, lng:114.2419, progresss: 0.3}]},
    {name:"Tiu Keng Leng", lat:22.3042, lng:114.2525, run:90, dwell:30},
    {name:"Tseung Kwan O", lat:22.3075, lng:114.2600, run:150, dwell:30,  checkpoints: [{lat:22.3105, lng:114.2689, progresss: 0.3}, {lat:22.3021, lng:114.2750, progresss: 0.7}]},
    {name:"LOHAS Park", lat:22.2958, lng:114.2689, run:90, dwell:120},
];

/*
let testing_stations = [
          {name:"Hong Kong", lat:22.2852, lng:114.1581, run:150, dwell:90},
          {name:"Kowloon", lat:22.3050, lng:114.1614, run:150, dwell:30},
          {name:"Olympic", lat:22.3178, lng:114.1594, run:90, dwell:30},
          {name:"Nam Cheong", lat:22.3267, lng:114.1533, run:240, dwell:30},
          {name:"Lai King", lat:22.3483, lng:114.1261, run:90, dwell:30},
          {name:"Tsing Yi", lat:22.3583, lng:114.1069, run:300, dwell:30},
          {name:"Sunny Bay", lat:22.3317, lng:114.0289, run:360, dwell:30},
          {name:"Tung Chung", lat:22.2892, lng:113.9417, run:90, dwell:90},
        ];
*/

document.getElementById("distance").innerHTML=(calculateDistance(lat1, lng1, lat2, lng2));
document.getElementById("time").innerHTML=(dist2time(10, 22.2, 0.8));
let display_string = "";
let display_array = autotime(testing_stations, 36.2, 0.8, false);
for(let i = 0; i < display_array.length; i++){
    display_string += display_array[i].toString() + " , ";
}
document.getElementById("times").innerHTML=(display_string);
document.getElementById("progresses").innerHTML=autoprogress({name:"Sunny Bay", lat:22.3317, lng:114.0289, run:210, dwell:90, checkpoints: [{lat:22.3332, lng:114.0316, progresss: 0.1}, {lat:22.3306, lng:114.0355, progresss: 0.25}, {lat:22.3173, lng:114.0374, progresss: 0.8}]}, 22.3156, 114.0450);
