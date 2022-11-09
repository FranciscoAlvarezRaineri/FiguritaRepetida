import React from "react";
import Grilla from "./Grid";
import Carrousel from "./Carrousel";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GrillaFavs from "./GrillaFavs";
const Favoritos = () => {
  const [user, setUser] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  useEffect(() => {
    axios
      .get("/api/usuario/me")
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);
  const handleFavs = () => {
    axios
      .get(`/api/favoritos/${user.id}`)
      .then((result) => {
        setFavoritos(result.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Button onClick={() => handleFavs()}> Mostrar favs</Button>
      {favoritos.length ? <GrillaFavs productos={favoritos} /> : ""}
    </div>
  );
};

export default Favoritos;
