const express = require("express");
const { Usuarios } = require("../db/models/index");
const router = express.Router();
const { generarToken } = require("../config/token");
const { validarAuth, validarRol } = require("../middleware/auth");
const usuariosController = require("../controllers/usuariosController");

router.get("/me", validarAuth, usuariosController.me)
// (req, res) => {
//   Usuarios.findOne({
//     where: {
//       email: req.usuario.email,
//     },
//   })
//     .then((result) => res.status(200).send(result))
//     .catch((err) => console.log(err));
// });

//registro de usuario
router.post("/registro", usuariosController.registro)
//login de usuario
router.post("/login", usuariosController.login)
//logout de usuario
router.post("/logout", usuariosController.logout)
//modificar un usuario CORREGIR BUGS!!!!!!
router.put("/editar/:id", usuariosController.editarUsuario)
// (req, res) => {
//   const id = req.params.id;
//   Usuarios.update(req.body, { where: { id } }).then((result) =>
//     res.status(202).send(result)
//   );
// });

// Admin:
//obtener todos los usuarios como admin
router.get("/", validarAuth, validarRol, usuariosController.adminGetAll)


// Esto busca un usuario por Id, por ahora no tiene uso.
/*router.get("/buscar/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Usuarios.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});*/
//borrar un usuario como admin
router.delete("/eliminar/:id", validarAuth, validarRol, usuariosController.adminDeleteOne)
//promover un usuario a admin
router.put("/promover/:id", validarAuth, validarRol, usuariosController.adminPromoverUsuario)
//degradar un usuario
router.put("/revocar/:id", validarAuth, validarRol, usuariosController.adminRevocarUsuario)


module.exports = router;
