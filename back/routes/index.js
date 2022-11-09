const express = require("express");

const usuariosRouter = require("./Usuarios");
const productosRouter = require("./Productos");
const carritosRouter = require("./Carritos");
const favoritosRouter = require("./Favoritos");

const router = express.Router();

router.use("/usuario", usuariosRouter);
router.use("/carritos", carritosRouter);
router.use("/productos", productosRouter);
router.use("/favoritos", favoritosRouter);

module.exports = router;
