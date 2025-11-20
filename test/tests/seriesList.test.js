const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const { getToken } = require("../helpers/auth");
const { createValidSerie } = require("../helpers/serie");

describe("Visualizar Lista de Séries", () => {
  let token;
  beforeEach(async () => {
    token = await getToken();
    await createValidSerie();
  });

  it("deve exibir lista de séries do usuário autenticado", async () => {
    const res = await api
      .get("/series")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("não deve exibir lista para usuário não autenticado", async () => {
    const res = await api.get("/series");
    expect(res.status).to.equal(401);
  });
});
