import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  email: null,
  nombre: null,
  apellido: null,
  id: null,
  favoritos: [],
  rol: null,
};

//creo la fn async obtenerFavoritos
//Luego en los extraReducers del slice manejo el estado local de user con los estados de la promesa (fullfilled, rejected, pending )
// [obtenerFavoritos.fullfilled]: (state, action) =>

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const { email, password } = user;

    const respuesta = await axios.post("/api/usuario/login", {
      email: email,
      password: password,
    });

    return respuesta.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      msg: "Credenciales incorrectas",
      codigo: 401,
    });
  }
});

export const isLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (thunkAPI) => {
    try {
      const respuesta = await axios.get("/api/usuario/me");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No se encuentra usuario");
    }
  }
);

export const obtenerFavoritos = createAsyncThunk(
  "user/obtenerFavoritos",
  async (idUser, thunkAPI) => {
    try {
      const respuesta = await axios.get(`/api/favoritos/${idUser}`);
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const agregarFavorito = createAsyncThunk(
  "user/agregarFavorito",
  async (data, thunkAPI) => {
    const { idUser, idProducto } = data;
    try {
      const respuesta = await axios.post("/api/favoritos");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const eliminarFav = createAsyncThunk(
  "user/eliminarFav",
  async (data, thunkAPI) => {
    const { idUser, idProducto } = data;
    try {
      await axios.delete(`/api/favoritos/borrar_uno/${idUser}/${idProducto}`);
      return idProducto;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [obtenerFavoritos.fulfilled]: (state, action) => {
      state.favoritos = action.payload;
    },
    [agregarFavorito.fulfilled]: (state, action) => {
      state.favoritos.push(action.payload);
      return state;
    },
    [login.fulfilled]: (state, action) => {
      state.rol = action.payload.rol;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.id = action.payload.id;
    },
    [login.rejected]: (state) => {
      state = initialState;
      return state;
    },
    [isLoggedIn.fulfilled]: (state, action) => {
      state.rol = action.payload.rol;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.id = action.payload.id;
    },
    [eliminarFav.fulfilled]: (state, action) => {
      const id = action.payload; //recibe un ID como payload desde React
      state.favoritos = state.favoritos.filter((item) => item.id !== id); //devuelvo todos los items que no tienen ese id
    },
  },
});

export const { getUser, setUser } = userSlice.actions;

//desde el componente importamos la accion con
//! import {getUser} from '...'

export default userSlice.reducer;

//? para acceder al estado, en react usamos
//* const {getUser } = useSelector ((store) => store.cart):
//?               tambien puede ser
//* const getUser  = useSelector ((store) => store.user.getUser):
//? de esta manera accedemos a la propiedad particular de nuestro estado users
//? obviamente tambien podemos pedir todo el estado de user
//!acordarse de importar { useSelector } de redux en el componente React
