const { Carritos, Pedidos, Productos } = require("../db/models/index");
class carritosController {
  static async getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    Carritos.findOne({
      where: { usuarioId, comprado: false },
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((carrito) => {
        carrito.calcularPrecioTotal(carrito);
        res.status(200).send(carrito);
      })
      .catch((err) => console.log(err));
  }

  static async historial(req, res) {
    const usuarioId = req.params.usuarioId;
    Carritos.findAll({
      where: { usuarioId, comprado: true },
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static async agregar(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    Productos.findByPk(productoId).then((producto) => {
      if (producto.stock > cantidad) {
        Carritos.findOne({ where: { usuarioId, comprado: false } }).then(
          (carrito) => {
            Pedidos.create({
              productoId,
              carritoId: carrito.id,
              cantidad: cantidad,
            }).then((result) => res.send(result));
          }
        );
      } else {
        res.status(200).send("NO HAY MAS STOCK");
      }
    });
  }

  static async borrarUno(req, res) {
    const pedidoId = req.params.pedidoId;
    Pedidos.destroy({ where: { id: pedidoId } }).then(() =>
      res.sendStatus(204)
    );
  }

  static async borrarTodos(req, res) {
    const carritoId = req.params.carritoId;
    Pedidos.destroy({ where: { carritoId } }).then(() => res.sendStatus(204));
  }

  static async comprar(req, res) {
    const carritoId = req.params.carritoId;
    Carritos.findOne({ where: { id: carritoId } }).then((carrito) => {
      carrito.comprar(carrito).then((result) => res.send(result));
    });
  }
}

module.exports = carritosController;
