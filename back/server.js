const express = require("express");
const db = require("./db");
const routes = require("./routes/index");
const port = 3001;
const { Usuarios, Productos, Pedidos, Carritos } = require("./db/models");
const seed = require("./db/seeds");

const app = express();
app.use(express.json());

app.use("/api", routes);

db.sync({ force: true })
  .then(() => {
    return seed();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
