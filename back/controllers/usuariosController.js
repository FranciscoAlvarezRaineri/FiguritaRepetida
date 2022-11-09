const { Favoritos, Usuarios, Productos } = require("../db/models/index");
const { generarToken } = require("../config/token");

class usuariosController {
    static async me(req, res){
        Usuarios.findOne({
          where: {
            email: req.usuario.email,
          },
        })
          .then((result) => res.status(200).send(result))
          .catch((err) => console.log(err));
      }

    static async registro(req, res){
        Usuarios.create(req.body)
          .then((result) => res.status(201).send(result))
          .catch((err) => console.log(err));
      }

    static async login(req, res){
        const { email, password } = req.body;
      
        Usuarios.findOne({ where: { email } }).then((usuario) => {
          if (!usuario) return res.status(401).send("Usuario Inexistente");
          usuario.validarPassword(password).then((isValid) => {
            if (!isValid) return res.status(401).send("Contraseña Incorrecta");
            const payload = {
              id: usuario.id,
              email: usuario.email,
              username: usuario.username,
              rol: usuario.rol,
            };
            const token = generarToken(payload);
            res.cookie("token", token).status(200).send(usuario);
          });
        });
      }

    static async logout(req, res) {
        res.clearCookie("token").status(204).send({});
      }

    static async editarUsuario(req, res){
        const id = req.params.id;
        Usuarios.update(req.body, { where: { id } }).then((result) =>
          res.status(202).send(result)
        );
      }
    //ADMIN
    
    static async adminGetAll(req, res){
        Usuarios.findAll()
          .then((result) => res.status(200).send(result))
          .catch((err) => console.log(err));
      }

    static async adminDeleteOne(req, res){
        const id = req.params.id;
        Usuarios.destroy({ where: { id } }).then(() => res.sendStatus(204));
      }

    static async adminPromoverUsuario(req, res){
        const id = req.params.id;
        Usuarios.update({ rol: "admin" }, { where: { id } })
          .then(() =>
            Usuarios.findOne({ where: { id } }).then((usuario) =>
              res.status(202).send(usuario)
            )
          )
          .catch((err) => console.log(err));
      }

      static async adminRevocarUsuario(req, res){
        const id = req.params.id;
        // Comprobar si la id del usuario logueado que está en la cookie es la misma que la que llegó por parametro. Lleva solo dos iguales porque uno es string y el otro numero y no me fije cual es cual.
        if (id == req.usuario.id) {
          res.status(200).send("El usuario no puede revocarse a si mismo");
        } else {
          Usuarios.update({ rol: "usuario" }, { where: { id } })
            .then(() =>
              Usuarios.findOne({ where: { id } }).then((usuario) =>
                res.status(202).send(usuario)
              )
            )
            .catch((err) => console.log(err));
        }
      }
}

module.exports = usuariosController