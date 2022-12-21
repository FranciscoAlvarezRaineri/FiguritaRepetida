const Carritos = require("./Carritos");
const Usuarios = require("./Usuarios");
const Productos = require("./Productos");
const Favoritos = require("./Favoritos");
const Tags = require("./Tags");
const TagsProductos = require("./TagsProductos");
const Pedidos = require("./Pedidos");

Carritos.belongsTo(Usuarios); // Carrito solo puede pertenecer a un usuario
Usuarios.hasMany(Carritos); // Usuario tiene varios carritos

Pedidos.belongsTo(Productos); // Pedido pertenece al producto
Productos.hasMany(Pedidos); //Un producto puede tener varios pedidos

Pedidos.belongsTo(Carritos); // Un pedido solo puede estar en un carrito
Carritos.hasMany(Pedidos); // Carrito contiene muchos pedidos

Favoritos.belongsTo(Usuarios); // Un favorito solo puede pertenecer a un usuario
Usuarios.hasMany(Favoritos); // Un usuario tiene muchos favoritos

Favoritos.belongsTo(Productos); // Un favorito solo puede pertenecer a un prodcuto
Productos.hasMany(Favoritos); // Un usuario tiene muchos favoritos

// Relación many-to-many entre productos y tags
Productos.belongsToMany(Tags, { through: TagsProductos });
Tags.belongsToMany(Productos, { through: TagsProductos });

module.exports = { Carritos, Usuarios, Productos, Pedidos, Favoritos, Tags };
