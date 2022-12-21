import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import DetallesHistorial from "../../components/DetallesHistorial";

const Img = styled("img")({
  margin: "auto",
  display: "flex",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CardHistorial({ carrito }) {
  return (
    <Paper
      sx={{
        margin: "auto",
        marginBottom: "3%",
        p: 4,
        maxWidth: 500,
        backgroundColor: "lightgray",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                fontFamily={"'Bungee Spice', cursive"}
                gutterBottom
                variant="h5"
                component="div"
              >
                Detalles de la compra
              </Typography>

              <Typography variant="h5">
                {" "}
                Cantidad de productos: {carrito.pedidos.length}
              </Typography>
            </Grid>
            <DetallesHistorial detalles={carrito.pedidos} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {" "}
        <Typography
          fontFamily={"'Bungee Spice', cursive"}
          gutterBottom
          variant="h5"
          component="div"
        >
          Precio final {carrito.preciototal}
        </Typography>
      </Grid>
    </Paper>
  );
}
