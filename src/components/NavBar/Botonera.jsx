import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FeedIcon from "@mui/icons-material/Feed";

import axios from "axios";
import { useSelector } from "react-redux";

const Botonera = () => {
  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    axios
      .post("/api/usuario/logout")
      .then((result) => console.log(result.data));
  };

  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" spacing={-2}>
        {user.rol == "admin" ? (
          <Button href={"/admin"} underline="none" color="secondary">
            <SupervisorAccountIcon
              sx={{ color: "#B21515", width: 30, height: 30 }}
            />
          </Button>
        ) : null}
        {user.id ? (
          <>
            <Button
              href={"/:user/favorites"}
              underline="none"
              color="secondary"
            >
              <FavoriteIcon sx={{ color: "#B21515", width: 30, height: 30 }} />
            </Button>

            <Button
              href={"/historialCarrito"}
              underline="none"
              color="secondary"
            >
              <FeedIcon sx={{ color: "#B21515", width: 30, height: 30 }} />
            </Button>
          </>
        ) : null}
        <Button href={"/:user/cart"} underline="none" color="secondary">
          <ShoppingCartIcon sx={{ color: "#B21515", width: 30, height: 30 }} />
        </Button>
        {user.id ? (
          <Button
            onClick={() => handleLogOut()}
            href={"/"}
            underline="none"
            color="secondary"
          >
            <LogoutIcon sx={{ color: "#B21515", width: 30, height: 30 }} />
          </Button>
        ) : (
          <Button href={"/login"} underline="none" color="secondary">
            <PersonIcon sx={{ color: "#B21515", width: 30, height: 30 }} />
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Botonera;
