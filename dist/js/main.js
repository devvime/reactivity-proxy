/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/footer/footer.js":
/*!*************************************!*\
  !*** ./components/footer/footer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Footer: () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _footer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.scss */ "./components/footer/footer.scss");
/* harmony import */ var _footer_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.html */ "./components/footer/footer.html");
const Footer={title:"footer-tpl",init(){console.log("Footer element started")},render(){return _footer_html__WEBPACK_IMPORTED_MODULE_1__["default"]}};

/***/ }),

/***/ "./components/nav/nav.js":
/*!*******************************!*\
  !*** ./components/nav/nav.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Nav: () => (/* binding */ Nav)
/* harmony export */ });
/* harmony import */ var _nav_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav.scss */ "./components/nav/nav.scss");
/* harmony import */ var _nav_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav.html */ "./components/nav/nav.html");
const Nav={title:"nav-tpl",init(){console.log("Nav element started")},render(){return _nav_html__WEBPACK_IMPORTED_MODULE_1__["default"]}};

/***/ }),

/***/ "./lib/ReactivityProxy.js":
/*!********************************!*\
  !*** ./lib/ReactivityProxy.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactivityProxy: () => (/* binding */ ReactivityProxy),
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
class ReactivityProxy{constructor(){this.state=new Proxy({},{set:(a,b,c)=>(a[b]=c,this.resolve(),!0)}),this.handleClick(),this.handleChange()}handleText(){const a=(a,b)=>{let c=document.querySelectorAll(`[data-${a.join("-")}]`);c.forEach(a=>{a.hasAttribute("src")?a.setAttribute("src",b):a.hasAttribute("href")?a.setAttribute("href",b):a.innerText=b})},b=(c,d=[])=>{Object.keys(c).forEach(e=>{const f=[...d,e];"object"==typeof c[e]&&null!==c[e]?b(c[e],f):a(f,c[e])})};b(this.state)}handleClick(){document.querySelectorAll("[data-click]").forEach(a=>{a.addEventListener("click",()=>{try{const b=a.getAttribute("data-click"),c=new Function("state",`return ${b}`)(this.state);"function"==typeof c&&c()}catch(a){console.error("Erro em data-click:",a)}})})}handleChange(){document.querySelectorAll("[data-change]").forEach(a=>{a.addEventListener("input",b=>{try{const c=a.getAttribute("data-change"),d=new Function("state",`return ${c}`)(this.state);"function"==typeof d&&d(b.target.value)}catch(a){console.error("Erro em data-change:",a)}})})}handleConditional(){document.querySelectorAll("[data-if]").forEach(a=>{try{const b=new Function("state",`return ${a.getAttribute("data-if")}`);a.style.display=b(this.state)?"":"none"}catch(a){console.error("Erro em data-if:",a)}})}handleEach(){document.querySelectorAll("[data-for]").forEach(item=>{const output=[],tpl=item.innerHTML,expression=item.getAttribute("data-for").split(" of "),data=eval("this."+expression[1]);data&&(data.map(a=>{const b=this.createElement(tpl);b.removeAttribute("data-for");const c=(a,d=[])=>{Object.keys(a).forEach(f=>{const g=[...d,f];if("object"==typeof a[f]&&null!==a[f])c(a[f],g);else{const c=`[data-${expression[0]}-${g.join("-")}]`;b.querySelectorAll(c).forEach(b=>{b.hasAttribute("src")?b.setAttribute("src",a[f]):b.hasAttribute("href")?b.setAttribute("href",a[f]):b.innerText=a[f]})}})};c(a),output.push(b)}),item.innerHTML="",output.forEach(a=>item.appendChild(a)))})}createElement(a){const b=document.createElement("template");return b.innerHTML=a.trim(),b.content.firstElementChild}set(a){this.state=a,this.resolve()}change(a,b){this.state[a]=b,this.resolve()}push(a,b){this.state[a].push(b),this.resolve()}get(){return this.state}registerElements(a){this.state.elements=a}handleElements(){this.state.elements&&this.state.elements.forEach(a=>{const b=a[0],c=a[1];document.querySelectorAll(b).forEach(a=>{a&&(a.innerHTML=c.render(),c.init())})})}resolve(){this.handleText(),this.handleConditional(),this.handleEach(),this.handleElements()}}const state=new ReactivityProxy;

/***/ }),

/***/ "./components/footer/footer.html":
/*!***************************************!*\
  !*** ./components/footer/footer.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<hr>\n<footer>\n  <p>Footer here</p>\n</footer>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./components/nav/nav.html":
/*!*********************************!*\
  !*** ./components/nav/nav.html ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<nav>\n  <ul>\n    <li>Home</li>\n    <li>About</li>\n    <li data-title></li>\n  </ul>\n</nav>\n<hr>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./components/footer/footer.scss":
/*!***************************************!*\
  !*** ./components/footer/footer.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./components/nav/nav.scss":
/*!*********************************!*\
  !*** ./components/nav/nav.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ReactivityProxy.js */ "./lib/ReactivityProxy.js");
/* harmony import */ var _components_nav_nav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/nav/nav.js */ "./components/nav/nav.js");
/* harmony import */ var _components_footer_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/footer/footer.js */ "./components/footer/footer.js");
_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.registerElements([["nav-tpl",_components_nav_nav_js__WEBPACK_IMPORTED_MODULE_1__.Nav],["footer-tpl",_components_footer_footer_js__WEBPACK_IMPORTED_MODULE_2__.Footer]]),_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.set({title:"Hello World!",name:"Jon Doe",displayTitle:!0,productsArray:[{id:1,title:"Product 1",price:"$10",data:{color:"green"}},{id:2,title:"Product 2",price:"$20",data:{color:"blue"}},{id:3,title:"Product 3",price:"$30",data:{color:"black"}}],users:[{id:1,name:"Steve",email:"s@s.com"},{id:2,name:"Other Steve",email:"o@s.com"}],car:{brand:"VW",model:"Gol",year:2010,engine:"AP 1.8",color:"blue",transmission:"manual",doors:4,price:1e4,image:"https://s3.amazonaws.com/car-images-bucket/vw/gol/gol-1.jpg",buyer:{name:"Victor",phone:"55 11 99999-9999"}},clickFunction(){_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.change("title","Success!"),_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.change("name","Victor"),_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.push("productsArray",{id:4,title:"Product 3",price:"$30",data:{color:"pink"}})},changeFunction(a){_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.change("title",a)}}),_lib_ReactivityProxy_js__WEBPACK_IMPORTED_MODULE_0__.state.resolve();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map