const jwt = require("jsonwebtoken");
const SECRET = "series_secret_key";

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });
  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Token inválido ou expirado" });
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken,
};
