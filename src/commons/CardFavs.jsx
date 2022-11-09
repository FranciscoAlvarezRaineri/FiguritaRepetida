import * as React from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../style/commonsClass.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { useState } from "react";

export default function CardFavs({ product }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("/api/usuario/me")
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleRemove = () => {
    axios
      .delete(`/api/favoritos/borrar_uno/${user.id}/${product.id}`)
      .catch((error) => console.log(error));
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="cardContainer">
      <CardMedia
        sx={{ paddingTop: "0.1px", marginTop: "20px" }}
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
        <IconButton
          onClick={() => {
            handleRemove();
          }}
          sx={{ marginLeft: "80%" }}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </CardContent>
    </Card>
  );
}
