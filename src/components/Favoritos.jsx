import React from "react";
import { Paper } from "@mui/material";

import { useEffect } from "react";

import GrillaFavs from "../components/Grids/GrillaFavs";
import { useSelector, useDispatch } from "react-redux";
import { obtenerFavoritos } from "../states/user";
const Favoritos = () => {
  
  const user = useSelector((store) => store.user);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerFavoritos(user.id));
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
    <Paper elevation={10} style={paperStyle}>
      <h1 className="promo"> Favoritos</h1>

      {user.favoritos ? (
        <GrillaFavs productos={user.favoritos} />
      ) : (
        <h1> Vacio</h1>
      )}
    </Paper>
  );
};

export default Favoritos;
