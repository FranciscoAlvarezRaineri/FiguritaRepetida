import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./commonsClass.css";
import fotoMessi from "../commons/utils/messi.jpeg";
import { useState } from 'react';
import axios from "axios";

export default function CardProduct() {
//COMO PROP TIENE QUE VENIR EL PRODUCT DE GRID, PARA EN CARD MOSTRAR LA IMAGEN

  const [favorite, setFavorite] = useState({});
  const [addProduct, setAddProduct] = useState({});

  const addToFavorite = () =>{
    axios.post("url crear un fav").then(fav=>{
      setFavorite(fav.data)})
    }

  const addProdToCart = () =>{
    axios.post("api/productos").then(prod=>{
      setAddProduct(prod.data)})
    }
  
  return (
    <Card sx={{ maxWidth: 345}} className="cardContainer">
      <CardMedia
        component="img"
        height="450"
        image={fotoMessi}
        // URL DE LA FIGURITA  o PRODUCTO.IMG
        alt="Lionel Messi"
        //NOMBRE DE LA FIGURITA
      />
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lionel Andres Messi
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Argentina
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delantero
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={addToFavorite}/>
        </IconButton>
        <IconButton aria-label="share">
          <AddShoppingCartIcon onClick={addProdToCart}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}