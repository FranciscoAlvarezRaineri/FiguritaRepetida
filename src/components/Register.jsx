import React, { useState } from "react";
import {
  Paper,
  TextField,
  TextArea,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const userTypeOnChange = (event) => {
    setUserType(event.target.value);
  };

  const apellidoOnChange = (event) => {
    setApellido(event.target.value);
  };
  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .post("/api/usuario/registro", {
        username,
        nombre: name,
        apellido: apellido,
        password,
        email,
      })
      .then(() => navigate("/login"))
      .catch(() => alert("Falló el registro"));
    
  };
  const handleAlreadyRegister = (event) => {};

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "30%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Typography mt="10px" mb="30px" align="center" variant="h5">
          Registrate aquí abajo
        </Typography>
        <TextField
          sx={{ marginTop: "5px" }}
          value={username}
          id="outlined-basic-user"
          label="Nombre de Usuario"
          type="text"
          fullWidth
          required
          onChange={usernameOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={name}
          id="outlined-basic-name"
          label="Nombre"
          type="text"
          fullWidth
          required
          onChange={nameOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={apellido}
          id="outlined-basic-name"
          label="Apellido"
          type="text"
          fullWidth
          required
          onChange={apellidoOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={email}
          id="outlined-basic-email"
          label="Email"
          type="text"
          fullWidth
          required
          onChange={emailOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={password}
          id="outlined-basic-password"
          label="Password"
          type="password"
          fullWidth
          required
          onChange={passwordOnChange}
        />
        <Button
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          component="label"
          fullWidth
        >
          Registrarse
        </Button>
        <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
          Ya estas registrado?
        </Typography>
        <Button
          sx={{ marginTop: "20px" }}
          type="button"
          variant="contained"
          href="/login"
          fullWidth
        >
          Login
        </Button>
      </Paper>
    </Grid>
  );
};

export default Register;
