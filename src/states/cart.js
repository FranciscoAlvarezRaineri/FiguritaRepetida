import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  cantidad: 0,
  total: 0,
};

export const agregarItem = createAsyncThunk(
  "cart/agregarItem",
  async (data, thunkAPI) => {
    const { idUser, cantidad, idProducto } = data;
    try {
      console.log("me esta llegando", idUser, cantidad, idProducto);
      const respuesta = await axios.post("api/carritos/agregar");

      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const obtenerItems = createAsyncThunk(
  "cart/obtenerItems",
  async (idUser, thunkAPI) => {
    try {
      console.log("me esta llegando", idUser);
      const respuesta = await axios.get(`api/carritos/${idUser}`);

      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//* Tenemos que tener cuidado con nuestro manejo de estados en los reducers
//* Meaning? si nosotros retornamos un estado, nuestro estado total se convierte en eso que retornamos
//* Por ejemplo, si para limpiar el carrito usamos por ej: return { cartItems: []}
//! Todo el estado de carrito pasa a ser eso que retornamos, y perdemos cantidad y total

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    limpiarCarrito: (state, action) => {
      state.cartItems = [];
    },
    removerItem: (state, action) => {
      const id = action.payload; //recibe un ID como payload desde React
      state.cartItems = state.cartItems.filter((item) => item.id !== id); //devuelvo todos los items que no tienen ese id
    },
    incrementarCarrito: (state, action) => {
      //Incrementar cuantos del mismo item tengo en el carrito
      const itemDelCarrito = state.cartItems.find(
        //busco el item que recibo como payload en el array de items de mi estado
        (item) => item.id === action.payload.id
      );
      itemDelCarrito.cantidad = itemDelCarrito.cantidad + 1; //le sumo 1 a la cantidad
    },
    decrementarCarrito: (state, action) => {
      //hace lo mismo que incrementar
      const itemDelCarrito = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      itemDelCarrito.cantidad = itemDelCarrito.cantidad - 1; //tengo que verificar que no quede negativo, creo que desde el front
    },
    calcularTotal: (state, action) => {
      let cantidad = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        cantidad += item.cantidad;
        total += item.cantidad * item.precio;
      });
      state.cantidad = cantidad;
      state.total = total;
    }, //En app usar un useEffect que cuando cambien los items del carrito, llamo a calcular total con un dispatch
  },
  extraReducers: {
    [agregarItem.fulfilled]: (state, action) => {
      console.log(action);
      //state.cartItems = action.payload;
    },
    [obtenerItems.fulfilled]: (state, action) => {
      console.log(action);
      state.cartItems = action.payload;
    },
  },
});
export const {
  clearCart,
  removerItem,
  incrementarCarrito,
  decrementarCarrito,
  calcularTotal,
} = cartSlice.actions;
//desde el componente importamos la accion con
//! import {clearCart} from '...'

export default cartSlice.reducer;
//? para acceder al estado, en react usamos
//* const {cantidad } = useSelector ((store) => store.cart):
//?               tambien puede ser
//* const cantidad  = useSelector ((store) => store.cart.cantidad):
//? de esta manera accedemos a la propiedad particular 'cantidad' de nuestro estado cart
//? obviamente tambien podemos pedir todo el carrito
//!acordarse de importar { useSelector } de redux en el componente React
