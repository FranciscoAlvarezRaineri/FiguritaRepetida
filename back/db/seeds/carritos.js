const { Carritos } = require("../models");

module.exports = function () {
  return Carritos.findByPk(1)
    .then((carrito) => {
      carrito.comprar(carrito).then((carrito) => {
        setTimeout(() => {
          carrito.comprar(carrito);
        }, 10);
      });
    })
    .catch((err) => console.log(err));
};
