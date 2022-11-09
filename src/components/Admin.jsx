import React from "react";
import {
  Container,
  Paper,
  FormControl,
  Input,
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
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [pais, setPais] = useState("");
  const [rareza, setRareza] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/usuario").then((res) => setUsuarios(res.data));
  }, [usuarios]);

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
    console.log("Se agregará el siguiente producto", newObj);
    axios.post("/api/productos", newObj).then((res) => console.log(res));
    resetAll();
    navigate("/admin");
  };
  const handleUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  const handleAdminize = () => {
    console.log("Se ha ascendido a admin al user ");
    console.log(user);
    axios
      .put(`/api/usuario/promover/${user}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser("");
  };

  const handleDelete = () => {
    console.log("Se eliminara  ");
    console.log(user);
    axios
      .delete(`/api/usuario/eliminar/${user}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser("");
  };

  return (
    <>
      <Paper
        sx={{
          margin: "auto",
          marginTop: "100px",
          width: "70%",
          padding: 4,
          maxWidth: "900px",
          minWidth: "360px",
          borderRadius: 3,
        }}
        elevation={10}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",

            marginTop: "100px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <Grid container>
            <Typography variant="h4" gutterBottom>
              Agregar producto
            </Typography>
          </Grid>
        </Container>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            marginTop: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <Grid>
            <FormControl sx={{ m: 1, width: 300 }}>
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
        <Container
          maxWidth="md"
          sx={{
            display: "flex",

            marginTop: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          {tipo !== "jugador" ? (
            <Grid container>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Nombre"
                  id="NOMBRE"
                  placeholder="Ingresa Nombre"
                  fullWidth
                  required
                  onChange={handleNombre}
                />
              </Grid>

              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
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
              </Grid>

              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Precio"
                  placeholder="Ingresa Precio"
                  fullWidth
                  required
                  id="PRECIO"
                  onChange={handlePrecio}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Stock"
                  id="STOCK"
                  placeholder="Ingresa Stock"
                  fullWidth
                  required
                  onChange={handleStock}
                />
              </Grid>
              <Grid>
                <Button
                  sx={{ m: 1, width: 300 }}
                  variant="contained"
                  component="label"
                >
                  Cargar imagen
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Nombre"
                  id="NOMBRE"
                  placeholder="Ingresa Nombre"
                  fullWidth
                  required
                  onChange={handleNombre}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Apellido"
                  id="APELLIDO"
                  placeholder="Ingresa Apellido"
                  fullWidth
                  required
                  onChange={handleApellido}
                />
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
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
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Pais"
                  id="PAIS"
                  placeholder="Ingresa Pais"
                  fullWidth
                  required
                  onChange={handlePais}
                />
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
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
              </Grid>

              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Precio"
                  id="PRECIO"
                  placeholder="Ingresa Precio"
                  fullWidth
                  required
                  onChange={handlePrecio}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Stock"
                  id="STOCK"
                  placeholder="Ingresa Stock"
                  fullWidth
                  required
                  onChange={handleStock}
                />
              </Grid>
              <Grid>
                <Button
                  sx={{ m: 1, width: 300 }}
                  variant="contained"
                  component="label"
                >
                  Cargar imagen
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
        {/* ///////////////////////////////////////////////////////// */}

        {/* //////////////////////////////////////////////////////// */}
        <Container
          maxWidth="md"
          sx={{
            display: "flex",

            marginTop: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <Grid container>
            <Typography variant="h4" gutterBottom>
              Editar usuarios
            </Typography>
          </Grid>
        </Container>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <Grid>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Seleccionar usuario</InputLabel>
              <Select
                labelId="usuarios-select"
                id="usuarios-select"
                label="Seleccionar Usuario"
                value={user}
                displayEmpty
                onChange={handleUser}
              >
                {usuarios.length
                  ? usuarios.map((usuario, i) => (
                      <MenuItem key={i} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Grid>
              <Button
                onClick={() => handleAdminize()}
                variant="contained"
                sx={{ m: 1, width: 140 }}
              >
                ADMINIZAR
              </Button>
            </Grid>
            <Grid>
              <Button
                onClick={() => {
                  handleDelete();
                }}
                variant="contained"
                sx={{ m: 1, width: 140 }}
              >
                ELIMINAR
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Admin;
