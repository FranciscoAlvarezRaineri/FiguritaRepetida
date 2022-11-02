import React, { useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const userTypeOnChange = (event) => {
    setUserType(event.target.value);
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
    console.log(event);
    axios
      .post("/api/usuario/registro", {
        username,
        name,
        password,
        email,
        userType,
      })
      .then(() => navigate("/"))
      .catch(() => alert("Falló el registro"));
    //Body: Obj {username, tipo, nombre, contraseña, email}
  };
  const handleAlreadyRegister = (event) => {};
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <InputLabel id="demo-simple-select-standard-label">
          Tipo de Usuario
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          fullWidth
          value={userType}
          onChange={userTypeOnChange}
        >
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>

        <TextField
          value={username}
          id="outlined-basic-user"
          label="Nombre de Usuario"
          variant="standard"
          type="text"
          fullWidth
          required
          onChange={usernameOnChange}
        />

        <TextField
          value={name}
          id="outlined-basic-name"
          label="Nombre completo"
          variant="standard"
          type="text"
          fullWidth
          required
          onChange={nameOnChange}
        />

        <TextField
          value={email}
          id="outlined-basic-email"
          label="Email"
          variant="standard"
          type="text"
          fullWidth
          required
          onChange={emailOnChange}
        />
        <TextField
          value={password}
          id="outlined-basic-password"
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          required
          onChange={passwordOnChange}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Registrarse
        </Button>
        <label>Ya estas registrado?</label>
        <Button
          type="button"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleAlreadyRegister}
        >
          Login
        </Button>
      </Paper>
    </Grid>
  );
};

export default Register;

//'@mui/material/'
//alignItems="center" justify="center"
