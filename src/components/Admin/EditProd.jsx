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
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router";

const EditProd = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [pais, setPais] = useState("");
  const [rareza, setRareza] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const [productos, setProductos] = useState([]);
  const [prod, setProd] = useState("");

  useEffect(() => {
    axios.get("/api/productos").then((res) => setProductos(res.data));
  }, [productos]);

  const handleProd = (e) => {
    e.preventDefault();
    setProd(e.target.value);
    axios
      .get(`/api/productos/${e.target.value}`)
      .then((res) => setTipo(res.data.tipo));
  };
  const navigate = useNavigate();

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
    setProd("");

    document.getElementById("NOMBRE").value = "";
    document.getElementById("APELLIDO").value = "";
    document.getElementById("posicion-select").value = "";
    document.getElementById("productos-select").value = "";
    document.getElementById("PAIS").value = "";
    document.getElementById("rareza-select").value = "";
    document.getElementById("PRECIO").value = "";
    document.getElementById("STOCK").value = "";
  };

  const handleSendEdit = (e) => {
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

    axios.put(`/api/productos/${prod}`, newObj).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Producto editado",
        text: "Se ha editado correctamente!",
      });
    });
    resetAll();
    navigate("/admin");
  };
  const handleDeleteProd = (e) => {
    e.preventDefault();

    axios.delete(`/api/productos/${prod}`).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Producto Eliminado",
        text: "Se ha eliminado correctamente!",
      });
    });
    resetAll();
    navigate("/admin");
  };

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
        Editar / eliminar producto
      </Typography>

      <Container>
        <FormControl sx={{ width: "100%", marginTop: "15px" }}>
          <InputLabel>Producto</InputLabel>
          <Select
            labelId="productos-select"
            id="productos-select"
            label="Seleccionar Usuario"
            value={prod}
            displayEmpty
            onChange={handleProd}
          >
            {productos.length
              ? productos.map((producto, i) => (
                  <MenuItem key={i} tipo={producto.tipo} value={producto.id}>
                    ({producto.tipo}) -- {producto.nombreCompleto}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Container>
      {tipo ? (
        <Container>
          {tipo !== "jugador" ? (
            <Grid container>
              <TextField
                sx={{ marginTop: "15px" }}
                type="text"
                label="Nombre"
                id="NOMBRE"
                placeholder="Ingresa Nombre"
                fullWidth
                required
                onChange={handleNombre}
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
                placeholder="Ingresa Precio"
                fullWidth
                required
                id="PRECIO"
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
                onClick={handleSendEdit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: "15px" }}
              >
                Guardar cambios
              </Button>

              <Button
                onClick={handleDeleteProd}
                type="button"
                variant="contained"
                fullWidth
                sx={{ marginTop: "15px" }}
              >
                Eliminar Producto
              </Button>
            </Grid>
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
                  <MenuItem value={"delantero"}>Arquero</MenuItem>
                </Select>
              </FormControl>
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
                onClick={handleSendEdit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: "15px" }}
              >
                Guardar cambios
              </Button>

              <Button
                onClick={handleDeleteProd}
                type="button"
                fullWidth
                variant="contained"
                sx={{ marginTop: "15px" }}
              >
                Eliminar Producto
              </Button>
            </Grid>
          )}
        </Container>
      ) : null}
    </>
  );
};

export default EditProd;
