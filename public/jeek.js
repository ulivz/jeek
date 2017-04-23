(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jeek"] = factory();
	else
		root["jeek"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 将 ArrayLike 的对象转化为数组
 * @type {Function}
 */
var _from = exports._from = Array.from ? Array.from : function (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
};

/**
 * 类似于 forEach, 因此也不能跳出
 * @param array
 * @param func
 */
var each = exports.each = function each(array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
        func(array[i], i, array);
    }
};

/**
 * 类似于 _.map
 * @param array
 * @param func
 */
var map = exports.map = function map(array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
        array[i] = func(array[i], i, array);
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isType = isType;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isPureObject = isPureObject;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
var TYPE = {
    Number: '[object Number]',
    Boolean: '[object Boolean]',
    String: '[object String]',
    Undefined: '[object Undefined]',
    Null: "[object Null]",
    Object: "[object Object]"
};

function isType(value, type) {
    return Object.prototype.toString.call(value) === TYPE[type];
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isPureObject(value) {
    return isType(value, 'Object');
}

function isNumber(value) {
    return isType(value, 'Number');
}

function isString(value) {
    return isType(value, 'String');
}

function isUndefined(value) {
    return value === void 0;
}

function isNull(value) {
    return isType(value, 'Null');
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isPrototypeOf = isPrototypeOf;
exports.deepClone = deepClone;
exports.clone = clone;
exports.softMerge = softMerge;
exports.merge = merge;
exports.createByPrototype = createByPrototype;
exports.inherit = inherit;
exports.baseInherit = baseInherit;

var _type = __webpack_require__(1);

var _Type = _interopRequireWildcard(_type);

var _array = __webpack_require__(0);

var _Array = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _keys = Object.keys;
var _assign = Object.assign;
var _create = Object.create;
var _defineProperty = Object.defineProperty;
var _defineProperties = Object.defineProperties;
var _getPrototypeOf = Object.getPrototypeOf;
var _setPrototypeOf = Object.setPrototypeOf;

/**
 * 判断一个对象是否在另一个对象的原型上
 * 本方法用来测试第二个参数对象的原型是否在第一个参数对象的原型链上
 * @param source
 * @param target
 */
function isPrototypeOf(source, target) {
    if (!_Type.isObject(target)) {
        throw new Error('[Error] The given target is not an object');
    }
    // isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。
    return target.isPrototypeOf(source);
}

/**
 * 传入两个对象，进行递归深克隆
 * @param source
 * @param target
 */
function baseClone(source, target) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = Object.keys(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;


            // 若存在对象的属性引用对象自身的
            // 为了避免死循环，跳过
            if (source[key] === source) continue;

            // 引用类型
            // 继续递归克隆
            if (_typeof(source[key]) === 'object') {
                target[key] = source[key].constructor === Array ? [] : {};
                baseClone(source[key], target[key]);

                // 值类型
            } else {
                target[key] = source[key];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/**
 * 深克隆
 * @param source
 * @returns {Object}
 */
function deepClone(ob) {
    var _ob = {};
    baseClone(ob, _ob);
    return _ob;
}

/**
 * 浅克隆
 * @param object
 * @returns {{}}
 */
function clone(object) {
    var _ob = {};
    for (var key in object) {
        _ob[key] = object[key];
    }
    return _ob;
}

/**
 * 基础的 merge 方法
 * @param type
 * @param source
 * @param objs
 * @returns {*}
 */
function baseMerge(type, source, objs) {

    if (!/^(hard|soft)$/.test(type)) {
        throw new Error('[Error] The given type must be soft or hard');
    }

    if (!objs) {
        return source;
    } else {

        for (var i = 0; i < objs.length; i++) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(objs[i])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (type === 'soft' && source.hasOwnProperty(key)) {
                        continue;
                    }
                    source[key] = objs[i][key];
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }
}

/**
 * merge - 本方法不会覆盖源对象上的同名属性
 * @param source
 */
function softMerge(source) {
    var objs = Array.from(arguments);
    objs.splice(0, 1);
    baseMerge('soft', source, objs);
    return source;
}

/**
 * merge - 本方法会覆盖源对象上的同名属性
 * @param source
 */
function merge(source) {
    var objs = Array.from(arguments);
    objs.splice(0, 1);
    baseMerge('hard', source, objs);
    return source;
}

/**
 * 传入一个对象，返回一个继承其原型的对象实例
 * @param ob
 * @returns {f}
 */
function createByPrototype(ob) {
    var f = new Function();
    f.prototype = ob.prototype;
    return new f();
}

/**
 * 传入一个对象，返回一个继承其本身的对象实例
 * @param ob
 * @returns {f}
 */
var create = exports.create = _create ? _create : function (ob) {
    var f = new Function();
    f.prototype = ob;
    return new f();
};

/**
 * 多继承
 * @param source
 * @param target
 */
function inherit() {

    var args = Array.from(arguments);

    for (var i = args.length - 1; i > 0; i--) {
        baseInherit(args[i - 1], args[i]);
    }
}

/**
 * 基本的继承方法 - 寄生组合式继承
 * @param child
 * @param parent
 */
function baseInherit(child, parent) {

    if (!child || !parent) {
        throw new Error('[Error] Unexpeacted parameters');
    }

    var _ob = createByPrototype(parent);

    if (Object.keys(child.prototype).length !== 0) {
        merge(_ob, child.prototype);
    }

    // 寄生组合式继承
    _ob.constructor = child;
    child.prototype = _ob;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _object = __webpack_require__(2);

var object = _interopRequireWildcard(_object);

var _array = __webpack_require__(0);

var array = _interopRequireWildcard(_array);

var _type = __webpack_require__(1);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __ = object.merge({}, object, array, type);

console.log(__);

/***/ })
/******/ ]);
});