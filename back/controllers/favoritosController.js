const { Favoritos, Usuarios, Productos } = require("../db/models/index");
class favoritosController {
  static async agregarFavorito(req, res) {
    Favoritos.create(req.body)
      .then((result) => res.status(201).send(result))
      .catch((err) => console.log(err));
  }

  static async getAll(req, res) {
    const usuarioId = req.params.id;
    Favoritos.findAll({
      where: { usuarioId },
      include: Productos,
    })
      .then((favorite) => {
        res.status(200).send(favorite);
      })
      .catch((error) => console.log(error));
  }

  static async deleteOne(req, res) {
    const productoId = req.params.productoId;
    const usuarioId = req.params.usuarioId;
    Usuarios.findOne({ where: { id: usuarioId } }).then(() => {
      Favoritos.destroy({ where: { productoId } }).then(() => {
        res.sendStatus(204);
      });
    });
  }

  static async deleteAll(req, res) {
    const usuarioId = req.params.usuarioId;
    Favoritos.destroy({ where: { usuarioId } }).then(() => {
      res.sendStatus(204);
    });
  }
}

module.exports = favoritosController;
