const productosServices = require("../services/productosServices");

class productosController {
  static getProductos(req, res) {
    productosServices
      .getAllProducts()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static getId(req, res) {
    const id = req.params.id;
    productosServices
      .getProductById(id)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static buscarPorTags(req, res) {
    const tags = req.params.tags.split("_");
    productosServices
      .buscarPorTags(tags)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.status(400).send(err));
  }

  static filtrarPorCategorias(req, res) {
    const { tipo, rareza, posicion, pais } = req.body;
    const busqueda = [];
    if (tipo) busqueda.push({ tipo });
    if (rareza) busqueda.push({ rareza });
    if (posicion) busqueda.push({ posicion });
    if (pais) busqueda.push({ pais });
    productosServices
      .filtrarPorCategorias(busqueda)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static adminPost(req, res) {
    const productoNuevo = req.body;
    productosServices
      .crearProducto(productoNuevo)
      .then((result) => res.status(201).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static adminUpdate(req, res) {
    const id = req.params.id;
    const productoActualizado = req.body;
    productosServices
      .actualizarProducto(productoActualizado, id)
      .then((result) => res.status(202).send(result[1])) // La respuesta de un Model.update() es un array cuyo segundo valor ("1") es el objeto modificado.
      .catch((err) => res.status(400).send(err));
  }

  static adminDelete(req, res) {
    const id = req.params.id;
    productosServices
      .eliminarProducto(id)
      .then(() => res.status(202).send({}))
      .catch((err) => res.status(400).send(err));
  }

  static buscarMasVendidos(req, res) {
    productosServices
      .buscarMasVendidos()
      .then((result) => res.status(202).send(result))
      .catch((err) => res.status(400).send(err));
  }
}

module.exports = productosController;
