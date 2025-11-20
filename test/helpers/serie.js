const api = require("./api");
const { getToken } = require("./auth");
const seriesData = require("../fixtures/series.json");

async function createValidSerie() {
  const token = await getToken();
  // Usa o primeiro item do fixtures como série válida
  const serieData = seriesData[0];
  const res = await api
    .post("/series")
    .set("Authorization", `Bearer ${token}`)
    .send(serieData);
  return res.body;
}

module.exports = { createValidSerie };
