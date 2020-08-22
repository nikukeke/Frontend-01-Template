/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ \"./gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction createElement(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]); // o[name] = attributes[name];\n  } // console.log(children);\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === \"object\" && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === \"string\") {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return;\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      //attribute\n      // this[name] = value;\n      this.root.setAttribute(name, value);\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        console.log(RegExp.$1);\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        });\n        this.addEventListener(eventName, value);\n      }\n\n      if (name === 'enableGesture') {\n        Object(_gesture__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, handler, config) {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"innerText\",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./gesture.js":
/*!********************!*\
  !*** ./gesture.js ***!
  \********************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// 监听 识别 分发\n// let element = document.body;\nfunction enableGesture(element) {\n  var contexts = Object.create(null);\n  var MOUSE_SYMBOL = Symbol(\"mouse\");\n  if (document.ontouchstart !== null) element.addEventListener(\"mousedown\", function (event) {\n    contexts[MOUSE_SYMBOL] = Object.create(null);\n    start(event, contexts[MOUSE_SYMBOL]);\n\n    var mousemove = function mousemove(event) {\n      // console.log(event.clientX, event.clientY);\n      move(event, contexts[MOUSE_SYMBOL]);\n    };\n\n    var mouseend = function mouseend(event) {\n      end(event, contexts[MOUSE_SYMBOL]);\n      document.removeEventListener(\"mousemove\", mousemove);\n      document.removeEventListener(\"mouseup\", mouseend);\n    };\n\n    document.addEventListener(\"mousemove\", mousemove);\n    document.addEventListener(\"mouseup\", mouseend);\n  });\n  element.addEventListener(\"touchstart\", function (event) {\n    // console.log(event)\n    // console.log(event.changedTouches[0]);\n    // console.log(\"start\")\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener(\"touchmove\", function (event) {\n    console.log(\"move\");\n\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        contexts[touch.identifier] = Object.create(null);\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener(\"touchend\", function (event) {\n    console.log(\"end\");\n\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        contexts[touch.identifier] = Object.create(null);\n        end(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener(\"touchcancel\", function (event) {\n    console.log(\"cancel\");\n\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        contexts[touch.identifier] = Object.create(null);\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); // touchend 和 touchcancel只触发一个\n  // tap\n  // pan --- panstart panmove panend\n  // flick\n  // press --- pressstart pressend\n\n  var start = function start(point, context) {\n    element.dispatchEvent(Object.assign(new CustomEvent('start'), {\n      // element.dispatchEvent(new CustomEvent('start',{\n      startX: point.clientX,\n      startY: point.clientY,\n      clientX: point.clientX,\n      clientY: point.clientY\n    }));\n    context.startX = point.clientX, context.startY = point.clientY;\n    context.moves = [];\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.timoutHandler = setTimeout(function () {\n      if (context.isPan) return;\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true; // console.log(\"pressstart\"); \n\n      element.dispatchEvent(new CustomEvent('pressstart', {}));\n    }, 500); // console.log(\"start\",point.clientX, point.clientY)\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY; // console.log(point.clientX);\n    // console.log(context);\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      // console.log(\"presscancel\") \n      element.dispatchEvent(new CustomEvent('presscancel', {}));\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false; // console.log(\"panstart\");\n\n      element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {\n        // element.dispatchEvent(new CustomEvent('panstart',{\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    } // console.log(\"move\", dx, dy)\n\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      });\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      }); // console.log(\"pan\"); \n\n      var e = new CustomEvent('pan');\n      Object.assign(e, {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      });\n      element.dispatchEvent(e);\n    }\n  };\n\n  var end = function end(point, context) {\n    // console.log(\"end\",point.clientX, point.clientY)\n    if (context.isPan) {\n      var dx = point.clientX - context.startX,\n          dy = point.clientY - context.startY;\n      var record = context.moves[0]; // console.log(context.moves);\n\n      var speed = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2)) / (Date.now() - record.t);\n      var isFlick = speed > 2.5; // console.log(speed);\n\n      if (isFlick) {\n        // console.log('flick');\n        element.dispatchEvent(new CustomEvent('flick', {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed\n        }));\n      }\n\n      element.dispatchEvent(Object.assign(new CustomEvent('panend'), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY,\n        speed: speed,\n        isFlick: isFlick\n      })); // console.log(\"panend\");\n    }\n\n    if (context.isTap) {\n      element.dispatchEvent(new CustomEvent('tap', {})); // console.log(\"tap\");\n    }\n\n    if (context.isPress) {\n      element.dispatchEvent(new CustomEvent('pressend', {})); // console.log(\"pressend\");\n    }\n\n    clearTimeout(context.timoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    // console.log(\"cancel\",point.clientX, point.clientY)\n    // console.log(\"canceled\")\n    element.dispatchEvent(new CustomEvent('canceled', {}));\n    clearTimeout(context.timoutHandler);\n  };\n}\n\n//# sourceURL=webpack:///./gesture.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n // import { Carousel } from \"./Carousel.js\";\n// import { Panel } from \"./Panel\";\n// import { TabPanel } from \"./TabPanel\";\n// import { ListView } from \"./ListView\";\n// class MyComponent {\n//     // 只有一次设置\n//     constructor(config) {\n//         this.children = [];\n//     }\n//     setAttribute(name, value) {  // attribute \n//         this.root.setAttribute(name, value);\n//     }\n//     appendChild(child) {  // children \n//         this.children.push(child);\n//     }\n//     render() {\n//         return <article>\n//             <header>I'm a header</header>\n//             {this.slot}\n//             <footer>I'm a footer</footer>\n//         </article>\n//     }\n//     mountTo(parent) {\n//         this.slot = <div></div>\n//         for (let child of this.children) { \n//             this.slot.appendChild(child)\n//         }\n//         this.render().mountTo(parent)\n//     }\n// }\n// let component = <Carousel data={[\n//     \"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\",\n//     \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\",\n//     \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\",\n//     \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\",\n// ]} />\n// component.mountTo(document.body)\n// let panel =<Panel title=\"this is my panel\">\n//     <span>this is my context</span>\n// </Panel>\n// let panel =<TabPanel>\n//     <span title=\"title1\">this is my context1</span>\n//     <span title=\"title2\">this is my context2</span>\n//     <span title=\"title3\">this is my context3</span>\n//     <span title=\"title4\">this is my context4</span>\n// </TabPanel>\n// let panel =<CarouselView>\n//     <span>this is my context1</span>\n//     <span>this is my context2</span>\n//     <span>this is my context3</span>\n//     <span>this is my context4</span>\n// </CarouselView>\n// let data = [\n//     { title: '蓝猫1', url: \"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\" },\n//     { title: '蓝猫2', url: \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\" },\n//     { title: '蓝猫3', url: \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\" },\n//     { title: '蓝猫4', url: \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\" },\n// ]\n// let list = <ListView data={data}>\n//     {record => <figure>\n//         <img src={record.url} />\n//         <figcaption>{record.title}</figcaption>\n//     </figure>}\n// </ListView>\n// 1.33\n// list.mountTo(document.body)\n// window.panel = panel;\n// let component = <MyComponent>\n//     <div>text text text</div>\n// </MyComponent>;\n// let component = <div>{new Wrapper(\"span\")}</div>;\n\nvar element = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null, Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"span\", null, \"hello world\"));\nelement.mountTo(document.body);\n{\n  /* <div id=\"a\" cls=\"b\" style=\"width:100px;height:100px;background-color:pink;\">\n     <div>ext text tex</div> \n     <div>{1}</div>\n     <div>{new Wrapper(\"span\")}</div>\n  </div> */\n} // component.id = \"c\";\n// console.log(component);\n// 编译后的代码\n// var component = createElement(Parent, {\n//     id: \"a\",\n//     \"class\": \"b\"\n// }, createElement(Child, null),\n//     createElement(Child, null),\n//     createElement(Child, null));\n// console.log(component);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });