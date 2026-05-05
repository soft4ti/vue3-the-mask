describe("TheMask Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Basic Masking", () => {
    it("Should apply US zip mask correctly", () => {
      cy.get('[id="us-zip"]')
        .clear()
        .type("54321")
        .should("have.value", "54321");
    });

    it("Should apply Brazil zip mask correctly", () => {
      cy.get('[id="br-zip"]')
        .clear()
        .type("12312312")
        .should("have.value", "12312-312");
    });

    it("Should apply CPF mask correctly", () => {
      cy.get('[id="cpf"]')
        .clear()
        .type("12312312312")
        .should("have.value", "123.123.123-12");
    });

    it("Should apply Brazil CNPJ mask correctly", () => {
      cy.get('[id="cnpj"]')
        .clear()
        .type("12123123123412")
        .should("have.value", "12.123.123/1234-12");
    });

    it("should apply US phone number mask correctly", () => {
      cy.get('[id="us-phone"]')
        .clear()
        .type("12025550134")
        .should("have.value", "+1 (202) 555-0134");
    });

    it("should apply BR phone number mask correctly", () => {
      cy.get('[id="br-phone"]')
        .clear()
        .type("1212341234")
        .should("have.value", "+55 (12) 1234-1234");
    });

    it("should apply date time mask correctly", () => {
      cy.get('[id="date-time"]')
        .clear()
        .type("19032003025948")
        .should("have.value", "19/03/2003 02:59:48");
    });

    it("should apply credit card mask correctly", () => {
      cy.get('[id="credit-card"]')
        .clear()
        .type("1234123412341234")
        .should("have.value", "1234 1234 1234 1234");
    });

    it("should apply date mask correctly", () => {
      cy.get('[id="date"]')
        .clear()
        .type("12252023")
        .should("have.value", "12/25/2023");
    });

    it("should apply time mask correctly", () => {
      cy.get('[id="time"]')
        .clear()
        .type("121212")
        .should("have.value", "12:12:12");
    });

    it("should apply BR car plate mask correctly", () => {
      cy.get('[id="placa"]')
        .clear()
        .type("abc1234")
        .should("have.value", "ABC 1234");
    });

    it("should apply Canada zip mask correctly", () => {
      cy.get('[id="ca-zip"]')
        .clear()
        .type("A1B2C3")
        .should("have.value", "A1B 2C3");
    });

    it("should apply IBAN mask correctly", () => {
      cy.get('[id="iban"]')
        .clear()
        .type("br2313123123123213123123123")
        .should("have.value", "BR23 1312 3123 1232 1312 3123 123");
    });

    it("should apply Vehicle Identification mask correctly", () => {
      cy.get('[id="vehicle-id"]')
        .clear()
        .type("KNDJB723025140702")
        .should("have.value", "KN.DJ.B7230.2.5.140702");
    });
  });

  describe("Dynamic Masks", () => {
    it("should apply CPF mask correctly", () => {
      cy.get('[id="cpf-cnpj"]')
        .clear()
        .type("12312312312")
        .should("have.value", "123.123.123-12");
    });

    it("should apply CNPJ mask correctly", () => {
      cy.get('[id="cpf-cnpj"]')
        .clear()
        .type("12312312312123")
        .should("have.value", "12.312.312/3121-23");
    });

    it("should apply phone Brazil 8th digit mask correctly", () => {
      cy.get('[id="phone"]')
        .clear()
        .type("1231231231")
        .should("have.value", "(12) 3123-1231");
    });

    it("should apply phone Brazil 9th digit mask correctly", () => {
      cy.get('[id="phone"]')
        .clear()
        .type("12312312312")
        .should("have.value", "(12) 31231-2312");
    });

    it("should apply Bank Agency 3th digit mask correctly", () => {
      cy.get('[id="bank-agency"]')
        .clear()
        .type("123")
        .should("have.value", "123");
    });

    it("should apply Bank Agency 4th digit mask correctly", () => {
      cy.get('[id="bank-agency"]')
        .clear()
        .type("1231")
        .should("have.value", "123-1");
    });

    it("should apply Bank Agency 5th digit mask correctly", () => {
      cy.get('[id="bank-agency"]')
        .clear()
        .type("12312")
        .should("have.value", "123-12");
    });

    it("should apply Bank Account 4th digit mask correctly", () => {
      cy.get('[id="bank-account"]')
        .clear()
        .type("2312")
        .should("have.value", "231-2");
    });

    it("should apply Bank Account 5th digit mask correctly", () => {
      cy.get('[id="bank-account"]')
        .clear()
        .type("12312")
        .should("have.value", "1231-2");
    });

    it("should apply Bank Account 6th digit mask correctly", () => {
      cy.get('[id="bank-account"]')
        .clear()
        .type("212312")
        .should("have.value", "21231-2");
    });

    it("should apply Bank Account 7th digit mask correctly", () => {
      cy.get('[id="bank-account"]')
        .clear()
        .type("3212312")
        .should("have.value", "321231-2");
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

    it("should handle placa mask with letters and numbers", () => {
      cy.get('[id="placa"]')
        .clear()
        .type("abc1234")
        .should("have.value", "ABC 1234");
    });
  });

  describe("CNPJ Mask", () => {
    it("should apply CNPJ mask correctly", () => {
      cy.get('[id="cnpj"]')
        .clear()
        .type("12345678901234")
        .should("have.value", "12.345.678/9012-34");
    });
  });
});
