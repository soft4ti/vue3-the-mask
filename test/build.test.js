import { describe, test, expect } from "vitest";

describe("Build exports", async () => {
  test("should export default install function", async () => {
    const VueTheMask = await import("../dist/vue-the-mask.es.js");
    expect(typeof VueTheMask.default).toBe("function");
  });

  test("should export TheMask component", async () => {
    const { TheMask } = await import("../dist/vue-the-mask.es.js");
    expect(TheMask).toBeDefined();
    expect(TheMask.name).toBe("TheMask");
  });

  test("should export tokens", async () => {
    const { tokens } = await import("../dist/vue-the-mask.es.js");
    expect(tokens).toBeDefined();
    expect(typeof tokens).toBe("object");
    expect(tokens["#"]).toBeDefined();
  });

  test("should export mask directive", async () => {
    const { mask } = await import("../dist/vue-the-mask.es.js");
    expect(mask).toBeDefined();
  });
});
