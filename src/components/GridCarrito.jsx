import React from "react";
import Card from "../commons/Card";

import "../style/componentClass.css";

import { Container, Grid } from "@mui/material";
import CardFavs from "../commons/CardFavs";

import CardCarrito from "../commons/CardCarrito";

const GrillaCarrito = ({ productos, cantidad }) => {
  if (!productos) return <p>Recargar su carrito</p>;

  return (
    <Container
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="md"
    >
      <Grid direction="column" container spacing={4}>
        {productos.map((product, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <CardCarrito
              cantidad={product.cantidad}
              product={product.producto}
              id={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GrillaCarrito;
