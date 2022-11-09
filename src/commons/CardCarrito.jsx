import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CardCarrito({ product, cantidad, id }) {
  const [producto, setProducto] = useState({});
  const handleRemove = () => {
    axios
      .delete(`/api/carritos/borrar_uno/${id}`)
      .catch((error) => console.log(error));
  };
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={product.urlImagen} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.nombre} {product.apellido}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Delantero
              </Typography>
              <Typography variant="subtitle1"> Cantidad {cantidad}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${product.precio}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography sx={{ textAlign: "Right" }} variant="body2">
          <Button
            onClick={() => {
              handleRemove();
            }}
          >
            {" "}
            Eliminar del carrito
          </Button>
        </Typography>
      </Grid>
    </Paper>
  );
}
