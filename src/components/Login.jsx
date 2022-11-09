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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../states/user";
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/api/usuario/login", { email: email, password: password })
  //     .then(() => navigate("/"))
  //     .catch(() => alert("Mail o contraseña incorrectos!"));
  // };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //const { login } = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) navigate("/");
    else navigate("/login");
  }, [user]);

  // console.log("mi user es", user);
  const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 280,
    margin: "20px auto ",
    marginTop: "50px",
  };

  const avatarStyle = { backgroundColor: "#ff9f1c" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper
        sx={{
          borderRadius: 3,
        }}
        elevation={10}
        style={paperStyle}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Iniciar sesión en Figurita Repetida</h2>
        </Grid>
        <TextField
          label="E-mail"
          placeholder="Enter E-Mail"
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
          onClick={() => dispatch(login({ email, password }))}
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
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
