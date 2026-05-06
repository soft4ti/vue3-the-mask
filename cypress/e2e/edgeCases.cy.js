describe("Edge Cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should handle placa mask with letters and numbers", () => {
    cy.get("#placa").clear().type("abc1234").should("have.value", "ABC 1234");
  });

  it("should handle fast typing without breaking mask", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312312", { delay: 0 })
      .should("have.value", "12.312.312/3123-12");
  });
});
