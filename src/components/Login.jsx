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

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../states/user";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    dispatch(login({ email, password })).then((respuesta) => {
      if (respuesta.payload.codigo === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas",
        });
      } else {
        Swal.fire("Logged", "", "success");
        navigate("/");
      }
    });
  };

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

  const avatarStyle = { backgroundColor: "#ff9f1c" };

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
          sx={{ marginTop: "15px" }}
          label="E-mail"
          placeholder="Enter E-Mail"
          fullWidth
          required
          onChange={emailOnChange}
        />

        <TextField
          sx={{ marginTop: "15px" }}
          label="Contraseña"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={passwordOnChange}
        />

        <Button
          sx={{ marginTop: "20px" }}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
        <Typography>
          <Link href="#">Olvidaste tu contraseña?</Link>
        </Typography>
        <Button
          sx={{ marginTop: "20px" }}
          type="button"
          variant="contained"
          href="/register"
          fullWidth
        >
          Registrate
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
