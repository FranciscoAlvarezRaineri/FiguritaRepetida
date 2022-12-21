const carritosServices = require("../services/carritosServices");
const productosServices = require("../services/productosServices");

class carritosController {
  static getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    carritosServices
      .getCarritoDelUsuario(usuarioId)
      .then((carritos) => {
        res.status(200).send(carritos); // esto es necesario porque está implementado con Model.findAll()
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
    productosServices
      .getProductById(productoId)
      .then((producto) => {
        // comprobar si hay stock suficiente del producto
        if (producto.stock >= cantidad) {
          // si existe, continua con la creación del pedido
          carritosServices.getCarritoDelUsuario(usuarioId).then((carrito) => {
            // comprobar si un pedido de un producto en un carrito ya existe
            carritosServices
              .comprobarPedidoExiste(carrito.id, productoId)
              .then((pedido) => {
                if (pedido) {
                  // si exsite, lo modifica sumándole la nueva cantidad al pedido existente
                  carritosServices
                    .modificarPedido(pedido, parseInt(cantidad))
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
          // si no hay stock, devuelve un mensaje
          res.status(200).send("NO HAY MAS STOCK");
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  static borrarUno(req, res) {
    const pedidoId = req.params.pedidoId;
    carritosServices
      .borrarUnPedido(pedidoId)
      .then(() => res.status(204).send({}))
      .catch((err) => res.status(400).send(err));
  }

  static borrarTodos(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices
      .borrarTodosLosPedidos(carritoId)
      .then(() => res.status(204).send([]))
      .catch((err) => res.status(400).send(err));
  }

  static aumentarCantidad(req, res) {
    const { pedidoId, cantidad } = req.params;
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, true)
      .then((result) => {
        res.status(202).send(result);
      })
      .catch((err) => res.status(400).send(err));
  }

  static disminuirCantidad(req, res) {
    const { pedidoId, cantidad } = req.params;
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, false)
      .then((result) => {
        res.status(202).send(result);
      })
      .catch((err) => res.status(400).send(err));
  }

  static comprar(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices
      .getCarrito(carritoId)
      .then((carrito) => {
        if (carrito.pedidos.length && !carrito.comprado) {
          carritosServices
            .comprobarStock(carrito)
            .then((bool) => {
              if (bool) {
                carritosServices
                  .comprarCarrito(carrito)
                  .then((result) => res.status(201).send(result))
                  .catch((err) => res.status(400).send(err));
              } else {
                res.send("NO HAY STOCK SUFICIENTE");
              }
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.send("EL CARRITO ESTA VACIO O YA ESTA COMPRADO");
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  static historialComprados(req, res) {
    carritosServices
      .getHistorialComprados()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err));
  }
}

module.exports = carritosController;
