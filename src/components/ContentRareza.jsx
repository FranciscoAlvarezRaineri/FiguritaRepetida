import React, { useState } from "react";
import { Button, colors } from "@mui/material";
import Grid from "./Grid";
import { Box } from "@mui/system";
const ContentRareza = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosRarezaCero = [];
  const productosRareza1 = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.rareza == 0) productosRarezaCero.push(producto);
    if (producto.rareza == 1) productosRareza1.push(producto);
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
            setProductos(productosRarezaCero);
          }}
          variant="outlined"
        >
          Normales
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosRareza1);
          }}
          variant="outlined"
        >
          Dorados
        </Button>
      </Box>
      <Grid productos={productos} />
    </>
  );
};

export default ContentRareza;
