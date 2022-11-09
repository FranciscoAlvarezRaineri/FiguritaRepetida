const { validarToken } = require("../config/token");

function validarAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { usuario } = validarToken(token);
  if (!usuario) return res.sendStatus(401);

  req.usuario = usuario;
  next();
}

function validarRol(req, res, next) {
  const usuario = req.usuario;

  if (usuario.rol != "admin") return res.sendStatus(401);

  req.usuario = usuario;
  next();
}

module.exports = { validarAuth, validarRol };
