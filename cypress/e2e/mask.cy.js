describe("TheMask Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Basic Masking", () => {
    it("should apply phone mask correctly", () => {
      cy.get("#phone")
        .type("44998765432")
        .should("have.value", "(44) 99876-5432");
    });

    it("should apply CPF mask correctly", () => {
      cy.get('[id="cpf"]')
        .type("12345678901")
        .should("have.value", "123.456.789-01");
    });

    it("should apply date mask correctly", () => {
      cy.get('[id="date"]').type("12252023").should("have.value", "12/25/2023");
    });

    it("should apply IP mask correctly", () => {
      cy.get('[id="ip"]')
        .type("192168001001")
        .should("have.value", "192.168.001.001");
    });
  });

  describe("Keyboard Interaction", () => {
    it("should handle backspace correctly", () => {
      cy.get("#input")
        .type("023")
        .should("have.value", "+1 02.3")
        .type("{backspace}")
        .should("have.value", "+1 02.");
    });

    it("should insert in the middle correctly", () => {
      cy.get("#input")
        .type("0234")
        .should("have.value", "+1 02.34.")
        .type("{leftarrow}{leftarrow}{leftarrow}{leftarrow}")
        .type("98")
        .should("have.value", "+1 02.983.4");
    });

    it("should maintain cursor position", () => {
      cy.get("#input")
        .type("012")
        .should("have.value", "+1 01.2")
        .type("{leftarrow}")
        .type("9")
        .should("have.value", "+1 01.92");
    });
  });

  describe("Edge Cases", () => {
    it("should handle mask at end correctly", () => {
      cy.get('[id="maskAtEnd"]').type("12").should("have.value", "(12)");
    });

    it("should handle CEP mask", () => {
      cy.get('[id="cep"]').type("12345678").should("have.value", "12345-678");
    });

    it("should handle placa mask with letters and numbers", () => {
      cy.get('[id="placa"]').type("abc1234").should("have.value", "ABC-1234");
    });
  });

  describe("CNPJ Mask", () => {
    it("should apply CNPJ mask correctly", () => {
      cy.get('[id="cnpj"]')
        .type("12345678901234")
        .should("have.value", "12.345.678/9012-34");
    });
  });
});
