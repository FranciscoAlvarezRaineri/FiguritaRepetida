import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  nombre: null,
  apellido: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => (state.user = action.payload), //cambio el estado actual de user por el nuevo usuario
    setUser: (state, action) => state.user, //simplemente retorno el usuario
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
