import React from "react";
import Grilla from "./Grids/Grid";

import { Paper } from "@mui/material";
import { useState } from "react";

import Paginacion from "./Paginacion";

const Home = ({ productos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = productos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "60%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <h1 className="promo"> TODOS NUESTROS PRODUCTOS</h1>

      <Grilla productos={currentPosts} />

      <Paginacion
        postsPerPage={postPerPage}
        totalPosts={productos.length}
        paginate={paginate}
      />
    </Paper>
  );
};

export default Home;
