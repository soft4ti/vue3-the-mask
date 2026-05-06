describe("Edge Cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should handle BR car plate mask with letters and numbers", () => {
    cy.get("#placa").clear().type("abc1234").should("have.value", "ABC 1234");
  });

  it("should handle fast typing without breaking mask", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312312", { delay: 0 })
      .should("have.value", "12.312.312/3123-12");
  });

  describe("Custom tokens", () => {
    it("should accept valid hex characters and transform to uppercase", () => {
      cy.get("#hex-color")
        .clear()
        .type("a1b2c3")
        .should("have.value", "A1B2C3");
    });

    it("should ignore invalid characters", () => {
      cy.get("#hex-color").clear().type("g1h2i3").should("have.value", "123");
    });

    it("should stop at mask limit (6 chars)", () => {
      cy.get("#hex-color")
        .clear()
        .type("a1b2c3d4")
        .should("have.value", "A1B2C3");
    });
  });
});
