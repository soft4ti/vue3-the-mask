/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 262:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.A = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  TheMask: () => (/* reexport */ component),
  "default": () => (/* binding */ entry_lib),
  mask: () => (/* reexport */ directive),
  tokens: () => (/* reexport */ tokens)
});

;// ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ const setPublicPath = (null);

;// ./src/tokens.js
/* harmony default export */ const tokens = ({
  '#': {
    pattern: /\d/
  },
  X: {
    pattern: /[0-9a-zA-Z]/
  },
  S: {
    pattern: /[a-zA-Z]/
  },
  A: {
    pattern: /[a-zA-Z]/,
    transform: v => v.toLocaleUpperCase()
  },
  a: {
    pattern: /[a-zA-Z]/,
    transform: v => v.toLocaleLowerCase()
  },
  '!': {
    escape: true
  }
});

// https://github.com/fernandofleury/vanilla-masker/blob/master/lib/vanilla-masker.js
// DIGIT = "9",
// ALPHA = "A",
// ALPHANUM = "S"

// https://github.com/niksmr/vue-masked-input
// 1 - number
// a - letter
// A - letter, forced to upper case when entered
// * - alphanumeric
// # - alphanumeric, forced to upper case when entered
// + - any character

// https://github.com/probil/v-mask
// #	Number (0-9)
// A	Letter in any case (a-z,A-Z)
// N	Number or letter
// X	Any symbol

// https://github.com/igorescobar/jQuery-Mask-Plugin/blob/master/src/jquery.mask.js#L518
// '0': {pattern: /\d/},
// '9': {pattern: /\d/, optional: true},
// '#': {pattern: /\d/, recursive: true},
// 'A': {pattern: /[a-zA-Z0-9]/},
// 'S': {pattern: /[a-zA-Z]/}

// https://github.com/the-darc/string-mask
// 0	Any numbers
// 9	Any numbers (Optional)
// #	Any numbers (recursive)
// A	Any alphanumeric character
// a	Any alphanumeric character (Optional) Not implemented yet
// S	Any letter
// U	Any letter (All lower case character will be mapped to uppercase)
// L	Any letter (All upper case character will be mapped to lowercase)
// $	Escape character, used to escape any of the special formatting characters.
;// ./src/maskit.js
function maskit(value, mask, masked = true, tokens) {
  value = value || '';
  mask = mask || '';
  var iMask = 0;
  var iValue = 0;
  var output = '';
  while (iMask < mask.length && iValue < value.length) {
    var cMask = mask[iMask];
    var masker = tokens[cMask];
    var cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) output += cMask;
      if (cValue === cMask) iValue++; // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  var restOutput = '';
  while (iMask < mask.length && masked) {
    var cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = '';
      break;
    }
    restOutput += cMask;
    iMask++;
  }
  return output + restOutput;
}
;// ./src/dynamic-mask.js
function dynamicMask(maskit, masks, tokens) {
  masks = masks.sort((a, b) => a.length - b.length);
  return function (value, mask, masked = true) {
    var i = 0;
    while (i < masks.length) {
      var currentMask = masks[i];
      i++;
      var nextMask = masks[i];
      if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
        return maskit(value, currentMask, masked, tokens);
      }
    }
    return ''; // empty masks
  };
}
;// ./src/masker.js


// Facade to maskit/dynamicMask when mask is String or Array
/* harmony default export */ function masker(value, mask, masked = true, tokens) {
  return Array.isArray(mask) ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens) : maskit(value, mask, masked, tokens);
}
;// ./src/directive.js



// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function directive_event(name) {
  var evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}
/* harmony default export */ function directive(el, binding) {
  var config = binding.value;
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config,
      tokens: tokens
    };
  }
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error("v-mask directive requires 1 input, found " + els.length);
    } else {
      el = els[0];
    }
  }
  el.oninput = function (evt) {
    if (!evt.isTrusted) return; // avoid infinite loop
    /* other properties to try to diferentiate InputEvent of Event (custom)
    InputEvent (native)
      cancelable: false
      isTrusted: true
       composed: true
      isComposing: false
      which: 0
     Event (custom)
      cancelable: true
      isTrusted: false
    */
    // by default, keep cursor at same position as before the mask
    var position = el.selectionEnd;
    // save the character just inserted
    var digit = el.value[position - 1];
    el.value = masker(el.value, config.mask, true, config.tokens);
    // if the digit was changed, increment position until find the digit again
    while (position < el.value.length && el.value.charAt(position - 1) !== digit) {
      position++;
    }
    if (el === document.activeElement) {
      el.setSelectionRange(position, position);
      setTimeout(function () {
        el.setSelectionRange(position, position);
      }, 0);
    }
    el.dispatchEvent(directive_event('input'));
  };
  var newDisplay = masker(el.value, config.mask, true, config.tokens);
  if (newDisplay !== el.value) {
    el.value = newDisplay;
    el.dispatchEvent(directive_event('input'));
  }
}
;// external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
const external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/component.vue?vue&type=template&id=2c68ee7e

const _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_mask = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveDirective)("mask");
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("input", {
    type: "text",
    value: $data.display,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 40, _hoisted_1)), [[_directive_mask, $options.config]]);
}
;// ./src/component.vue?vue&type=template&id=2c68ee7e

;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/component.vue?vue&type=script&lang=js



/* harmony default export */ const componentvue_type_script_lang_js = ({
  name: "TheMask",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Number],
    mask: {
      type: [String, Array],
      required: true
    },
    masked: {
      // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false // raw
    },
    tokens: {
      type: Object,
      default: () => tokens
    }
  },
  directives: {
    mask: directive
  },
  data() {
    return {
      lastValue: null,
      // avoid unecessary emit when has no change
      display: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      if (newValue !== this.lastValue) {
        this.display = newValue;
      }
    },
    masked() {
      this.refresh(this.display);
    }
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked
      };
    }
  },
  methods: {
    onInput(e) {
      if (e.isTrusted) return; // ignore native event
      this.refresh(e.target.value);
    },
    refresh(value) {
      this.display = value;
      var value = masker(value, this.mask, this.masked, this.tokens);
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.$emit("update:modelValue", value);
      }
    }
  }
});
;// ./src/component.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(262);
;// ./src/component.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)(componentvue_type_script_lang_js, [['render',render]])

/* harmony default export */ const component = (__exports__);
;// ./src/index.js



const install = app => {
  app.component(component.name, component);
  app.directive("mask", directive);
};
/* harmony default export */ const src_0 = (install);


// Install by default if included from script tag
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}
;// ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ const entry_lib = (src_0);


module.exports = __webpack_exports__;
/******/ })()
;