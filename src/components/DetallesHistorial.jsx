import * as React from "react";
import { Grid, Paper } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const DetallesHistorial = ({ detalles }) => {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <>
      {detalles.map((product, i) => (
        <div>
          <h4> Producto: {product.producto.nombreCompleto} </h4>
          <Grid item key={i}>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={product.producto.urlImagen} />
            </ButtonBase>
          </Grid>
          <h4> Cantidad: {product.cantidad} </h4>
        </div>
      ))}
    </>
  );
};

export default DetallesHistorial;
