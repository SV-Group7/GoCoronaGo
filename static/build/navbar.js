import a from"./components/NavBarTop.js";var b,c,d=ReactDOM.render,e=ReactDOM.unmountComponentAtNode,f=!1;function g(){var g;return b||(b=document.getElementById("navBar-react")),c||(c=document.querySelectorAll(".navbar-normal")),(null===(g=window.matchMedia("(min-width: 768px)"))|| void 0===g?void 0:g.matches)?f?void 0:(f=!0,c.forEach(function(a){a.style.display="none",a.style.visibility="hidden"}),b.style.display="flex",d(React.createElement(a,null),b)):void(c.forEach(function(a){a.style.removeProperty("display"),a.style.removeProperty("visibility")}),b.style.display="none",e(b),f=!1)}document.addEventListener("DOMContentLoaded",function(){g(),window.onresize=g})