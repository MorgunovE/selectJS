// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"select/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

// 23-1 and 25-3 and 27-2 and 27-7 and 31-2
var getTemplate = function getTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholder = arguments.length > 1 ? arguments[1] : undefined;
  var selectedId = arguments.length > 2 ? arguments[2] : undefined;
  // console.log(data)
  var text = placeholder !== null && placeholder !== void 0 ? placeholder : 'Default placeholder';
  var items = data.map(function (item) {
    // 31-3
    var cls = '';

    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }

    return "\n      <li class=\"select__item ".concat(cls, "\" data-type=\"item\" data-id=\"").concat(item.id, "\">").concat(item.value, "</li>\n    ");
  }); // 33

  return "\n    <div class=\"select__backdrop\" data-type=\"backdrop\"></div>\n    <div class=\"select__input\" data-type=\"input\">\n      <span data-type=\"value\">".concat(text, "</span>\n      <i class=\"fa fa-chevron-down\" data-type=\"arrow\"></i>\n    </div>\n    <div class=\"select__dropdown\">\n      <ul class=\"select__list\">\n        ").concat(items.join(''), "\n      </ul>\n    </div>\n  ");
}; // 9


var _render = /*#__PURE__*/new WeakSet();

var _setup = /*#__PURE__*/new WeakSet();

var Select = /*#__PURE__*/function () {
  // 23
  function Select(selector, options) {
    _classCallCheck(this, Select);

    _setup.add(this);

    _render.add(this);

    this.$el = document.querySelector(selector); // 25

    this.options = options; // 27-5 and 31

    this.selectedId = options.selectedId; // 23-3

    _classPrivateMethodGet(this, _render, _render2).call(this); // 23-5


    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  } // 23-2


  _createClass(Select, [{
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
      this.$arrow.classList.remove('fa-chevron-down');
      this.$arrow.classList.add('fa-chevron-up');
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
      this.$arrow.classList.add('fa-chevron-down');
      this.$arrow.classList.remove('fa-chevron-up');
    } // 23-7

  }, {
    key: "clickHandler",
    value: function clickHandler(event) {
      // console.log(event)
      var type = event.target.dataset.type; // console.log(type)

      if (type === 'input') {
        this.toggle();
      } else if (type === 'item') {
        // 27-3
        var id = event.target.dataset.id; // console.log('id', id)

        this.select(id);
      } else if (type === 'backdrop') {
        // 35
        // console.log('Close')
        this.close();
      }
    } // 27-4

  }, {
    key: "select",
    value: function select(id) {
      this.selectedId = id; // 27-9

      this.$value.textContent = this.current.value; // 29

      this.$el.querySelectorAll('[data-type="item"]').forEach(function (el) {
        el.classList.remove('selected');
      });
      this.$el.querySelector("[data-id=\"".concat(id, "\"]")).classList.add('selected'); // 37

      this.options.onSelect ? this.options.onSelect(this.current) : null;
      this.close();
    } // 27-6

  }, {
    key: "current",
    get: function get() {
      var _this = this;

      return this.options.data.find(function (item) {
        return item.id === _this.selectedId;
      });
    } // 23-9

  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.classList.contains('open');
    } // 23-8

  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    } // 23-6

  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler); // 32

      this.$el.innerHTML = '';
    }
  }]);

  return Select;
}();

exports.Select = Select;

function _render2() {
  // 25-1 and 27
  var _this$options = this.options,
      placeholder = _this$options.placeholder,
      data = _this$options.data;
  this.$el.classList.add('select'); // 25-2 and 27-1 and 31-1

  this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
}

function _setup2() {
  this.clickHandler = this.clickHandler.bind(this);
  this.$el.addEventListener('click', this.clickHandler);
  this.$arrow = this.$el.querySelector('[data-type="arrow"]'); // 27-8

  this.$value = this.$el.querySelector('[data-type="value"]');
}
},{}],"../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"select/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _select = require("/select/select");

require("./select/style.scss");

// 10
// 17
// 7 and 22
var select = new _select.Select('#select', {
  // 24
  placeholder: 'Choose element',
  // 30
  // selectedId: '3',
  // 26
  data: [{
    id: '1',
    value: 'React'
  }, {
    id: '2',
    value: 'Angular'
  }, {
    id: '3',
    value: 'Vue'
  }, {
    id: '4',
    value: 'React Native'
  }, {
    id: '5',
    value: 'Next'
  }, {
    id: '6',
    value: 'Nest'
  }],
  // 36
  onSelect: function onSelect(item) {
    console.log('Selected Item', item);
  }
});
window.s = select;
},{"/select/select":"select/select.js","./select/style.scss":"select/style.scss"}],"../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53696" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/selectJS.e31bb0bc.js.map