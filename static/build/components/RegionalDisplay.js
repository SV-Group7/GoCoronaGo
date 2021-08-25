import Dropdown from"./Dropdown.js";const{useState}=React;export default function RegionalDisplay({type:a,dat:b}){const[c,d]=useState("Tamil Nadu");if("Testing"===a)return/*#__PURE__*/React.createElement("div",{display:"none"});const e=b[regions[a].indexOf(c)];if(!e)return null;let f;return f="Cases"===a?/*#__PURE__*/React.createElement("div",{className:"highlight"},/*#__PURE__*/React.createElement("h1",null,e.loc),/*#__PURE__*/React.createElement("h3",null,"Cured"),/*#__PURE__*/React.createElement("p",null,e.discharged),/*#__PURE__*/React.createElement("h3",null,"Deaths"),/*#__PURE__*/React.createElement("p",null,e.deaths),/*#__PURE__*/React.createElement("h3",null,"Total"),/*#__PURE__*/React.createElement("p",null,e.totalConfirmed)):/*#__PURE__*/React.createElement("div",{className:"highlight"},/*#__PURE__*/React.createElement("h1",null,e.state),/*#__PURE__*/React.createElement("h3",null,"Rural Beds"),/*#__PURE__*/React.createElement("p",null,e.ruralBeds),/*#__PURE__*/React.createElement("h3",null,"Urban Beds"),/*#__PURE__*/React.createElement("p",null,e.urbanBeds),/*#__PURE__*/React.createElement("h3",null,"Total Beds"),/*#__PURE__*/React.createElement("p",null,e.totalBeds)),/*#__PURE__*/React.createElement("div",{id:"regionalData"},/*#__PURE__*/React.createElement(DropDown,{region:c,setRegion:d,regionData:regions[a]}),f)}RegionalDisplay.propTypes={type:PropTypes.string,dat:PropTypes.array};function DropDown({regionData:a,region:b,setRegion:c}){return/*#__PURE__*/React.createElement(Dropdown,{options:a,value:b,onChange:({value:a})=>c(a)})}DropDown.propTypes={regionData:PropTypes.array,region:PropTypes.string,setRegion:PropTypes.func};
//# sourceMappingURL=RegionalDisplay.js.map