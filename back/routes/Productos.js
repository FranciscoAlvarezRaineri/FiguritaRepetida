const express = require("express");
const router = express.Router();
const { validarAuth, validarRol } = require("../middleware/auth");
const productosController = require("../controllers/productosController");

router.get("/", productosController.getProductos);

router.get("/:id", productosController.getId);

router.get("/buscar/:nombre", productosController.buscadorPorNombre);

router.get("/filtrar/categorias", productosController.categorias);

// Admin:

router.post("/", validarAuth, validarRol, productosController.adminPost);

router.put("/:id", validarAuth, validarRol, productosController.adminUpdate);

router.delete("/:id", validarAuth, validarRol, productosController.adminDelete);

module.exports = router;
