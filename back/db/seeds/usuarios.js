const { Usuarios } = require("../models");

const usuariosFalsos = [
  {
    username: "elSanti",
    nombre: "Santiago",
    apellido: "Caballero",
    email: "santiagocaballero1747@gmail.com",
    password: "UruguayEsElMejorPais",
    rol: "admin",
  },
  {
    username: "GeroZ",
    nombre: "Geronimo",
    apellido: "Zamora",
    email: "geronimo.zamora16@gmail.com",
    password: "MoreLikeZalessa",
    rol: "admin",
  },
  {
    username: "Sr.Etiqueta",
    nombre: "Carlos",
    apellido: "Rampi",
    email: "carampi@gmail.com",
    password: "HagamosLasMaletas",
    rol: "admin",
  },
  {
    username: "DonRamon",
    nombre: "Leandro",
    apellido: "Echezuri",
    email: "leandro.echezuri@gmail.com",
    password: "password",
    rol: "admin",
  },
  {
    username: "Bautista",
    nombre: "Bautista",
    apellido: "González Lazo",
    email: "bautistagonzalezlazo@gmail.com",
    password: "SilenciosoPeroLetal",
    rol: "admin",
  },
  {
    username: "elPayaso",
    nombre: "Francisco",
    apellido: "Alvarez Raineri",
    email: "franciscoalvarezraineri@gmail.com",
    password: "PushAMain",
    rol: "admin",
  },
  {
    username: "1",
    nombre: "1",
    apellido: "1",
    email: "1@1.com",
    password: "1",
    rol: "usuario",
  },
  {
    username: "admin",
    nombre: "admin",
    apellido: "admin",
    email: "admin@admin.com",
    password: "admin",
    rol: "admin",
    urlPerfil:
      "https://static.wikia.nocookie.net/memes-pedia/images/a/ac/Ahora_tu_eres_admin/revision/latest/scale-to-width-down/250?cb=20210128164325&path-prefix=es",
  },
];

module.exports = function () {
  return Usuarios.bulkCreate(usuariosFalsos);
};
