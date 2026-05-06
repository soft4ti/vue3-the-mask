describe("Paste interactions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const cases = [
    {
      id: "#us-zip",
      input: "54321",
      expected: "54321",
    },
    {
      id: "#br-zip",
      input: "12312312",
      expected: "12312-312",
    },
    {
      id: "#cpf",
      input: "12312312312",
      expected: "123.123.123-12",
    },
    {
      id: "#cnpj",
      input: "12123123123412",
      expected: "12.123.123/1234-12",
    },
    {
      id: "#us-phone",
      input: "12025550134",
      expected: "+1 (202) 555-0134",
    },
    {
      id: "#br-phone",
      input: "1212341234",
      expected: "+55 (12) 1234-1234",
    },
    {
      id: "#credit-card",
      input: "1234123412341234",
      expected: "1234 1234 1234 1234",
    },
    {
      id: "#date",
      input: "12252023",
      expected: "12/25/2023",
    },
    {
      id: "#time",
      input: "121212",
      expected: "12:12:12",
    },
    {
      id: "#placa",
      input: "abc1234",
      expected: "ABC 1234",
    },
    {
      id: "#ca-zip",
      input: "A1B2C3",
      expected: "A1B 2C3",
    },
    {
      id: "#iban",
      input: "br2313123123123213123123123",
      expected: "BR23 1312 3123 1232 1312 3123 123",
    },
    {
      id: "#vehicle-id",
      input: "KNDJB723025140702",
      expected: "KN.DJ.B7230.2.5.140702",
    },
    {
      id: "#cpf-cnpj",
      input: "12312312312",
      expected: "123.123.123-12",
    },
    {
      id: "#cpf-cnpj",
      input: "12312312312123",
      expected: "12.312.312/3121-23",
    },
    {
      id: "#cpf-cnpj",
      input: "abc!!!12312312312",
      expected: "123.123.123-12",
    },
    {
      id: "#phone",
      input: "1231231231",
      expected: "(12) 3123-1231",
    },
    {
      id: "#phone",
      input: "12312312312",
      expected: "(12) 31231-2312",
    },
    {
      id: "#bank-agency",
      input: "12312",
      expected: "123-12",
    },
    {
      id: "#bank-account",
      input: "3212312",
      expected: "321231-2",
    },
  ];

  cases.forEach(({ id, input, expected }) => {
    it(`should apply mask on paste for ${id} with ${input}`, () => {
      cy.get(id)
        .invoke("val", input)
        .trigger("input")
        .should("have.value", expected);
    });
  });
});
