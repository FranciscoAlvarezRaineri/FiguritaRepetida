import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "./Grid";
import { Box } from "@mui/system";

const ContentEspeciales = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosPelota = [];
  const productosEstadio = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.tipo == "pelota") productosPelota.push(producto);
    if (producto.tipo == "estadio") productosEstadio.push(producto);
  });

  return (
    <>
      <Box m={5} display="flex" justifyContent="center" alignItems="center">
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosPelota);
          }}
          variant="outlined"
        >
          Pelota
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosEstadio);
          }}
          variant="outlined"
        >
          Estadios
        </Button>
      </Box>
      <Grid productos={productos} />
    </>
  );
};

export default ContentEspeciales;
