import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import './product.css'
import Loader from '../Loader/Loader'

function Product() {
  const [products, setProducts] = useState([])
  const [isLoading , setIsloading] = useState(false)
  useEffect(() =>{
    setIsloading(true);
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="container">
          {products.map((singleProduct) => {
            return (
              <ProductCard   product={singleProduct} key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product