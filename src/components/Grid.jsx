import React from "react";
import Cardd from "../commons/Card";
import fotoMessi from "../commons/utils/messi.jpeg";
import "./componentClass.css";

const Grid = ({ productos }) => {
 // if(!productos) return <p>Esa figurita no existe</p>

  return (
    <section className="gridContainer">
    {/* CUANDO TENGAMOS LA INFO REAL*/}
      {/* {productos.map((producto) => (
        <Cardd
          //margenes tamaños
          key={producto.id}

          HAY QUE PASARLE A CARD LA IMAGEN
          producto={producto}
          fotoMessi={fotoMessi}

        />
      ))} */}


      {/* //PRUEBA ELEMENTO POR ELEMENTO */}
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      <Cardd fotoMessi={fotoMessi}/>
      
    </section>
  );
};

export default Grid;
