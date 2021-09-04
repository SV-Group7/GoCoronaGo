const{useState,useEffect}=React,ITEMS_COUNT=15,icons={start:"https://github.com/google/material-design-icons/raw/master/ios/av/fast_rewind/materialicons/black/baseline_fast_rewind_black_48pt.xcassets/baseline_fast_rewind_black_48pt.imageset/baseline_fast_rewind_black_48pt_3x.png",previous:"https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_back_ios/materialicons/black/baseline_arrow_back_ios_black_48pt.xcassets/baseline_arrow_back_ios_black_48pt.imageset/baseline_arrow_back_ios_black_48pt_3x.png",next:"https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_forward_ios/materialicons/black/baseline_arrow_forward_ios_black_48pt.xcassets/baseline_arrow_forward_ios_black_48pt.imageset/baseline_arrow_forward_ios_black_48pt_3x.png",end:"https://github.com/google/material-design-icons/raw/master/ios/av/fast_forward/materialicons/black/baseline_fast_forward_black_48pt.xcassets/baseline_fast_forward_black_48pt.imageset/baseline_fast_forward_black_48pt_3x.png"},buttonClickHandlers={start:(a,b,c)=>!(1>=a)&&(c&&b(1),!0),previous:(a,b,c)=>1!==a&&(c&&b(a-1),!0),next:(a,b,c,d)=>!(a>=d)&&(c&&b(a+1),!0),end:(a,b,c,d)=>a!==d&&(c&&b(d),!0)};export default function HospitalsDisplay({hospitals:a}){var b=Math.ceil;const[c,d]=useState(1),e=b(a.length/ITEMS_COUNT);return useEffect(()=>{d(1)},[d,a.length]),/*#__PURE__*/React.createElement("div",{id:"hospitalsDisplay"},/*#__PURE__*/React.createElement(Navigator,{page:c,setPage:d,maxPages:e}),/*#__PURE__*/React.createElement(TabledDisplay,{hospitals:a,page:c}))}function Navigator({page:a,setPage:b,maxPages:c}){return useEffect(()=>{const d=[],e=d=>()=>{d(a,b,!0,c)};for(const[a,b]of Object.entries(buttonClickHandlers)){const c=document.getElementById(`nav-${a}`),f=e(b);c.addEventListener("click",f),d.push([c,f])}return()=>{for(const[a,b]of d)a.removeEventListener("click",b)}}),useEffect(()=>{const d=d=>()=>d(a,b,!1,c);for(const[a,b]of Object.entries(buttonClickHandlers)){const c=document.getElementById(`nav-${a}`),e=d(b);e()?c.removeAttribute("disabled"):c.setAttribute("disabled","disabled")}},[a,b,c]),/*#__PURE__*/React.createElement("div",{id:"navigator"},/*#__PURE__*/React.createElement("button",{id:"nav-start"}," ",/*#__PURE__*/React.createElement("img",{src:icons.start,alt:"start"})),/*#__PURE__*/React.createElement("button",{id:"nav-previous"}," ",/*#__PURE__*/React.createElement("img",{style:{transform:"translateX(5px)"},src:icons.previous,alt:"previous"})),/*#__PURE__*/React.createElement("button",{id:"nav-current",style:{display:"flex",width:"60px",justifyContent:"center"}}," ",a," "),/*#__PURE__*/React.createElement("button",{id:"nav-next"}," ",/*#__PURE__*/React.createElement("img",{src:icons.next,alt:"next"})),/*#__PURE__*/React.createElement("button",{id:"nav-end"}," ",/*#__PURE__*/React.createElement("img",{src:icons.end,alt:"end"})))}function TabledDisplay({hospitals:a,page:b}){return useEffect(()=>{const a=document.getElementById("hospitalsTable");a.scrollTop=0},[a.length,b]),/*#__PURE__*/React.createElement("div",{id:"hospitalsTable"},/*#__PURE__*/React.createElement("div",{className:"hospitalTableRow header"},/*#__PURE__*/React.createElement("span",{className:"hospitalName"},"\xA0"),/*#__PURE__*/React.createElement("span",{className:"statsCell"}," Normal Beds "),/*#__PURE__*/React.createElement("span",{className:"statsCell"}," Oxygen Beds "),/*#__PURE__*/React.createElement("span",{className:"statsCell"}," ICU Units "),/*#__PURE__*/React.createElement("span",{className:"statsCell"}," Ventilator Units ")),[...a].splice((b-1)*ITEMS_COUNT,ITEMS_COUNT).map(a=>/*#__PURE__*/React.createElement(TableItem,{key:a.hospital_name,data:a})))}function TableItem({data:a}){if(!a)return null;const b={normal:[a.available_beds_without_oxygen,a.total_beds_without_oxygen],oxygen:[a.available_beds_with_oxygen,a.total_beds_with_oxygen],icu:[a.available_icu_beds_without_ventilator,a.total_icu_beds_without_ventilator],vent:[a.available_icu_beds_with_ventilator,a.total_icu_beds_with_ventilator]},c=[];for(const[d,e]of Object.entries(b))c.push(/*#__PURE__*/React.createElement("span",{key:d,className:"statsCell statsDisplayCell "+calcColour(e)},e[0],"/ ",e[1]));return/*#__PURE__*/React.createElement("div",{className:"hospitalTableRow"},/*#__PURE__*/React.createElement("div",{className:"hospitalName"},/*#__PURE__*/React.createElement("div",null,/*#__PURE__*/React.createElement("span",{className:"left"}," ",a.hospital_name," ")),/*#__PURE__*/React.createElement("span",{className:"region"}," ",a.area," ")),c)}function calcColour(a){return-1===a[0]||-1===a[1]?(a[0]="?",a[1]="?","orange"):0===a[0]?"red":a[0]===a[1]?"green":"orange"}