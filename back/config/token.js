const jwt = require("jsonwebtoken");
const SECRET = "FiguritaRepetida";

const generarToken = (payload) => {
  const token = jwt.sign({ usuario: payload }, SECRET, { expiresIn: "2d" });
  return token;
};

const validarToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generarToken, validarToken };
