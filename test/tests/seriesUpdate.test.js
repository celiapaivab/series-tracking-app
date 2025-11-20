const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const { getToken } = require("../helpers/auth");
const { createValidSerie } = require("../helpers/serie");


const updateData = {
  nome: "Série Atualizada",
  dataInicio: "2023-01-01",
  dataTermino: "2024-01-01",
  status: "Finalizada",
};

describe("Atualizar Informações da Série", () => {
  let token;
  let serieId;
  beforeEach(async () => {
    token = await getToken();
    const serie = await createValidSerie();
    serieId = serie.id;
  });

  it("deve atualizar série do usuário autenticado", async () => {
    const res = await api
      .put(`/series/${serieId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);
    expect(res.status).to.equal(200);
  });

  it("deve falhar ao atualizar série sem autenticação", async () => {
    const res = await api.put(`/series/${serieId}`).send(updateData);
    expect(res.status).to.equal(401);
  });

  it("deve atualizar qualquer campo da série", async () => {
    const res = await api
      .put(`/series/${serieId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Novo Nome" });
    expect(res.status).to.equal(200);
  });

  it("deve falhar ao alterar status para Finalizada sem data de término", async () => {
    const res = await api
      .put(`/series/${serieId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Finalizada" });
    expect(res.status).to.equal(400);
  });
});
