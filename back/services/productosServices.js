const { Productos, Tags, Pedidos } = require("../db/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class productosServices {
  //obtener todos los productos
  static getAllProducts() {
    return Productos.findAll();
  }

  //obtener un producto por id
  static getProductById(id) {
    return Productos.findByPk(id);
  }

  //buscar un producto por tag
  static buscarPorTags(tags) {
    return Productos.findAll({
      where: { "$tags.valor$": { [Op.all]: tags } },
      include: Tags,
    });
  }

  //filtrar productos por categorias
  static filtrarPorCategorias(filtro) {
    return Productos.findAll({
      where: { [Op.and]: filtro },
    });
  }

  //admin crea un producto
  static crearProducto(productoNuevo) {
    return Productos.create(productoNuevo);
  }

  //admin actualiza un producto
  static actualizarProducto(productoActualizado, id) {
    return Productos.update(productoActualizado, {
      where: { id },
      returning: true, // Este código y
      plain: true, // este código son necesarios para que el Model.update() devuelva la instancia modificada
    });
  }

  //admin borra un producto
  static eliminarProducto(id) {
    return Productos.destroy({ where: { id } });
  }

  static buscarMasVendidos() {
    return Productos.findAll({
      attributes: [
        "id",
        [sequelize.fn("sum", sequelize.col("pedidos.cantidad")), "total"],
      ],
      include: [
        {
          model: Pedidos,
          attributes: [],
        },
      ],
      group: ["producto.id"],
    }).then((productos) => {
      const productosIds = productos
        .filter((producto) => producto.dataValues.total != null)
        .sort((a, b) => (a.total > b.total ? 1 : -1))
        .map((producto) => producto.id)
        .slice(0, 6);
      return Productos.findAll({
        where: { id: { [Op.in]: productosIds } },
      });
    });
  }
}

module.exports = productosServices;
