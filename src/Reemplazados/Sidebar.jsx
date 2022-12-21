import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Grid from "../components/Grids/Grid";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
const drawerWidth = 310;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0077B6",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Todas", "Selecciones", "Rareza", "Especiales"].map((text) => (
            <ListItem key={text} disablePadding>
              <Link to={`/search/${text}`} style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#CAF0F8" }}>
                    <ArrowCircleRightSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "#CAF0F8" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
