import React from 'react'
import Layout from "../../component/Layout/Layout";
import CarouselEffect from "../../component/Carousel/CarouselsEffect";
import Category from "../../component/Category/Category";
import Product from "../../component/Product/Product";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing