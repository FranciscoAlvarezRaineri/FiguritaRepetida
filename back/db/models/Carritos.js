const db = require("../index");
const S = require("sequelize");
const Pedidos = require("./Pedidos");
const Productos = require("./Productos");

class Carritos extends S.Model {
  comprar(carrito) {
    return Pedidos.findAll({
      where: { carritoId: carrito.id },
      include: Productos,
    }).then((pedidos) => {
      const comprobacion = pedidos.reduce((acc, pedido) => {
        if (!acc) {
          return false;
        }
        return pedido.producto.comprobarStock(pedido.producto, pedido.cantidad);
      }, true);
      if (comprobacion) {
        pedidos.forEach((pedido) => {
          Productos.findByPk(pedido.productoId).then((producto) => {
            producto.update({ stock: producto.stock - pedido.cantidad });
          });
        });
        carrito.update({ comprado: true });
        return Carritos.create({ usuarioId: carrito.usuarioId }).then(
          (res) => res
        );
      } else {
        return carrito;
      }
    });
  }

  calcularPrecioTotal(carrito) {
    Pedidos.findAll({
      where: { carritoId: carrito.id },
      include: Productos,
    }).then((pedidos) => {
      const precioTotal = pedidos.reduce((suma, pedido) => {
        return suma + pedido.producto.precio;
      }, 0);
      carrito.update({ preciototal: precioTotal });
    });
  }
}

Carritos.init(
  {
    comprado: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    preciototal: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    metodopago: {
      type: S.STRING,
    },
    fecha: {
      type: S.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

/*Carritos.prototype.comprar = function (carrito) {
  carrito.update({ comprado: true });
  return Carritos.create({ usuarioId: carrito.usuarioId }).then((res) => res);
};*/

module.exports = Carritos;
