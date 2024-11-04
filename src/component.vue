<template>
  <input type="text" v-mask="config" :value="display" @input="onInput" />
</template>

<script>
import mask from "./directive";
import tokens from "./tokens";
import masker from "./masker";

export default {
  name: "TheMask",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Number],
    mask: {
      type: [String, Array],
      required: true,
    },
    masked: {
      // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false, // raw
    },
    tokens: {
      type: Object,
      default: () => tokens,
    },
  },
  directives: { mask },
  data() {
    return {
      lastValue: null, // avoid unecessary emit when has no change
      display: this.modelValue,
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
    },
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked,
      };
    },
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
    },
  },
};
</script>
