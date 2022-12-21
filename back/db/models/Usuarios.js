const db = require("../index");
const S = require("sequelize");
const Carritos = require("./Carritos");
const bcrypt = require("bcrypt");

class Usuarios extends S.Model {
  // hasehar la contraseña
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  // validar la contraseña
  validarPassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Usuarios.init(
  {
    username: {
      type: S.STRING,
      allownull: false,
      unique: true,
      set(valor) {
        this.setDataValue("username", valor.toLowerCase());
      },
    },
    nombre: {
      type: S.STRING,
      allownull: false,
      set(valor) {
        this.setDataValue("nombre", valor.toLowerCase());
      },
      get() {
        return this.getDataValue("nombre").replace(
          /(?<=\b)\w/g,
          (primeraLetra) => primeraLetra.toUpperCase()
        );
      },
    },
    apellido: {
      type: S.STRING,
      allownull: false,
      set(valor) {
        this.setDataValue("apellido", valor.toLowerCase());
      },
      get() {
        return this.getDataValue("apellido").replace(
          /(?<=\b)\w/g,
          (primeraLetra) => primeraLetra.toUpperCase()
        );
      },
    },
    nombreCompleto: {
      type: S.VIRTUAL,
      get() {
        return `${this.getDataValue("nombre").replace(
          /(?<=\b)\w/g,
          (primeraLetra) => primeraLetra.toUpperCase()
        )} ${this.getDataValue("apellido").replace(
          /(?<=\b)\w/g,
          (primeraLetra) => primeraLetra.toUpperCase()
        )}`;
      },
    },
    email: {
      type: S.STRING,
      allownull: false,
      validate: { isEmail: true },
    },
    direccion: {
      type: S.STRING,
    },
    password: {
      type: S.STRING,
      allownull: false,
    },
    salt: {
      type: S.STRING,
    },
    rol: {
      type: S.STRING,
      defaultValue: "usuario",
      validate: { isIn: [["usuario", "admin"]] },
    },
    urlPerfil: {
      type: S.STRING,
      validate: { isUrl: true },
    },
  },
  {
    sequelize: db,
    modelName: "usuario",
    hooks: {
      // Hashear la contraseña
      beforeCreate: (usuario) => {
        const salt = bcrypt.genSaltSync();
        usuario.salt = salt;
        return usuario.hash(usuario.password, salt).then((hash) => {
          usuario.password = hash;
        });
      },
      // Crear carrito del usuario
      afterCreate: (usuario) => {
        Carritos.create({ usuarioId: usuario.id });
      },
      // Hashear la contraseña y crear carrito del usuario
      afterBulkCreate: (res) => {
        res.forEach((usuario) => {
          Carritos.create({ usuarioId: usuario.id });
          const salt = bcrypt.genSaltSync();
          usuario.update({ salt: salt });
          return usuario.hash(usuario.password, salt).then((hash) => {
            usuario.update({ password: hash });
          });
        });
      },
    },
  }
);

module.exports = Usuarios;
