import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  InputBase,
  Link,
  Avatar,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";

const Navbar = () => {
  const [user, setUser] = useState(true);

  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 50px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
  }));

  const [open, setOpen] = useState(false);

  return (
    <AppBar sx={{ background: "#009c7" }} position="static">
      {user ? (
        <Toolbar>
          <Link href="/">
            <Typography sx={{ color: "red" }}>LOGO</Typography>
          </Link>
          <Search sx={{ marginLeft: "20%" }}>
            <InputBase placeholder="Buscar..." />
          </Search>
          <Typography sx={{ marginLeft: "15%" }}>{user.usuario}</Typography>
          <Avatar
            src="/broken-image.jpg"
            sx={{ marginLeft: "auto", background: "#155b87" }}
            onClick={(e) => setOpen(true)}
          />
          <Link href="/:user/cart" target="_blank" marginLeft="3%">
            <ShoppingCartSharpIcon
              sx={{ color: "#155b87", width: 30, height: 30 }}
            />
          </Link>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={(e) => setOpen(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Link href="/:user/favorites" underline="none" color="inherit">
              <MenuItem>Mis favoritos</MenuItem>
            </Link>
            <MenuItem>Cerrar sesion</MenuItem>
          </Menu>
        </Toolbar>
      ) : (
        <Toolbar>
          <Link href="/">
            <Typography sx={{ color: "red" }}>LOGO</Typography>
          </Link>
          <Search sx={{ marginLeft: "20%" }}>
            <InputBase placeholder="Busca tu figurita..." />
          </Search>
          <Button variant="contained" sx={{ marginLeft: "auto" }} href="/login">
            Iniciar sesion
          </Button>
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            href="/register"
          >
            Registrate
          </Button>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
