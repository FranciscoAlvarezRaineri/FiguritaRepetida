import React from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router";

const AddProd = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [pais, setPais] = useState("");
  const [rareza, setRareza] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const handleTipo = (e) => {
    e.preventDefault();
    setTipo(e.target.value);
  };
  const handleNombre = (e) => {
    e.preventDefault();
    setNombre(e.target.value);
  };
  const handleApellido = (e) => {
    e.preventDefault();
    setApellido(e.target.value);
  };
  const handlePosicion = (e) => {
    e.preventDefault();
    setPosicion(e.target.value);
  };
  const handlePais = (e) => {
    e.preventDefault();
    setPais(e.target.value);
  };
  const handleRareza = (e) => {
    e.preventDefault();
    setRareza(e.target.value);
  };
  const handlePrecio = (e) => {
    e.preventDefault();
    setPrecio(e.target.value);
  };
  const handleStock = (e) => {
    e.preventDefault();
    setStock(e.target.value);
  };
  const resetAll = () => {
    setTipo("");
    setNombre("");
    setApellido("");
    setPosicion("");
    setPais("");
    setRareza("");
    setPrecio(0);
    setStock(0);
    document.getElementById("tipo-select").value = "";
    document.getElementById("NOMBRE").value = "";
    document.getElementById("APELLIDO").value = "";
    document.getElementById("posicion-select").value = "";
    document.getElementById("PAIS").value = "";
    document.getElementById("rareza-select").value = "";
    document.getElementById("PRECIO").value = "";
    document.getElementById("STOCK").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newObj = {};
    if (tipo !== "") newObj.tipo = tipo;
    if (nombre !== "") newObj.nombre = nombre;
    if (apellido !== "") newObj.apellido = apellido;
    if (posicion !== "") newObj.posicion = posicion;
    if (pais !== "") newObj.pais = pais;
    if (rareza !== "") newObj.rareza = rareza;
    if (precio !== 0) newObj.precio = precio;
    if (stock !== 0) newObj.stock = stock;

    axios.post("/api/productos", newObj).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Producto añadido",
        text: "El producto se ha añadido correctamente!",
      });
    });
    resetAll();
    navigate("/admin");
  };

  return (
    <>
      <Container>
        <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
          Agregar producto
        </Typography>
      </Container>
      <Container>
        <Grid>
          <FormControl sx={{ width: "100%", marginTop: "15px" }}>
            <InputLabel>Tipo de producto</InputLabel>
            <Select
              labelId="tipo-select"
              id="tipo-select"
              label="Tipo de producto"
              value={tipo}
              displayEmpty
              onChange={handleTipo}
            >
              <MenuItem value={"jugador"}>Jugador</MenuItem>
              <MenuItem value={"pelota"}>Pelota</MenuItem>
              <MenuItem value={"estadio"}>Estadio</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Container>
      {tipo ? (
        <Container>
          {tipo !== "jugador" ? (
            <>
              <TextField
                sx={{ marginTop: "15px" }}
                label="Nombre"
                id="NOMBRE"
                placeholder="Ingresa Nombre"
                fullWidth
                required
                onChange={handleNombre}
              />
              <TextField
                sx={{ marginTop: "15px" }}
                label="Precio"
                placeholder="Ingresa Precio"
                fullWidth
                required
                id="PRECIO"
                onChange={handlePrecio}
              />

              <FormControl sx={{ width: "100%", marginTop: "15px" }}>
                <InputLabel>Rareza</InputLabel>
                <Select
                  labelId="rareza-select"
                  id="rareza-select"
                  label="Rareza"
                  value={rareza}
                  displayEmpty
                  onChange={handleRareza}
                >
                  <MenuItem value={0}>Normal</MenuItem>
                  <MenuItem value={1}>Bronce</MenuItem>
                  <MenuItem value={2}>Plata</MenuItem>
                  <MenuItem value={3}>Oro</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ marginTop: "15px" }}
                label="Stock"
                id="STOCK"
                placeholder="Ingresa Stock"
                fullWidth
                required
                onChange={handleStock}
              />

              <Button
                sx={{ marginTop: "15px" }}
                variant="contained"
                component="label"
                fullWidth
              >
                Cargar imagen
                <input hidden accept="image/*" multiple type="file" />
              </Button>

              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{ marginTop: "15px" }}
                fullWidth
              >
                Submit
              </Button>
            </>
          ) : (
            <Grid container>
              <TextField
                sx={{ marginTop: "15px" }}
                label="Nombre"
                id="NOMBRE"
                placeholder="Ingresa Nombre"
                fullWidth
                required
                onChange={handleNombre}
              />

              <TextField
                sx={{ marginTop: "15px" }}
                label="Apellido"
                id="APELLIDO"
                placeholder="Ingresa Apellido"
                fullWidth
                required
                onChange={handleApellido}
              />

              <FormControl sx={{ width: "100%", marginTop: "15px" }}>
                <InputLabel>Posicion</InputLabel>
                <Select
                  labelId="posicion-select"
                  id="posicion-select"
                  label="Posicion"
                  value={posicion}
                  displayEmpty
                  onChange={handlePosicion}
                >
                  <MenuItem value={"portero"}>Portero</MenuItem>
                  <MenuItem value={"defensor"}>Defensor</MenuItem>
                  <MenuItem value={"central"}>Central</MenuItem>
                  <MenuItem value={"delantero"}>Delantero</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ marginTop: "15px" }}
                label="Pais"
                id="PAIS"
                placeholder="Ingresa Pais"
                fullWidth
                required
                onChange={handlePais}
              />

              <FormControl sx={{ width: "100%", marginTop: "15px" }}>
                <InputLabel>Rareza</InputLabel>
                <Select
                  labelId="rareza-select"
                  id="rareza-select"
                  label="Rareza"
                  value={rareza}
                  displayEmpty
                  onChange={handleRareza}
                >
                  <MenuItem value={0}>Normal</MenuItem>
                  <MenuItem value={1}>Bronce</MenuItem>
                  <MenuItem value={2}>Plata</MenuItem>
                  <MenuItem value={3}>Oro</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ marginTop: "15px" }}
                label="Precio"
                id="PRECIO"
                placeholder="Ingresa Precio"
                fullWidth
                required
                onChange={handlePrecio}
              />

              <TextField
                sx={{ marginTop: "15px" }}
                label="Stock"
                id="STOCK"
                placeholder="Ingresa Stock"
                fullWidth
                required
                onChange={handleStock}
              />

              <Button
                sx={{ marginTop: "15px" }}
                variant="contained"
                component="label"
                fullWidth
              >
                Cargar imagen
                <input hidden accept="image/*" multiple type="file" />
              </Button>

              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{ marginTop: "15px" }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          )}
        </Container>
      ) : null}
    </>
  );
};

export default AddProd;
