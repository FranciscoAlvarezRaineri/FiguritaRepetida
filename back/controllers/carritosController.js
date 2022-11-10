const carritosServices = require("../services/carritosServices");

class carritosController {
  static getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    carritosServices
      .getCarritoDelUsuario(usuarioId)
      .then((carrito) => {
        res.status(200).send(carrito);
      })
      .catch((err) => res.status(400).send(err));
  }

  static historial(req, res) {
    const usuarioId = req.params.usuarioId;
    carritosServices
      .getHistorial(usuarioId)
      .then((carritos) => res.status(200).send(carritos))
      .catch((err) => res.status(400).send(err));
  }

  // agrega un pedido a un carrito
  static agregar(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    carritosServices.buscarProducto(productoId).then((producto) => {
      // comprobar si hay stock suficiente del producto
      if (producto.stock > cantidad) {
        // si existe, continua con la creación del pedido
        carritosServices.getCarritoDelUsuario(usuarioId).then((carrito) => {
          // comprobar si un pedido de un producto en un carrito ya existe
          carritosServices
            .comprobarPedidoExiste(carrito.id, productoId)
            .then((pedido) => {
              if (pedido) {
                // si exsite, lo modifica sumándole la nueva cantidad al pedido existente
                carritosServices
                  .modificarPedido(pedido, carrito, parseInt(cantidad))
                  .then((result) => {
                    res.send(result);
                  })
                  .catch((err) => res.status(400).send(err));
              } else {
                // si no, crea un nuevo pedido
                carritosServices
                  .crearPedido(productoId, carrito.id, cantidad)
                  .then((pedido) => {
                    res.send(pedido);
                  })
                  .catch((err) => res.status(400).send(err));
              }
            });
        });
      } else {
        res.status(200).send("NO HAY MAS STOCK");
      }
    });
  }

  static borrarUno(req, res) {
    const pedidoId = req.params.pedidoId;
    carritosServices.borrarUnPedido(pedidoId).then(() => res.sendStatus(204));
  }

  static borrarTodos(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices
      .borrarTodosLosPedidos(carritoId)
      .then(() => res.sendStatus(204));
  }

  static aumentarCantidad(req, res) {
    const pedidoId = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, true)
      .then((result) => {
        res.send(result);
      });
  }

  static disminuirCantidad(req, res) {
    const pedidoId = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, false)
      .then((result) => {
        res.send(result);
      });
  }

  static comprar(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices.getCarrito(carritoId).then((carrito) => {
      if (carrito.pedidos.length && !carrito.comprado) {
        carritosServices.comprobarStock(carrito).then((bool) => {
          if (bool) {
            carritosServices
              .comprarCarrito(carrito)
              .then((result) => res.send(result));
          } else {
            res.send("NO HAY STOCK SUFICIENTE");
          }
        });
      } else {
        res.send("EL CARRITO ESTA VACIO O YA ESTA COMPRADO");
      }
    });
  }

  static historialComprados(req, res) {
    carritosServices
      .getHistorialComprados()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }
}

module.exports = carritosController;
