import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../api/endpoint';
import ProductCard from '../../component/Product/ProductCard';
import Loader from '../../component/Loader/Loader';

function Productdetail() {
  const {productId} = useParams()
   const [product, setProduct] = useState({})
   const [isLoading , setIsloading] = useState(false)

   useEffect(() => {
    setIsloading(true)
     axios.get(`${productUrl}/products/${productId}`)
       .then((res) => {
         setProduct(res.data);
         setIsloading(false)
       })
       .catch((err) => {
         console.log(err);
         setIsloading(false)
       });
   }, [productId]);
  return (
    <Layout>
      {isLoading ? <Loader /> : <ProductCard product={product}  flex={true} prodescription={true} renderadd={true}/>}
    </Layout>
  );
}

export default Productdetail