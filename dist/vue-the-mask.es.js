import { createElementBlock as e, openBlock as t, resolveDirective as n, withDirectives as r } from "vue";
// src/tokens.js
var i = {
	"#": { pattern: /\d/ },
	X: { pattern: /[0-9a-zA-Z]/ },
	S: { pattern: /[a-zA-Z]/ },
	A: {
		pattern: /[a-zA-Z]/,
		transform: (e) => e.toLocaleUpperCase()
	},
	a: {
		pattern: /[a-zA-Z]/,
		transform: (e) => e.toLocaleLowerCase()
	},
	"!": { escape: !0 }
};
// src/maskit.js
function a(e, t, n = !0, r) {
	e ||= "", t ||= "";
	for (var i = 0, a = 0, o = ""; i < t.length && a < e.length;) {
		var s = t[i], c = r[s], l = e[a];
		c && !c.escape ? (c.pattern.test(l) && (o += c.transform ? c.transform(l) : l, i++), a++) : (c && c.escape && (i++, s = t[i]), n && (o += s), l === s && a++, i++);
	}
	for (var u = ""; i < t.length && n;) {
		var s = t[i];
		if (r[s]) {
			u = "";
			break;
		}
		u += s, i++;
	}
	return o + u;
}
// src/dynamic-mask.js
function o(e, t, n) {
	return t = t.sort((e, t) => e.length - t.length), function(r, i, a = !0) {
		for (var o = 0; o < t.length;) {
			var s = t[o];
			o++;
			var c = t[o];
			if (!(c && e(r, c, !0, n).length > s.length)) return e(r, s, a, n);
		}
		return "";
	};
}
// src/masker.js
function s(e, t, n = !0, r) {
	return Array.isArray(t) ? o(a, t, r)(e, t, n, r) : a(e, t, n, r);
}
// src/directive.js
function c(e) {
	var t = document.createEvent("Event");
	return t.initEvent(e, !0, !0), t;
}
function l(e, t) {
	var n = t.value;
	if ((Array.isArray(n) || typeof n == "string") && (n = {
		mask: n,
		tokens: i
	}), e.tagName.toLocaleUpperCase() !== "INPUT") {
		var r = e.getElementsByTagName("input");
		if (r.length !== 1) throw Error("v-mask directive requires 1 input, found " + r.length);
		e = r[0];
	}
	e.oninput = function(t) {
		if (t.isTrusted) {
			var r = e.selectionEnd, i = e.value[r - 1];
			for (e.value = s(e.value, n.mask, !0, n.tokens); r < e.value.length && e.value.charAt(r - 1) !== i;) r++;
			e === document.activeElement && (e.setSelectionRange(r, r), setTimeout(function() {
				e.setSelectionRange(r, r);
			}, 0)), e.dispatchEvent(c("input"));
		}
	};
	var a = s(e.value, n.mask, !0, n.tokens);
	a !== e.value && (e.value = a, e.dispatchEvent(c("input")));
}
// \0plugin-vue:export-helper
var u = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, d = {
	name: "TheMask",
	emits: ["update:modelValue"],
	props: {
		modelValue: [String, Number],
		mask: {
			type: [String, Array],
			required: !0
		},
		masked: {
			type: Boolean,
			default: !1
		},
		tokens: {
			type: Object,
			default: () => i
		}
	},
	directives: { mask: l },
	data() {
		return {
			lastValue: null,
			display: this.modelValue
		};
	},
	watch: {
		modelValue(e) {
			e !== this.lastValue && (this.display = e);
		},
		masked() {
			this.refresh(this.display);
		}
	},
	computed: { config() {
		return {
			mask: this.mask,
			tokens: this.tokens,
			masked: this.masked
		};
	} },
	methods: {
		onInput(e) {
			e.isTrusted || this.refresh(e.target.value);
		},
		refresh(e) {
			this.display = e;
			var e = s(e, this.mask, this.masked, this.tokens);
			e !== this.lastValue && (this.lastValue = e, this.$emit("update:modelValue", e));
		}
	}
}, f = ["value"];
function p(i, a, o, s, c, l) {
	let u = n("mask");
	return r((t(), e("input", {
		type: "text",
		value: c.display,
		onInput: a[0] ||= (...e) => l.onInput && l.onInput(...e)
	}, null, 40, f)), [[u, l.config]]);
}
var m = /*#__PURE__*/ u(d, [["render", p]]), h = (e) => {
	e.component(m.name, m), e.directive("mask", l);
};
typeof window < "u" && window.Vue && window.Vue.use(h);
export { m as TheMask, h as default, l as mask, i as tokens };
