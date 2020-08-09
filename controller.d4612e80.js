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
})({"src/typescript/dom-elems.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMElements = void 0;

var getElement = function getElement(selector) {
  return document.querySelector(selector);
};

exports.DOMElements = {
  // WELCOME PAGE
  modalWrapper: getElement('.modal'),
  modalRegister: getElement('.modal__register'),
  navigateToLogin: getElement('.link-to-login'),
  modalLogin: getElement('.modal__login'),
  navigateToRegister: getElement('.link-to-register'),
  welcomePage: getElement('.welcome-page'),
  inputRegisterEmail: getElement('.modal__input--register-email'),
  inputRegisterPassword: getElement('.modal__input--register-password'),
  inputRegisterUsername: getElement('.modal__input--register-name'),
  inputLoginEmail: getElement('.modal__input--login-email'),
  inputLoginPassword: getElement('.modal__input--login-password'),
  buttonRegister: getElement('.button--auth--register'),
  buttonLogin: getElement('.button--auth--login'),
  registerErrorMessage: getElement('.modal__text--register-error'),
  loginErrorMessage: getElement('.modal__text--login-error'),
  // HABITS PAGE
  habitsPage: getElement('.habits-page'),
  navigateToLogOut: getElement('.nav__item--log-out')
};
},{}],"src/typescript/view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var dom_elems_1 = require("./dom-elems");

