const Usuarios = require("./Usuarios");
const Productos = require("./Productos");
const Pedidos = require("./Pedidos");
const Carritos = require("./Carritos");
const Favoritos = require("./Favoritos");

Carritos.belongsTo(Usuarios); //Carrito solo puede pertenecer a un usuario
Usuarios.hasMany(Carritos); //Usuario tiene varios carritos

Pedidos.belongsTo(Productos); //Pedido pertenece al producto
Productos.hasMany(Pedidos); //Un producto puede tener varios pedidos

Pedidos.belongsTo(Carritos); // Un pedido solo puede estar en un carrito
Carritos.hasMany(Pedidos); //Carrito contiene muchos pedidos

Favoritos.belongsTo(Usuarios); //Un favorito solo puede pertenecer a un usuario
Usuarios.hasMany(Favoritos);

Favoritos.belongsTo(Productos);
Productos.hasMany(Favoritos);

module.exports = { Usuarios, Productos, Pedidos, Carritos, Favoritos };
