import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import SingleProduct from "./commons/SingleProduct";
import CardProduct from "./commons/Card";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ContentPaises from "./components/ContentPaises";
import ContentEspeciales from "./components/ContentEspeciales";
import ContentRareza from "./components/ContentRareza";

function App() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/productos")
      .then((result) => result.data)
      .then((allFigurites) => setAllProducts(allFigurites))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="todo">
      <div className="side">
        <Sidebar />{" "}
      </div>
      <div className="content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home productos={allProducts} />} />
          <Route
            path="/search/Todas"
            element={<Grid productos={allProducts} />}
          />

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
          <Route path="/figurita/:id" element={<h1>figurita</h1>} />
          <Route path="/productos/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:user/favorites" element={<h1>favorites</h1>} />
          <Route path="/:user/cart" element={<h1>cart</h1>} />
          <Route path="/:user/checkout" element={<h1>checkout</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
