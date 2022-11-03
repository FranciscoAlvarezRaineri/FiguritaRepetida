const db = require("../index");
const S = require("sequelize");
const Carritos = require("./Carritos");
const bcrypt = require("bcrypt");

class Usuarios extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validarPassword(password) {
    console.log(this.salt);
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
    },
    nombre: {
      type: S.STRING,
      allownull: false,
    },
    apellido: {
      type: S.STRING,
      allownull: false,
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
    },
    favoritos: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize: db,
    modelName: "usuario",
    hooks: {
      beforeCreate: (usuario) => {
        const salt = bcrypt.genSaltSync();
        usuario.salt = salt;
        return usuario.hash(usuario.password, salt).then((hash) => {
          usuario.password = hash;
        });
      },
      afterCreate: (usuario) => {
        Carritos.create({ usuarioId: usuario.id });
      },
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