var View =
/** @class */
function () {
  function View() {
    var _this = this; // WELCOME PAGE


    this.bindNavigateToLoginModalClick = function () {
      dom_elems_1.DOMElements.navigateToLogin.addEventListener('click', function () {
        dom_elems_1.DOMElements.modalRegister.style.display = 'none';
        dom_elems_1.DOMElements.modalLogin.style.display = 'initial';
      });
    };

    this.bindNavigateToRegisterModalClick = function () {
      dom_elems_1.DOMElements.navigateToRegister.addEventListener('click', function () {
        dom_elems_1.DOMElements.modalRegister.style.display = 'initial';
        dom_elems_1.DOMElements.modalLogin.style.display = 'none';
      });
    };

    this.bindRegisterClick = function (handler) {
      dom_elems_1.DOMElements.buttonRegister.addEventListener('click', function () {
        handler({
          email: _this.userRegisterMail,
          password: _this.userRegisterPassword,
          username: _this.userRegisterUsername
        });
      });
    };

    this.bindLoginClick = function (handler) {
      dom_elems_1.DOMElements.buttonLogin.addEventListener('click', function () {
        handler({
          email: _this.userLoginMail,
          password: _this.userLoginPassword
        });
      });
    }; // HABITS PAGE


    this.bindNavigateLogOutClick = function (handler) {
      dom_elems_1.DOMElements.navigateToLogOut.addEventListener('click', function () {
        handler();
      });
    };

    document.addEventListener('click', function (e) {
      return e.preventDefault();
    });
    dom_elems_1.DOMElements.inputRegisterEmail.select();
  }

  Object.defineProperty(View.prototype, "userRegisterMail", {
    get: function get() {
      return dom_elems_1.DOMElements.inputRegisterEmail.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(View.prototype, "userRegisterPassword", {
    get: function get() {
      return dom_elems_1.DOMElements.inputRegisterPassword.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(View.prototype, "userRegisterUsername", {
    get: function get() {
      return dom_elems_1.DOMElements.inputRegisterUsername.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(View.prototype, "userLoginMail", {
    get: function get() {
      return dom_elems_1.DOMElements.inputLoginEmail.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(View.prototype, "userLoginPassword", {
    get: function get() {
      return dom_elems_1.DOMElements.inputLoginPassword.value;
    },
    enumerable: false,
    configurable: true
  });

  View.prototype.showRegisterResult = function (isRegistered) {
    dom_elems_1.DOMElements.registerErrorMessage.innerText = isRegistered ? '' : 'Error! You need to put a correct email, 4-12 character password and 4-12 character username! :)';
  };

  View.prototype.showLoginResult = function (isLogged) {
    if (!isLogged) {
      dom_elems_1.DOMElements.loginErrorMessage.innerText = 'Login error!';
    } else {
      dom_elems_1.DOMElements.loginErrorMessage.innerText = '';
      console.log('TODO login!');
      dom_elems_1.DOMElements.welcomePage.style.display = 'none';
      dom_elems_1.DOMElements.habitsPage.style.display = 'grid';
      dom_elems_1.DOMElements.modalWrapper.style.display = 'none';
      dom_elems_1.DOMElements.modalRegister.style.display = 'none';
      dom_elems_1.DOMElements.modalLogin.style.display = 'none';
    }
  };

  View.prototype.showLogoutResult = function (isLogged) {
    if (!isLogged) {
      dom_elems_1.DOMElements.welcomePage.style.display = 'grid';
      dom_elems_1.DOMElements.habitsPage.style.display = 'none';
      dom_elems_1.DOMElements.modalWrapper.style.display = 'initial';
      dom_elems_1.DOMElements.modalLogin.style.display = 'initial';
    }
  };

  return View;
}();

exports.View = View;
},{"./dom-elems":"src/typescript/dom-elems.ts"}],"src/typescript/enums.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HabitType = exports.ColorTheme = void 0;
var ColorTheme;

(function (ColorTheme) {
  ColorTheme[ColorTheme["Light"] = 1] = "Light";
  ColorTheme[ColorTheme["Dark"] = 2] = "Dark";
})(ColorTheme = exports.ColorTheme || (exports.ColorTheme = {}));

;
var HabitType;

(function (HabitType) {
  HabitType[HabitType["Day"] = 0] = "Day";
  HabitType[HabitType["Week"] = 1] = "Week";
  HabitType[HabitType["Month"] = 2] = "Month";
  HabitType[HabitType["Year"] = 3] = "Year";
})(HabitType = exports.HabitType || (exports.HabitType = {}));

;
},{}],"src/typescript/model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var enums_1 = require("./enums");

var Model =
/** @class */
function () {
  function Model() {
    var _this = this;

    this.habits = [];
    this.isRegistered = false;
    this.isLogged = false; // WELCOME PAGE

    this.validateRegister = function (config) {
      return _this.isRegistered = _this.authValidator(config);
    };

    this.validateLogin = function (config) {
      return _this.isLogged = _this.authValidator(config);
    };

    this.authValidator = function (config) {
      var emailValidator = /\S+@\S+\.\S+/;
      var configInputs = Object.keys(config).map(function (key) {
        return config[key];
      });

      if (!emailValidator.test(configInputs[0])) {
        // email
        return false;
      }

      if (configInputs[1].length < 4 || configInputs[1].length > 12) {
        // password
        return false;
      }

      if (configInputs[2] && (configInputs[2].length < 4 || configInputs[2].length > 9)) {
        // username, only for registering
        return false;
      }

      return true;
    }; // HABITS PAGE


    this.onLogout = function () {
      return _this.isLogged = false;
    };

    this.getDefaultColor = function (habitType) {
      switch (habitType) {
        case enums_1.HabitType.Day:
          return 'green';

        case enums_1.HabitType.Week:
          return 'pink';

        case enums_1.HabitType.Month:
          return 'blue';

        case enums_1.HabitType.Year:
          return 'yellow';
      }
    };

    this.habits = [{
      id: 1,
      name: 'Brush your teeth',
      order: 1,
      habitType: enums_1.HabitType.Day,
      description: 'Brush your teeth twice everyday!',
      activiTyActual: 0,
      activiTyGoal: 2,
      habitColor: this.getDefaultColor(enums_1.HabitType.Day)
    }, {
      id: 2,
      name: 'Talk to a stranger',
      order: 2,
      habitType: enums_1.HabitType.Week,
      description: 'Meet new people!',
      activiTyActual: 0,
      activiTyGoal: 1,
      habitColor: this.getDefaultColor(enums_1.HabitType.Week)
    }]; // console.log('default habits', this.habits);
  }

  return Model;
}();

exports.Model = Model;
},{"./enums":"src/typescript/enums.ts"}],"src/typescript/controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = require("./view");

var model_1 = require("./model");

document.addEventListener('DOMContentLoaded', function () {
  return new Controller(new view_1.View(), new model_1.Model());
});

var Controller =
/** @class */
function () {
  function Controller(view, model) {
    var _this = this;

    this.view = view;
    this.model = model; // WELCOME PAGE

    this.bindRegisterResult = function (isRegistered) {
      _this.view.showRegisterResult(isRegistered);
    };

    this.bindLoginResult = function (isLogged) {
      _this.view.showLoginResult(isLogged);
    };

    this.handleRegister = function (config) {
      _this.model.validateRegister(config);

      _this.bindRegisterResult(_this.model.isRegistered);
    };

    this.handleLogin = function (config) {
      _this.model.validateLogin(config);

      _this.bindLoginResult(_this.model.isLogged);
    }; // HABITS PAGE


    this.bindLogoutResult = function (isLogged) {
      _this.view.showLogoutResult(isLogged);
    };

    this.handleLogout = function () {
      _this.model.onLogout();

      _this.bindLogoutResult(_this.model.isLogged);
    }; // WELCOME PAGE


    this.view.bindNavigateToLoginModalClick();
    this.view.bindNavigateToRegisterModalClick();
    this.view.bindRegisterClick(this.handleRegister);
    this.view.bindLoginClick(this.handleLogin); // HABITS PAGE

    this.view.bindNavigateLogOutClick(this.handleLogout);
  }

  return Controller;
}();
},{"./view":"src/typescript/view.ts","./model":"src/typescript/model.ts"}],"../../.nvm/versions/node/v14.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56219" + '/');

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
},{}]},{},["../../.nvm/versions/node/v14.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/typescript/controller.ts"], null)
//# sourceMappingURL=/controller.d4612e80.js.map