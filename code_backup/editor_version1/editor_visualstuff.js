//import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

//not the same as the one in editor_helpers!!
export function generate_train_icon_2(markertype, line_color, label, image){
  if(markertype == "hklrt"){
    return `<div style="
        background-color: #fff;
        height: 18px; width: 32px;border-radius:9px;font-size: 11px;text-align: center;vertical-align: middle;
        border:2px solid ${line_color};">${label}</div>  `;
  }else if(markertype == "hkmtr"){
    return `<div style="
        background-color:${line_color};overflow: hidden;
        width:24px;height:24px;border-radius:50%;
        border:4px solid ${line_color};"><img src="${image}" style="
        height:100%; width: 100%; object-fit:cover;display:block;"></div>  `;
  }else if(markertype == "image"){
    return `<img src="${image}" style="width:30px; height: 30px ;object-fit:contain;">`;
  }else{
    return `<div style="
        background-color:${line_color};
        width:20px;height:20px;border-radius:50%;
        border:2px solid #fff;"></div>  `;
  }
}