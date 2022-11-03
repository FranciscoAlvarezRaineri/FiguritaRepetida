const express = require("express");
const { Usuarios } = require("../db/models/index");
const router = express.Router();
const { generateToken, validateToken } = require("../config/token");
const { validateAuth } = require("../middleware/auth");

router.get("/", (req, res) => {
  Usuarios.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/me", validateAuth, (req, res) => {
  Usuarios.findOne({
    where: {
      email: req.user.email,
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/buscar/:id", (req, res) => {
  const id = req.params.id;
  Usuarios.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.post("/registro", (req, res) => {
  Usuarios.create(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  Usuarios.findOne({ where: { email } }).then((user) => {
    if (!user) return res.status(401).send("Usuario Inexistente");
    user.validarPassword(password).then((isValid) => {
      if (!isValid) return res.status(401).send("Contraseña Incorrecta");
      const payload = {
        email: user.email,
        username: user.username,
      };
      const token = generateToken(payload);
      res.cookie("token", token).status(200).send(user);
    });
  });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token").status(204).send({});
});

router.put("/buscar:id", (req, res) => {
  const id = req.params.id;
  Usuarios.update(req.body, { where: { id } }).then((result) =>
    res.status(202).send(result)
  );
});

router.delete("/buscar:id", (req, res) => {
  const id = req.params.id;
  Usuarios.destroy({ where: { id } }).then((result) => res.sendStatus(204));
});

module.exports = router;
