import * as React from "react";

import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import BasicSelect from "./utils/cantidadPrueba";

export default function SingleProduct({ cantidad }) {
  const idProducto = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    axios.get(`/api/productos/${idProducto.id}`).then((figu) => {
      setProducto(figu.data);
    });
  }, [producto]);

  return (
    <div className="todo">
      <div className="singleProductGeneral">
        <div className="singleProductLeft">
          <Typography
            fontFamily={"'Bungee Spice', cursive"}
            variant="h4"
            color={"#03045E"}
          >
            {producto.nombre} {producto.apellido}
          </Typography>
          <img
            src={producto.urlImagen}
            alt="Foto de producto"
            className="singleProductLeftImagen"
          />
          {/* ACA EN VEZ DE CARD VA LA IMAGEN DE LA FIGU NO LA CARD, SIMPLEMENTE PARA VER COMO QUEDA ESTA LA CARD */}
          <div className="singleProductDescription">
            <Typography
              fontFamily={"'Anton', sans-serif"}
              variant="h5"
              color={"#03045E"}
            >
              DESCRIPCION:
            </Typography>
            <div>
              {producto.tipo === "jugador" ? (
                <>
                  <Typography
                    fontFamily={"'Anton', sans-serif"}
                    variant="h6"
                    color={"#03045E"}
                  >
                    POSICION: {producto.posicion}
                  </Typography>
                  <Typography
                    fontFamily={"'Anton', sans-serif"}
                    variant="h6"
                    color={"#03045E"}
                  >
                    PAIS: {producto.pais}
                  </Typography>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="singleProductRigth">
          <BasicSelect producto={producto} />
        </div>
      </div>
    </div>
  );
}
