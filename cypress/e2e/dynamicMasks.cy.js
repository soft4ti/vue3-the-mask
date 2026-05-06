describe("Dynamic masks", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("CPF/CNPJ dynamic mask", () => {
    const cases = [
      {
        name: "CPF",
        input: "12312312312",
        expected: "123.123.123-12",
      },
      {
        name: "invalid chars",
        input: "abc123!@#123",
        expected: "123.123",
      },
      {
        name: "CNPJ",
        input: "12312312312123",
        expected: "12.312.312/3121-23",
      },
    ];

    cases.forEach(({ name, input, expected }) => {
      it(`should apply ${name} mask correctly`, () => {
        cy.get("#cpf-cnpj").clear().type(input).should("have.value", expected);
      });
    });
  });

  describe("Brazil phone dynamic mask", () => {
    const cases = [
      {
        name: "8 digits",
        input: "1231231231",
        expected: "(12) 3123-1231",
      },
      {
        name: "9 digits",
        input: "12312312312",
        expected: "(12) 31231-2312",
      },
      {
        name: "8 digits with special character",
        input: "12a3b!@#1231231",
        expected: "(12) 3123-1231",
      },
      {
        name: "9 digits with special character",
        input: "123a3b!@#1231231",
        expected: "(12) 33123-1231",
      },
    ];

    cases.forEach(({ name, input, expected }) => {
      it(`should apply phone mask for ${name}`, () => {
        cy.get("#phone").clear().type(input).should("have.value", expected);
      });
    });
  });

  describe("Bank Agency dynamic mask", () => {
    const cases = [
      { input: "123", expected: "123" },
      { input: "1231", expected: "123-1" },
      { input: "12312", expected: "123-12" },
    ];

    cases.forEach(({ input, expected }) => {
      it(`should apply mask for ${input.length} digits`, () => {
        cy.get("#bank-agency")
          .clear()
          .type(input)
          .should("have.value", expected);
      });
    });
  });

  describe("Bank Account dynamic mask", () => {
    const cases = [
      { input: "2312", expected: "231-2" },
      { input: "12312", expected: "1231-2" },
      { input: "212312", expected: "21231-2" },
      { input: "3212312", expected: "321231-2" },
    ];

    cases.forEach(({ input, expected }) => {
      it(`should apply mask for ${input.length} digits`, () => {
        cy.get("#bank-account")
          .clear()
          .type(input)
          .should("have.value", expected);
      });
    });
  });
});
