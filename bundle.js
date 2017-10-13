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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var INCREMENT = exports.INCREMENT = 'INCREMENT';
var DECREMENT = exports.DECREMENT = 'DECREMENT';
var ADD = exports.ADD = 'ADD';
var COLOR = exports.COLOR = 'COLOR';
var STATUS_CHANGE = exports.STATUS_CHANGE = 'STATUS_CHANGE';

var increment = exports.increment = function increment() {
    return {
        type: INCREMENT
    };
};

var decrement = exports.decrement = function decrement() {
    return {
        type: DECREMENT
    };
};

var add = exports.add = function add(sum) {
    return {
        type: ADD,
        sum: sum
    };
};

var colorAct = exports.colorAct = function colorAct(color) {
    return {
        type: COLOR,
        color: color
    };
};

var status = exports.status = function status(message) {
    return {
        type: STATUS_CHANGE,
        message: message
    };
};

var incrementAsync = exports.incrementAsync = function incrementAsync() {
    return function (dispatch, getState) {
        dispatch(status('incrementing...'));
        return asyncApi().then(function () {
            dispatch(increment());
            dispatch(status(null));
        }).catch(function (err) {
            setTimeout(function () {
                return dispatch(status(null));
            }, 3000);
            return dispatch(status(err));
        });
    };
};

function asyncApi() {
    return new Promise(function (res, rej) {
        if (Math.random() < 0.5) {
            setTimeout(function () {
                return rej('sorry, wasn\'t able to increment...');
            }, 1500);
        }
        setTimeout(function () {
            return res();
        }, 1500);
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(2);

var _reducers = __webpack_require__(3);

var _actions = __webpack_require__(0);

var _middlewares = __webpack_require__(4);

var reducer = (0, _store.combineReducers)({ counter: _reducers.counter, color: _reducers.color, status: _reducers.status });

var store = (0, _store.createStore)(reducer, (0, _store.applyMiddleware)(_middlewares.asyncMiddleware /* , randomLogger */, _middlewares.groupLogger));

var counterField = document.getElementById('counter');
var incrBtn = document.getElementById('increment');
var decrBtn = document.getElementById('decrement');
var addForm = document.getElementById('add-form');
var addInput = document.getElementById('add-input');
var addBtn = document.getElementById('add-btn');
var box = document.getElementById('box');
var boxInput = document.getElementById('box-input');
var asyncBtn = document.getElementById('btn-async');
var mssgField = document.getElementById('mssg');

var handleAdd = function handleAdd(event) {
    event.preventDefault();
    if (!event.target[0].value) return;
    store.dispatch((0, _actions.add)(+event.target[0].value));
    event.target[0].value = null;
};

incrBtn.addEventListener('click', function () {
    return store.dispatch((0, _actions.increment)());
});
decrBtn.addEventListener('click', function () {
    return store.dispatch((0, _actions.decrement)());
});
addForm.addEventListener('submit', handleAdd);

boxInput.addEventListener('input', function (e) {
    return store.dispatch((0, _actions.colorAct)(e.target.value));
});
asyncBtn.addEventListener('click', function (e) {
    return store.dispatch((0, _actions.incrementAsync)());
});

store.subscribe(function () {
    return counterField.innerHTML = store.getState().counter;
});
store.subscribe(function () {
    return box.style.backgroundColor = store.getState().color;
});
store.subscribe(function () {
    return mssgField.innerHTML = store.getState().status;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createStore = createStore;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.applyMiddleware = applyMiddleware;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
    function Store(reducer, initialState) {
        _classCallCheck(this, Store);

        this.reducer = reducer;
        this.subscribers = [];
        this.getState = this.getState.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.state = initialState;
        this.dispatch({ type: '@@INIT' });
    }

    _createClass(Store, [{
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }, {
        key: 'dispatch',
        value: function dispatch(action) {
            this.state = this.reducer(this.state, action);
            this.subscribers.forEach(function (subscriber) {
                return subscriber();
            });
            return this.state;
        }
    }, {
        key: 'subscribe',
        value: function subscribe(cb) {
            var _this = this;

            this.subscribers.push(cb);
            cb();
            return function () {
                return _this.subscribers = _this.subscribers.filter(function (subscriber) {
                    return subscriber !== cb;
                });
            };
        }
    }]);

    return Store;
}();

function createStore(reducer, initialState, enhancer) {
    if (typeof initialState === 'function') {
        enhancer = initialState;
        initialState = undefined;
    }
    if (enhancer) {
        return enhancer(new Store(reducer, initialState));
    }
    var store = new Store(reducer, initialState);
    return store;
}

function combineReducers(reducers) {
    var stateSliceNames = Object.keys(reducers);
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        var nextState = stateSliceNames.reduce(function (accState, stateSliceName) {
            accState[stateSliceName] = reducers[stateSliceName](accState[stateSliceName], action);
            return accState;
        }, Object.assign({}, state));
        return nextState;
    };
}

function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}

function applyMiddleware() {
    for (var _len2 = arguments.length, middlewares = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewares[_key2] = arguments[_key2];
    }

    return function (store) {
        middlewares = middlewares.map(function (middleware) {
            return middleware(store);
        });
        var dispatch = compose.apply(undefined, _toConsumableArray(middlewares))(store.dispatch);
        return _extends({}, store, { dispatch: dispatch });
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.color = exports.status = exports.counter = undefined;

var _actions = __webpack_require__(0);

var counter = exports.counter = function counter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref = arguments[1];
    var type = _ref.type,
        sum = _ref.sum;

    switch (type) {
        case _actions.INCREMENT:
            return ++state;
        case _actions.DECREMENT:
            return --state;
        case _actions.ADD:
            return state + sum;
        default:
            return state;
    }
};

var status = exports.status = function status() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        message = _ref2.message;

    switch (type) {
        case _actions.STATUS_CHANGE:
            return message;
        default:
            return state;
    }
};

var color = exports.color = function color() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'white';
    var _ref3 = arguments[1];
    var type = _ref3.type,
        color = _ref3.color;

    return color || state;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var groupLogger = exports.groupLogger = function groupLogger(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
        return function (action) {
            console.group(action.type, '(group logger)');
            console.log('prev state:', getState());
            console.log('dispatching:', action);
            var res = next(action);
            console.log('curr state:', getState());
            console.groupEnd();
            return res;
        };
    };
};

var randomLogger = exports.randomLogger = function randomLogger(_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
        return function (action) {
            console.log(Math.random());
            var res = next(action);
            console.log(Math.random());
            return res;
        };
    };
};

var asyncMiddleware = exports.asyncMiddleware = function asyncMiddleware(_ref3) {
    var dispatch = _ref3.dispatch,
        getState = _ref3.getState;
    return function (next) {
        return function (action) {
            if (typeof action === 'function') {
                return action(next, getState);
            }
            return next(action);
        };
    };
};

/***/ })
/******/ ]);