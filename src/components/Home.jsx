import React from "react";
import Grilla from "./Grid";
import Carrousel from "./Carrousel";
const Home = ({ productos }) => {
  return (
    <div>
      <div className="carrousel">Futuro Carrousel</div>

      <h1 className="promo"> Las mas vendidas</h1>
      <Grilla productos={productos} />
    </div>
  );
};

export default Home;
