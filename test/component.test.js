import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TheMask from "../src/component.vue";
import directive from "../src/directive";

describe("TheMask Component", () => {
  test("should render with mask", () => {
    const wrapper = mount(TheMask, {
      props: {
        mask: "#.#",
        modelValue: "123",
      },
    });

    expect(wrapper.find("input").element.value).toBe("1.2");
  });

  test("null value should not throw error", () => {
    const wrapper = mount(TheMask, {
      props: {
        mask: "#.#",
        modelValue: null,
      },
    });

    expect(wrapper.find("input").element.value).toBe("");
  });

  test("should update value when prop changes", async () => {
    const wrapper = mount(TheMask, {
      props: {
        mask: "#.#",
        modelValue: "12",
      },
    });

    expect(wrapper.find("input").element.value).toBe("1.2");

    await wrapper.setProps({ modelValue: "34" });
    expect(wrapper.find("input").element.value).toBe("3.4");
  });

  test("should emit update:modelValue on input", async () => {
    const wrapper = mount(TheMask, {
      props: {
        mask: "#.#",
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("12");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["12"]);
  });
});

describe("Directive", () => {
  test("directive should accept array", () => {
    const mockElement = {
      tagName: "INPUT",
      value: "",
      dispatchEvent: () => {},
    };

    expect(() => {
      directive(mockElement, { value: ["#.#", "##.#"] });
    }).not.toThrow();
  });

  test("directive should accept string", () => {
    const mockElement = {
      tagName: "INPUT",
      value: "",
      dispatchEvent: () => {},
    };

    expect(() => {
      directive(mockElement, { value: "#.#" });
    }).not.toThrow();
  });
});
