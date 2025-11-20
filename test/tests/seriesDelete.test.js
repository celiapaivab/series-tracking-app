const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const { getToken } = require("../helpers/auth");
const { createValidSerie } = require("../helpers/serie");

// Supondo que já exista uma série criada para o usuário
// const serieId = 1; // Ajuste conforme necessário

describe("Deletar Série", () => {
  let token;
  let serieId;
  beforeEach(async () => {
    token = await getToken();
    const serie = await createValidSerie();
    serieId = serie.id;
  });

  it("deve deletar série registrada pelo próprio usuário", async () => {
    const res = await api
      .delete(`/series/${serieId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });

  it("deve falhar ao deletar série sem autenticação", async () => {
    const res = await api.delete(`/series/${serieId}`);
    expect(res.status).to.equal(401);
  });
});
