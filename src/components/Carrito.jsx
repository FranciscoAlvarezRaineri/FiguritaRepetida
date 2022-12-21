import React from "react";
import Button from "@mui/material/Button";
import GrillaCarrito from "./Grids/GridCarrito";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { limpiarCart } from "../states/cart";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Paper, Grid } from "@mui/material";

const Carrito = () => {
  const navigate = useNavigate();

  const carrito = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const handleLimpiar = () => {
    dispatch(limpiarCart(carrito.id));
    window.location.reload(false);
  };

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
        <Typography mt="6%" mr="6%" mb="10%" align="center" variant="h4">
          {" "}
          Estos son los productos de tu carrito
        </Typography>
        <div className="carrito">
          {carrito.cartItems ? (
            <GrillaCarrito productos={carrito.cartItems} />
          ) : null}
          <hr />
          <Typography
            mt="4%"
            mr="6%"
            mb="4%"
            align="right"
            variant="h4"
            component="h4"
          >
            Total a pagar: $ {carrito.total}
          </Typography>
          <Grid
            sx={{
              height: "60px",
              display: "flex",
              justifyContent: "space-between",
              margin: "4%",
            }}
          >
            <Button
              sx={{
                width: "220px",
              }}
              variant="contained"
              endIcon={<DeleteIcon />}
              onClick={() => {
                handleLimpiar();
              }}
            >
              Limpiar Carrito
            </Button>

            <Button
              sx={{
                width: "220px",
              }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                navigate("/:user/checkout");
              }}
            >
              Ir al checkout
            </Button>
          </Grid>
        </div>
      </Paper>
    </>
  );
};
export default Carrito;
