import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: null,
  cartItems: [],
  cantidad: 0,
  total: 0,
};

export const agregarItem = createAsyncThunk(
  "cart/agregarItem",
  async (data, thunkAPI) => {
    const { idUser, cantidad, idProducto } = data;

    try {
      const respuesta = await axios.post("/api/carritos/agregar", {
        usuarioId: idUser,
        productoId: idProducto,
        cantidad: cantidad,
      });

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
      const respuesta = await axios.get(`/api/carritos/${idUser}`);

      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const eliminarItem = createAsyncThunk(
  "cart/eliminarItem",
  async (id, thunkAPI) => {
    try {
      const respuesta = await axios.delete(`/api/carritos/borrarUno/${id}`);

      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const limpiarCart = createAsyncThunk(
  "cart/limpiarCart",
  async (idCart, thunkAPI) => {
    try {
      await axios.delete(`/api/carritos/borrarTodos/${idCart}`);
      return idCart;
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
        (item) => item.id === action.payload
      );
      itemDelCarrito.cantidad = itemDelCarrito.cantidad + 1; //le sumo 1 a la cantidad
    },
    decrementarCarrito: (state, action) => {
      //hace lo mismo que incrementar
      const itemDelCarrito = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemDelCarrito.cantidad = itemDelCarrito.cantidad - 1; //tengo que verificar que no quede negativo, creo que desde el front
    },
    calcularTotal: (state, action) => {
      let cantidad = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        cantidad += item.cantidad;
        total += item.cantidad * item.producto.precio;
      });
      state.cantidad = cantidad;
      state.total = total;
    }, //En app usar un useEffect que cuando cambien los items del carrito, llamo a calcular total con un dispatch
  },
  extraReducers: {
    [agregarItem.fulfilled]: (state, action) => {
      state.cartItems.push(action.payload);
    },
    [obtenerItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload.pedidos;
      state.id = action.payload.id;
    },
    [obtenerItems.rejected]: (state, action) => {},
    [eliminarItem.fulfilled]: (state, action) => {
      const id = action.payload; //recibe un ID como payload desde React
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    [eliminarItem.rejected]: (state, action) => {},
    [limpiarCart.fulfilled]: (state, action) => {
      state.cartItems = [];
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
