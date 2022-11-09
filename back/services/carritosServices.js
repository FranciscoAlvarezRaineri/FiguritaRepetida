const { Carritos, Pedidos, Productos } = require("../db/models/index");
const emailConfirmacion = require("../config/mailer");

class carritosServices {
  static async getCarrito(id) {
    return Carritos.findOne({
      where: { id },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }

  static async getCarritoDelUsuario(usuarioId) {
    return Carritos.findOne({
      where: { usuarioId, comprado: false },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }
  static async getHistorial(usuarioId) {
    return Carritos.findAll({
      where: { usuarioId, comprado: true },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }

  static async comprobarPedidoExiste(carritoId, productoId) {
    return Pedidos.findOne({
      where: { carritoId, productoId },
    });
  }

  static async modificarPedido(pedido, carrito, cantidad) {
    return pedido.update({ cantidad: pedido.cantidad + cantidad }).then(() => {
      carrito.calcularPrecioTotal(carrito);
    });
  }

  static async crearPedido(productoId, carrito, cantidad) {
    return Pedidos.create({
      productoId,
      carritoId: carrito.id,
      cantidad,
    }).then(() => {
      carrito.calcularPrecioTotal(carrito);
    });
  }

  static async buscarProducto(productoId) {
    return Productos.findByPk(productoId);
  }

  static async borrarUnPedido(pedidoId) {
    return Pedidos.findByPk(pedidoId).then((pedido) => {
      Carritos.findByPk(pedido.carritoId).then((carrito) => {
        Pedidos.destroy({ where: { id: pedidoId } }).then(() => {
          carrito.calcularPrecioTotal(carrito);
        });
      });
    });
  }

  static async borrarTodosLosPedidos(carritoId) {
    return Pedidos.destroy({ where: { carritoId } }).then(() =>
      Carritos.findByPk(carritoId).then((carrito) => {
        carrito.calcularPrecioTotal(carrito);
      })
    );
  }

  static async cambiarCantidad(pedidoId, cantidad, operacion) {
    return Pedidos.findByPk(pedidoId).then((pedido) => {
      operacion
        ? pedido.update({
            cantidad: pedido.cantidad + cantidad,
          })
        : pedido.cantidad - cantidad
        ? pedido.update({
            cantidad: pedido.cantidad - cantidad,
          })
        : null;
    });
  }

  static async comprarCarrito(carrito) {
    carrito.pedidos.forEach((pedido) => {
      Productos.findByPk(pedido.productoId).then((producto) => {
        producto.update({ stock: producto.stock - pedido.cantidad });
      });
    });
    emailConfirmacion(carrito);
    return carrito.crearCarrito(carrito);
  }

  static async comprobarStock(carrito) {
    return carrito.pedidos.reduce((acc, pedido) => {
      if (!acc) {
        return false;
      }
      return pedido.producto.stock >= pedido.cantidad;
    }, true);
  }
}

module.exports = carritosServices;