import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", { email: email, password: password })
      .then(() => navigate("/"))
      .catch(() => alert("Mail o contraseña incorrectos!"));
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "90px auto",
  };

  const avatarStyle = { backgroundColor: "#ff9f1c" };
  const btnstyle = { margin: "10px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Iniciar sesión en Figurita Repetida</h2>
        </Grid>
        <TextField
          label="Nombre de usuario"
          placeholder="Enter username"
          fullWidth
          required
          onChange={emailOnChange}
        />

        <TextField
          label="Contraseña"
          placeholder="Enter password"
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
          Iniciar sesión
        </Button>
        <Typography>
          <Link href="#">Olvidaste tu contraseña?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
