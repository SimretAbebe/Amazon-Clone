import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import "./product.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from '../../Utility/action.js'

function ProductCard({ product , flex  , prodescription ,renderadd}) {
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;

  const [state, dispatch]=useContext(DataContext)

  const addToCart = ()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  }

  return (
    <div className={`${"card-container"} ${flex ? "fixed" : ""}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {prodescription && (
          <div style={{ maxWidth: "750px" }}>{description}</div>
        )}
        <div className="rating">
          <Rating value={rating?.rate || 0} precision={0.1} />
          <small>{rating?.count || 0}</small>
          <div>
            <CurrencyFormat amount={price || 0} />
          </div>
          {renderadd !== false  && (
            <button className="button" onClick={addToCart}>
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
