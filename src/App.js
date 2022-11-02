import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/search" element={<h1>search</h1>} />
        <Route path="/figurita/:id" element={<h1>figurita</h1>} />
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
