import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import GrillaCarrito from "./GridCarrito";

import SendIcon from "@mui/icons-material/Send";
const Carrito = () => {
  const [user, setUser] = useState([]);
  const [carrito, setCarrito] = useState([]);
  let contenedor = [];
  useEffect(() => {
    axios
      .get("/api/usuario/me")
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);
  const handleCarrito = () => {
    axios
      .get(`/api/carritos/${user.id}`)
      .then((result) => {
        setCarrito(result.data);
      })
      .catch((error) => console.log(error));
    contenedor = carrito.pedidos;
  };
  const handleCompra = () => {
    console.log(carrito.id);
    axios
      .put(`/api/carritos/comprar/${carrito.id}`)

      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Button onClick={() => handleCarrito()}> Mostrar Carrito</Button>

      {contenedor ? <GrillaCarrito productos={carrito.pedidos} /> : ""}
      <div>
        <h1> Precio: {carrito.preciototal}</h1>{" "}
        <Button
          sx={{ marginLeft: "89%" }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            handleCompra();
          }}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Carrito;
