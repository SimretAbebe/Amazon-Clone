import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../api/endpoint";
import ProductCard from "../../component/Product/ProductCard";
import "./result.css";
import Loader from "../../component/Loader/Loader";

function Result() {
  const [result, setResults] = useState([]);
  const { categoryName } = useParams();
   const [isLoading, setIsloading] = useState(false);

  
  const categoryMap = {
    jewelry: "jewelery",
    electronics: "electronics",
    "men-clothing": "men's clothing",
    "women-clothing": "women's clothing",
  };

  const realCategory = categoryMap[categoryName] || categoryName;

  useEffect(() => {
    setIsloading(true);
    axios.get(`${productUrl}/products/category/${realCategory}`)
      .then((res) => {
        setResults(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [realCategory]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="products_container">
            {result?.map((product) => (
              <ProductCard key={product.id} product={product} renderadd={true}  />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Result;
