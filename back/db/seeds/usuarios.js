const { Usuarios } = require("../models");

const usuariosFalsos = [
  {
    username: "elSanti",
    nombre: "Santiago",
    apellido: "Caballero",
    email: "santiagocaballero1747@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "GeroZ",
    nombre: "Geronimo",
    apellido: "Zamora",
    email: "geronimo.zamora16@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "Sr.Etiqueta",
    nombre: "Carlos",
    apellido: "Rampi",
    email: "carampi@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "DonRamon",
    nombre: "Leandro",
    apellido: "Echezuri",
    email: "leandro.echezuri@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "Bautista",
    nombre: "Bautista",
    apellido: "González Lazo",
    email: "bautistagonzalezlazo@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "elPayaso",
    nombre: "Francisco",
    apellido: "Alvarez Raineri",
    email: "franciscoalvarezraineri@gmail.com",
    password: "hola",
    rol: "admin",
    direccion: "Calle Falsa 123",
  },
  {
    username: "1",
    nombre: "1",
    apellido: "1",
    email: "1@1.com",
    password: "1",
    rol: "usuario",
    urlPerfil:
      "https://es.wikipedia.org/wiki/La_1#/media/Archivo:Logo_TVE-1.svg",
    direccion: "Calle Falsa 123",
  },
  {
    username: "admin",
    nombre: "admin",
    apellido: "admin",
    email: "admin@admin.com",
    password: "admin",
    rol: "admin",
    direccion: "Calle Falsa 123",
    urlPerfil:
      "https://static.wikia.nocookie.net/memes-pedia/images/a/ac/Ahora_tu_eres_admin/revision/latest/scale-to-width-down/250?cb=20210128164325&path-prefix=es",
  },
];

module.exports = function () {
  return Usuarios.bulkCreate(usuariosFalsos, { validate: true });
};
