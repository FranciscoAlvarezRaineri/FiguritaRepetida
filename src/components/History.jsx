import React from "react";
import { Paper, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import GrillaCarrito from "./Grids/GridCarrito";
import CardHistorial from "../commons/Cards/CardHistorial";

const History = () => {
  const user = useSelector((store) => store.user);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/carritos/historial/${user.id}`)
      .then((res) => setHistorial(res.data));
  }, [user.id]);

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "60%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  return (
    <>
      {" "}
      <Paper elevation={10} style={paperStyle}>
        <Typography
          className="promo"
          fontFamily={"'Bungee Spice', cursive"}
          gutterBottom
          variant="h4"
          marginTop="3%"
        >
          Historial de compras de {user.nombre}
        </Typography>

        <Grid>
          {historial.length
            ? historial.map((compra, i) => (
                <>
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <CardHistorial carrito={compra} />
                  </Grid>
                </>
              ))
            : null}
        </Grid>
      </Paper>
    </>
  );
};

export default History;
