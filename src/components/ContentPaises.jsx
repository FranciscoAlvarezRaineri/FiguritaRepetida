import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "./Grid";
import { Box } from "@mui/system";

const ContentPaises = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosArgentina = [];
  const productosUruguay = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.pais == "Argentina") productosArgentina.push(producto);
    if (producto.pais == "Uruguay") productosUruguay.push(producto);
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
            setProductos(productosArgentina);
          }}
          variant="outlined"
        >
          Argentina
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosUruguay);
          }}
          variant="outlined"
        >
          Uruguay
        </Button>
      </Box>
      <Grid productos={productos} />
    </>
  );
};

export default ContentPaises;
