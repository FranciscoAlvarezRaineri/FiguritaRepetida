import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import Buscador from "./Buscador";
import Botonera from "./Botonera";
import { Link } from "react-router-dom";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logofr from "../../utils/fr_logo.png";
import { height } from "@mui/system";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MenuLateral = () => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        open={open}
        position="static"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: "0px",
          backgroundColor: "#F6AA38",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "flex-start",
            width: "33%",
          }}
          id="izquierda"
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img height="75px" src={logofr} />
          </Link>

          {user.id ? (
            <Typography color="inherit">Hola {user.nombre}!</Typography>
          ) : null}
        </Toolbar>
        <Toolbar
          sx={{
            justifyContent: "center",
            width: "33%",
          }}
          id="centro"
        >
          <Buscador />
        </Toolbar>
        <Toolbar
          sx={{
            justifyContent: "flex-end",
            width: "33%",
          }}
          id="derecha"
        >
          <Botonera />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Top", "Selecciones", "Rareza", "Especiales"].map((text) => (
            <ListItem fontWeight="bold" key={text} disablePadding>
              <Link to={`/search/${text}`} style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#023E8A" }}>
                    <ArrowCircleRightSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "#023E8A" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </>
  );
};

export default MenuLateral;
