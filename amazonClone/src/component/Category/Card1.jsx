import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

function Card1({ data }) {
  return (
    <div className="category">
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default Card1;
