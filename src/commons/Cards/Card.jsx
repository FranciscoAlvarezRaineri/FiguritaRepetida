import * as React from "react";
import Card from "@mui/material/Card";
import { Paper } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router";

export default function CardProduct({ product }) {
  const navigate = useNavigate();

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    width: "90%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
    marginBottom: "20px",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Card className="cardContainer">
        <CardMedia
          onClick={() => navigate(`/productos/${product.id}`)}
          component="img"
          image={product.urlImagen}
          alt="Foto Figu"
        />
        <CardContent>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.nombre} {product.apellido}
          </Typography>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.pais}
          </Typography>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.posicion}
          </Typography>
        </CardContent>
        
      </Card>
    </Paper>
  );
}
