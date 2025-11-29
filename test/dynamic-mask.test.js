import { describe, test, expect } from "vitest";
import dynamicMask from "../src/dynamic-mask";
import maskit from "../src/maskit";
import tokens from "../src/tokens";

describe("dynamicMask", () => {
  test("empty", () => {
    const masks = [];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("12345")).toBe("");
  });

  test("single", () => {
    const masks = ["#.#"];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("12")).toBe("1.2");
    expect(mask("321")).toBe("3.2");
  });

  test("CEP USA/BR", () => {
    const masks = ["#####", "#####-###"];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("12345")).toBe("12345");
    expect(mask("123456")).toBe("12345-6");
    expect(mask("12345678")).toBe("12345-678");
  });

  test("Reverse CEP USA/BR", () => {
    const masks = ["#####-###", "#####"];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("12345")).toBe("12345");
    expect(mask("123456")).toBe("12345-6");
    expect(mask("12345678")).toBe("12345-678");
  });

  test("cpf/cnpj", () => {
    const masks = ["###.###.###-##", "##.###.###/####-##"];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("12345678901")).toBe("123.456.789-01");
    expect(mask("123456789012")).toBe("12.345.678/9012");
  });

  test("bank agency", () => {
    const masks = ["####", "####-#", "####-##"];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("1234")).toBe("1234");
    expect(mask("12345")).toBe("1234-5");
    expect(mask("123456")).toBe("1234-56");
  });

  test("bank account", () => {
    const masks = [
      "#####-#",
      "######-#",
      "#######-#",
      "########-#",
      "#########-#",
    ];
    const mask = dynamicMask(maskit, masks, tokens);
    expect(mask("123456")).toBe("12345-6");
    expect(mask("1234567")).toBe("123456-7");
    expect(mask("12345678")).toBe("1234567-8");
    expect(mask("123456789")).toBe("12345678-9");
    expect(mask("1234567890")).toBe("123456789-0");
  });
});
