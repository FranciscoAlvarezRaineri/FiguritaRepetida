import React from "react";
import Card from "../../commons/Cards/Card";

import { Container, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const Grilla = ({ productos }) => {

  const handleSig = () => {};


  return (
    <>

      <Grid container spacing={4}>
        {productos.map((producto, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card product={producto} />
          </Grid>
        ))}
        <br />
      </Grid>
    </>
  );
};

export default Grilla;
