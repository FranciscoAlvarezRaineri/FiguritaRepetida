import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GridMaterial() {
  const [productos, setProductos] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axios.get("/api/productos/").then((result) => {
      setItemData(
        result.data.map((producto) => {
          return {
            img: producto.urlImagen,
            title: producto.name,
            author: producto.precio,
          };
        })
      );
    });
  }, []);

  return (
    <div>
      <div className="carrousel">Futuro Carrousel</div>
      <ImageList
        cols={3}
        sx={{
          width: "50%",
          height: "500",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {itemData.length ? (
          itemData.map((item) => (
            <ImageListItem sx={{ width: "70%" }} key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>Precio: ${item.author}</span>}
                position="below"
              />
            </ImageListItem>
          ))
        ) : (
          <></>
        )}
      </ImageList>
    </div>
  );
}
