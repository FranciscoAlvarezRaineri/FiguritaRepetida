import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const Comprar = ({ cantidad, producto }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("/api/usuario/me")
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);
  const handleAddCarrito = () => {
    if (cantidad) {
      axios.post(`/api/carritos/agregar`, {
        usuarioId: user.id,
        productoId: producto.id,
        cantidad: cantidad,
      });
    } else {
      alert("Debe ingresar una cantidad");
    }
  };
  const handleAddFavorito = () => {
    axios.post(`/api/favoritos`, {
      usuarioId: user.id,
      productoId: producto.id,
    });
  };
  return (
    <div className="singleProductRigth">
      <Stack spacing={2} className="singleProductButtons">
        <Typography
          fontFamily={"'Anton', sans-serif"}
          color={"#03045E"}
          marginLeft="10px"
        >
          Precio: ${1}
        </Typography>
        <Typography
          fontFamily={"'Anton', sans-serif"}
          color={"#03045E"}
          marginLeft="10px"
        >
          Añadir al carrito:
        </Typography>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",

            color: "#023E8A",
          }}
          onClick={() => handleAddCarrito()}
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
        >
          <Typography fontWeight="bold" color={"#03045E"}>
            ADD TO CART
          </Typography>
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => handleAddFavorito()}
          variant="contained"
          startIcon={<FavoriteIcon />}
        >
          <Typography fontWeight="bold" color={"#03045E"}>
            ADD TO FAVORITES
          </Typography>
          <IconButton aria-label="add to favorites"></IconButton>
        </Button>
      </Stack>
    </div>
  );
};

export default Comprar;
