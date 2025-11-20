const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const { getToken } = require("../helpers/auth");
const seriesData = require("../fixtures/series.json");

describe("Registro de Série", () => {
  let token;
  before(async () => {
    token = await getToken();
  });

  it("deve registrar série com dados válidos", async () => {
    const res = await api
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(seriesData[0]);
    expect(res.status).to.equal(201);
  });

  it("deve falhar ao registrar série sem autenticação", async () => {
    const res = await api.post("/series").send(seriesData[0]);
    expect(res.status).to.equal(401);
  });

  it("deve falhar ao registrar série sem campos obrigatórios", async () => {
    const res = await api
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(seriesData[1]);
    expect(res.status).to.equal(400);
  });

  it("deve falhar ao registrar série com status inválido", async () => {
    const res = await api
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(seriesData[2]);
    expect(res.status).to.equal(400);
  });
});
