const express = require("express");
const router = express.Router();
const favoritosController = require("../controllers/favoritosController");

//crear un favorito, deberia llegar como req.body usuarioId y productoId
router.post("/", favoritosController.agregarFavorito)
//todos los favoritos de un usuario
router.get("/:id", favoritosController.getAll)
//borrar un favorito
router.delete("/borrar_uno/:usuarioId/:productoId", favoritosController.deleteOne)
//borrar todos los favoritos
router.delete("/borrar_todos/:usuarioId", favoritosController.deleteAll)

module.exports = router;
