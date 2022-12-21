import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

import Grid from "./components/Grids/Grid";
import SingleProduct from "./commons/SingleProduct";

import Home from "./components/Home";
import ContentPaises from "./components/Contents/ContentPaises";
import ContentEspeciales from "./components/Contents/ContentEspeciales";
import ContentRareza from "./components/Contents/ContentRareza";
import ContentBusqueda from "./components/Contents/ContentBusqueda";
import Favoritos from "./components/Favoritos";
import Carrito from "./components/Carrito";
import Admin from "./components/Admin/Admin";
import History from "./components/History";
import ContentTop from "./components/Contents/ContentTop";

import MenuLateral from "./components/NavBar/MenuLateral";

import Footer from "./components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { calcularTotal, obtenerItems } from "./states/cart";

import { isLoggedIn } from "./states/user";
import Checkout from "./components/Checkout";
function App() {
  const [allProducts, setAllProducts] = useState([]);

  //! ========================================================
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    {
      user.id == null ? console.log("") : dispatch(calcularTotal());
    }
  }, [cartItems]);

  useEffect(() => {
    {
      user.id == null ? console.log("") : dispatch(obtenerItems(user.id));
    }
  }, [user.id]);

  useEffect(() => {
    {
      user.id == null ? dispatch(isLoggedIn()) : console.log("");
    }
  }, []);

  //! ========================================================

  useEffect(() => {
    axios
      .get("/api/productos")
      .then((result) => setAllProducts(result.data))

      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="todo">
      <div className="content">
        <MenuLateral />

        <Routes>
          <Route path="/" element={<Home productos={allProducts} />} />
          <Route path="/historialCarrito" element={<History />} />

          <Route
            path="/search/Todas"
            element={<Grid productos={allProducts} />}
          />
          <Route path="/search/Top" element={<ContentTop />} />
          <Route
            path="/search/Selecciones"
            element={<ContentPaises Todas={allProducts} />}
          />
          <Route
            path="/search/Especiales"
            element={<ContentEspeciales Todas={allProducts} />}
          />
          <Route
            path="/search/Rareza"
            element={<ContentRareza Todas={allProducts} />}
          />
          <Route
            path="/buscar/:nombre"
            element={<ContentBusqueda Todas={allProducts} />}
          />
          <Route path="/figurita/:id" element={<h1>figurita</h1>} />
          <Route path="/productos/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:user/favorites" element={<Favoritos />} />
          <Route path="/:user/cart" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:user/favorites" element={<h1>favorites</h1>} />

          <Route path="/:user/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
