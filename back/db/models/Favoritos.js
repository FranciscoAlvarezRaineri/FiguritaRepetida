const db = require("../index");
const S = require("sequelize");

class Favoritos extends S.Model {
  static getByUsuario(usuarioId) {
    return Favoritos.findAll({ where: { usuarioId } });
  }

  static comprobacionDuplicados(favorito) {
    return Favoritos.findAll({
      where: { usuarioId: favorito.usuarioId, productoId: favorito.productoId },
    }).then((result) => (result.length ? true : false));
  }
}

Favoritos.init(
  {},
  {
    sequelize: db,
    modelName: "favoritos",
  }
);

module.exports = Favoritos;
