import * as React from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";

import { Paper } from "@mui/material";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eliminarFav } from "../../states/user";

export default function CardFavs({ product }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    dispatch(eliminarFav({ idUser: user.id, idProducto: product.id }));

    window.location.reload(false);
    Swal.fire({
      icon: "success",
      title: "Adios...",
      text: "Favorito eliminado!",
      footer: '<a href="/">Volver al inicio</a>',
    });
  };

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    width: "90%",
    margin: "auto",

    borderRadius: "10px",
    marginBottom: "20px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Card sx={{ maxWidth: 345 }} className="cardContainer">
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
    </Paper>
  );
}
