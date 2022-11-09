const usuariosSeed = require("./usuarios");
const productosSeed = require("./productos");
const pedidosSeed = require("./pedidos");
const carritosSeed = require("./carritos");
const favoritosSeed = require("./favoritos");

module.exports = function () {
  return usuariosSeed()
    .then(() =>
      productosSeed().then(() => {
        setTimeout(() => {
          pedidosSeed();
          carritosSeed();
          favoritosSeed();
        }, 1); //Este timeout es para darle tiempo a los hooks asincronicos de la tabla productos.
      })
    )
    .then(() => console.log("Database Seedeada"))
    .catch((err) => console.log(err));
};
