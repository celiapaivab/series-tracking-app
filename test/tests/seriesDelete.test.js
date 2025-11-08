require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userLogin = require("../fixtures/userLogin.json");
const seriesCreate = require("../fixtures/seriesCreate.json");

let token;
let seriesId;

before(async function () {
  const res = await supertest(baseURL).post("/login").send(userLogin);
  token = res.body.token;
  const createRes = await supertest(baseURL)
    .post("/series")
    .set("Authorization", `Bearer ${token}`)
    .send(seriesCreate);
  seriesId = createRes.body.id;
});

describe("Deletar Série", function () {
  it("deve deletar série registrada pelo próprio usuário", async function () {
    const res = await supertest(baseURL)
      .delete(`/series/${seriesId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });

  it("deve falhar ao deletar série sem autenticação", async function () {
    const res = await supertest(baseURL).delete(`/series/${seriesId}`);
    expect(res.status).to.equal(401);
  });
});
