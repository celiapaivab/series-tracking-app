function generateUniqueEmail(base = "usuario") {
  const timestamp = Date.now();
  return `${base}+${timestamp}@teste.com`;
}

module.exports = { generateUniqueEmail };
