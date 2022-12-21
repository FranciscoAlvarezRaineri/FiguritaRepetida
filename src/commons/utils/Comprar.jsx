import * as React from "react";

import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { agregarItem } from "../../states/cart";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const Comprar = ({ cantidad, producto }) => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleAddCarrito = () => {
    if (cantidad) {
      dispatch(
        agregarItem({
          idUser: user.id,
          cantidad: cantidad,
          idProducto: producto.id,
        })
      );
      Swal.fire("Agregado a carrito!", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar una cantidad",
      });
    }
  };
  const handleAddFavorito = () => {
    axios.post(`/api/favoritos`, {
      usuarioId: user.id,
      productoId: producto.id,
    });
    Swal.fire("Agregado a favoritos!", "", "success");
  };
  return (
    <div className="singleProductRigth">
      <Stack spacing={2} className="singleProductButtons">
        <Typography variant="h6" align="center">
          Precio: ${producto.precio}
        </Typography>

        <Button
          onClick={() => handleAddCarrito()}
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
        >
          <Typography align="center">Al Carrito</Typography>
        </Button>
        <Button
          onClick={() => handleAddFavorito()}
          variant="contained"
          endIcon={<FavoriteIcon />}
        >
          <Typography align="center">Favoritos </Typography>
        </Button>
      </Stack>
    </div>
  );
};

export default Comprar;
