var a=React.useEffect,b=["Cases","Testing","Beds"];export default function c(c){var d=c.active,e=c.setActive,f=[],g=!0,h=!1,i=void 0;try{for(var j,k=b[Symbol.iterator]();!(g=(j=k.next()).done);g=!0){var l=j.value;f.push(React.createElement("button",{key:l,className:d===l?"active":""},l))}}catch(m){h=!0,i=m}finally{try{g||null==k.return||k.return()}finally{if(h)throw i}}return a(function(){document.querySelectorAll("#selector > button").forEach(function(a){a.addEventListener("click",function(){a.classList.contains("active")||e(a.innerHTML)})})}),React.createElement("div",{id:"selector"},f)}