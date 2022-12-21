import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItem, obtenerItems } from "../../states/cart";
import { useEffect } from "react";

import { incrementarCarrito, decrementarCarrito } from "../../states/cart";
import Swal from "sweetalert2";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CardCarrito({ product, cantidad, id }) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (product.stock > cantidad) dispatch(incrementarCarrito(id));
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay mas stock para agregar",
      });
    }
  };
  const handleDecrease = () => {
    if (cantidad > 1) dispatch(decrementarCarrito(id));
    else {
      dispatch(eliminarItem(id));

      window.location.reload(false);
    }
  };

  const handleDelete = () => {
    dispatch(eliminarItem(id));
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(obtenerItems(user.id));
  }, [user.id]);

  const paperStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 6,
    marginBottom: "10px",
    width: "100%",
    borderRadius: 3,
    borderRadius: "10px",
  };

  return (
    <Paper elevation={6} style={paperStyle}>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        id="izq"
      >
        <Grid sx={{ width: 128, height: 128 }}>
          <Img alt="complex" src={product.urlImagen} />
        </Grid>
        <Typography variant="h6">{product.nombreCompleto}</Typography>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        id="der"
      >
        <Grid
          sx={{
            width: "45%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
          id="datos"
        >
          <Typography variant="h6">x {cantidad} </Typography>
          <Typography variant="h5">$ {product.precio}</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          id="botones"
        >
          <IconButton
            onClick={() => {
              handleAdd();
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDecrease();
            }}
          >
            <RemoveIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              handleDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
