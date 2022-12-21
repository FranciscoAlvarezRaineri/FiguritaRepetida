import React from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const EditUser = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get("/api/usuario").then((res) => setUsuarios(res.data));
  }, [usuarios]);

  const handleUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  const handleAdminize = () => {
    axios
      .put(`/api/usuario/promover/${user}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Nuevo Admin",
          text: "Nuevo Admin!",
        });
      })

      .catch((err) => console.log(err));
    setUser("");
  };

  const handleDelete = () => {
    axios
      .delete(`/api/usuario/eliminar/${user}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Eliminado...",
          text: "Usuario eliminado!",
        });
      })
      .catch((err) => console.log(err));
    setUser("");
  };

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
        Admin / eliminar usuario
      </Typography>

      <Container>
        <FormControl sx={{ width: "100%", marginTop: "15px" }}>
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
                    {usuario.nombreCompleto}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <Button
          onClick={() => handleAdminize()}
          variant="contained"
          fullWidth
          sx={{ marginTop: "15px" }}
        >
          ADMINIZAR
        </Button>

        <Button
          onClick={() => {
            handleDelete();
          }}
          variant="contained"
          fullWidth
          sx={{ marginTop: "15px" }}
        >
          ELIMINAR
        </Button>
      </Container>
    </>
  );
};

export default EditUser;
