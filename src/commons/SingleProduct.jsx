import * as React from "react";

import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import BasicSelect from "./utils/cantidadPrueba";
import { Paper, Grid } from "@mui/material";

export default function SingleProduct({ cantidad }) {
  const idProducto = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    axios.get(`/api/productos/${idProducto.id}`).then((figu) => {
      setProducto(figu.data);
    });
  }, []);
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "40%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid
        container
        id="tarjeta"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Grid
          id="izq"
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            fontFamily={"'Bungee Spice', cursive"}
            variant="h5"
            color={"#03045E"}
            align="center"
          >
            {producto.nombreCompleto}
          </Typography>
          <img
            width="90%"
            src={producto.urlImagen}
            alt="Foto de producto"
            
          />
        </Grid>
        <Grid
          id="der"
          sx={{
            marginTop: "50px",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Stock: {producto.stock}</Typography>

          <BasicSelect producto={producto} />
        </Grid>
      </Grid>

     
    </Paper>
  );
}
