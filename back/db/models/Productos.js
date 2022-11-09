const db = require("../index");
const S = require("sequelize");

class Productos extends S.Model {
  comprobarStock(producto, cantidad) {
    return producto.stock >= cantidad;
  }
}

Productos.init(
  {
    tipo: {
      type: S.STRING,
      allownull: false,
    },
    nombre: {
      type: S.STRING,
      allownull: false,
    },
    apellido: {
      type: S.STRING,
    },
    posicion: {
      type: S.STRING,
    },
    pais: {
      type: S.STRING,
    },
    stock: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    precio: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    rareza: {
      type: S.INTEGER,
    },
    urlImagen: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "producto",
  }
);

module.exports = Productos;
