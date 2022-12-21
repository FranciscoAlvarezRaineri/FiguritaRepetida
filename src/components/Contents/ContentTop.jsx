import React, { useState } from "react";
import { Button, colors, Paper, Typography } from "@mui/material";
import Grid from "../Grids/Grid";
import axios from "axios";
import { Box } from "@mui/system";

const ContentTop = () => {
  const [top, setTop] = useState([]);
  axios
    .get("/api/productos/filtrar/mas_vendidos")
    .then((res) => setTop(res.data));

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
      <Paper elevation={10} style={paperStyle}>
        <Typography margin="auto" mb="50px" variant="h4">
          Las mas vendidas
        </Typography>
        <Grid productos={top} />
      </Paper>
    </>
  );
};

export default ContentTop;
