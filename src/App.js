import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import CardProduct from "./commons/Card";
import Grid from "./components/Grid";
import SingleProduct from "./commons/SingleProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/search" element={<SingleProduct />} />
        <Route path="/figurita/:id" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:user/favorites" element={<h1>favorites</h1>} />
        <Route path="/:user/cart" element={<h1>cart</h1>} />
        <Route path="/:user/checkout" element={<h1>checkout</h1>} />
      </Routes>
    </div>
  );
}

export default App;
