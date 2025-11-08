const express = require("express");
const app = express();
const seriesRoutes = require("./routes/seriesRoutes");
const swaggerRoutes = require("./routes/swaggerRoutes");

app.use(express.json());
app.use(seriesRoutes);
app.use(swaggerRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
