import { resolveDirective as g, withDirectives as y, createElementBlock as w, openBlock as _ } from "vue";
const h = {
  "#": { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (t) => t.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (t) => t.toLocaleLowerCase() },
  "!": { escape: !0 }
};
function c(t, e, n = !0, a) {
  t = t || "", e = e || "";
  for (var r = 0, o = 0, i = ""; r < e.length && o < t.length; ) {
    var u = e[r], s = a[u], l = t[o];
    s && !s.escape ? (s.pattern.test(l) && (i += s.transform ? s.transform(l) : l, r++), o++) : (s && s.escape && (r++, u = e[r]), n && (i += u), l === u && o++, r++);
  }
  for (var p = ""; r < e.length && n; ) {
    var u = e[r];
    if (a[u]) {
      p = "";
      break;
    }
    p += u, r++;
  }
  return i + p;
}
function A(t, e, n) {
  return e = e.sort((a, r) => a.length - r.length), function(a, r, o = !0) {
    for (var i = 0; i < e.length; ) {
      var u = e[i];
      i++;
      var s = e[i];
      if (!(s && t(a, s, !0, n).length > u.length))
        return t(a, u, o, n);
    }
    return "";
  };
}
function f(t, e, n = !0, a) {
  return Array.isArray(e) ? A(c, e, a)(t, e, n, a) : c(t, e, n, a);
}
function d(t) {
  var e = document.createEvent("Event");
  return e.initEvent(t, !0, !0), e;
}
function m(t, e) {
  var n = e.value;
  if ((Array.isArray(n) || typeof n == "string") && (n = {
    mask: n,
    tokens: h
  }), t.tagName.toLocaleUpperCase() !== "INPUT") {
    var a = t.getElementsByTagName("input");
    if (a.length !== 1)
      throw new Error("v-mask directive requires 1 input, found " + a.length);
    t = a[0];
  }
  t.oninput = function(o) {
    if (o.isTrusted) {
      var i = t.selectionEnd, u = t.value[i - 1];
      for (t.value = f(t.value, n.mask, !0, n.tokens); i < t.value.length && t.value.charAt(i - 1) !== u; )
        i++;
      t === document.activeElement && (t.setSelectionRange(i, i), setTimeout(function() {
        t.setSelectionRange(i, i);
      }, 0)), t.dispatchEvent(d("input"));
    }
  };
  var r = f(t.value, n.mask, !0, n.tokens);
  r !== t.value && (t.value = r, t.dispatchEvent(d("input")));
}
const E = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, r] of e)
    n[a] = r;
  return n;
}, V = {
  name: "TheMask",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Number],
    mask: {
      type: [String, Array],
      required: !0
    },
    masked: {
      // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: !1
      // raw
    },
    tokens: {
      type: Object,
      default: () => h
    }
  },
  directives: { mask: m },
  data() {
    return {
      lastValue: null,
      // avoid unecessary emit when has no change
      display: this.modelValue
    };
  },
  watch: {
    modelValue(t) {
      t !== this.lastValue && (this.display = t);
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
    onInput(t) {
      t.isTrusted || this.refresh(t.target.value);
    },
    refresh(e) {
      this.display = e;
      var e = f(e, this.mask, this.masked, this.tokens);
      e !== this.lastValue && (this.lastValue = e, this.$emit("update:modelValue", e));
    }
  }
}, T = ["value"];
function k(t, e, n, a, r, o) {
  const i = g("mask");
  return y((_(), w("input", {
    type: "text",
    value: r.display,
    onInput: e[0] || (e[0] = (...u) => o.onInput && o.onInput(...u))
  }, null, 40, T)), [
    [i, o.config]
  ]);
}
const v = /* @__PURE__ */ E(V, [["render", k]]), I = (t) => {
  t.component(v.name, v), t.directive("mask", m);
};
typeof window < "u" && window.Vue && window.Vue.use(I);
export {
  v as TheMask,
  I as default,
  m as mask,
  h as tokens
};
