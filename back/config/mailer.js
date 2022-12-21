const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "figuritarepetidaecommerce@gmail.com",
    pass: "yltzaditbtbkoogd",
  },
});

const emailConfirmacion = function (carrito, usuario) {
  const { email, nombreCompleto, direccion } = usuario;
  const tabla = `Pedido | Cantidad | Precio <br>${carrito.pedidos
    .map(
      (pedido) =>
        `${pedido.producto.nombreCompleto} | ${pedido.cantidad} | $${
          pedido.producto.precio * pedido.cantidad
        }<br>`
    )
    .join(" ")} <br> Precio Total: $${carrito.preciototal}`;

  transporter.sendMail({
    from: '"Figurita Repetida" <figuritarepetidaecommerce@gmai.com>',
    to: email,
    subject: "Compra realizada",
    html: `<b>Hola ${nombreCompleto}: <br> Ya están en camino tus figus a la dirección ${direccion}. <br><br> Este es el detalle de tu compra: <br> ${tabla} <br><br> Saludos, el equipo de Figurita Repetida </b>`,
  });
};

module.exports = emailConfirmacion;
