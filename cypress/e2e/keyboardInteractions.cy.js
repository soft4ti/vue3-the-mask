describe("Keyboard interactions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const cases = [
    {
      id: "#us-zip",
      input: "54321",
      expected: "54321",
      afterBackspace: "5432",
    },
    {
      id: "#br-zip",
      input: "12312312",
      expected: "12312-312",
      afterBackspace: "12312-31",
    },
    {
      id: "#cpf",
      input: "12312312312",
      expected: "123.123.123-12",
      afterBackspace: "123.123.123-1",
    },
    {
      id: "#cnpj",
      input: "12123123123412",
      expected: "12.123.123/1234-12",
      afterBackspace: "12.123.123/1234-1",
    },
    {
      id: "#us-phone",
      input: "12025550134",
      expected: "+1 (202) 555-0134",
      afterBackspace: "+1 (202) 555-013",
    },
    {
      id: "#br-phone",
      input: "1212341234",
      expected: "+55 (12) 1234-1234",
      afterBackspace: "+55 (12) 1234-123",
    },
    {
      id: "#date-time",
      input: "19032003025948",
      expected: "19/03/2003 02:59:48",
      afterBackspace: "19/03/2003 02:59:4",
    },
    {
      id: "#credit-card",
      input: "1234123412341234",
      expected: "1234 1234 1234 1234",
      afterBackspace: "1234 1234 1234 123",
    },
    {
      id: "#date",
      input: "12252023",
      expected: "12/25/2023",
      afterBackspace: "12/25/202",
    },
    {
      id: "#time",
      input: "121212",
      expected: "12:12:12",
      afterBackspace: "12:12:1",
    },
    {
      id: "#placa",
      input: "abc1234",
      expected: "ABC 1234",
      afterBackspace: "ABC 123",
    },
    {
      id: "#ca-zip",
      input: "A1B2C3",
      expected: "A1B 2C3",
      afterBackspace: "A1B 2C",
    },
  ];

  cases.forEach(({ id, input, expected, afterBackspace }) => {
    it(`should handle backspace correctly on ${id}`, () => {
      cy.get(id)
        .clear()
        .type(input)
        .should("have.value", expected)
        .type("{backspace}")
        .should("have.value", afterBackspace);
    });
  });

  it("should switch from CPF to CNPJ without clearing", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312")
      .should("have.value", "123.123.123-12")
      .type("123")
      .should("have.value", "12.312.312/3121-23");
  });

  it("should switch from CNPJ to CPF when deleting", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312312")
      .should("have.value", "12.312.312/3123-12")
      .type("{backspace}{backspace}{backspace}{backspace}")
      .should("have.value", "123.123.123-12");
  });

  it("should handle deletion in the middle correctly", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312")
      .type("{leftarrow}{leftarrow}{leftarrow}")
      .type("{backspace}")
      .should("have.value", "123.123.121-2");
  });

  it("should insert in the middle correctly", () => {
    cy.get("#cpf-cnpj")
      .clear()
      .type("12312312312")
      .type("{leftarrow}{leftarrow}")
      .type("9")
      .should("have.value", "12.312.312/3912");
  });
});
