import React from 'react'
import Layout from '../../component/Layout/Layout'
import { useContext } from 'react';
import { DataContext } from '../../component/DataProvider/DataProvider';
import ProductCard from '../../component/Product/ProductCard';
import CurrencyFormat from '../../component/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import './Cart.css'
import { Type } from '../../Utility/action';
import {IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



function Cart() {
  const [{basket , user } , dispatch] = useContext(DataContext)
  const total = basket.reduce((amount , item)=>{
    return item.price *  item.amount + amount
  }, 0)

const increment = (item) => {
  dispatch({
    type: Type.ADD_TO_BASKET,
    item
  });
};

const decrement = (id) => {
  dispatch({
    type: Type.REMOVE_FROM_BASKET,
    id,
  });
};



  return (
    <Layout>
      <section className='cartcontainer'>
        <div className='carts'>
          <h1>Hello</h1>
          <h2>Your Shopping basket</h2>
          <hr />
          {basket?.length == 0 ? (
            <h3>Opps ! No item in your Cart</h3>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className="cartpros">
                  <ProductCard
                    key={i}
                    product={item}
                    prodescription={true}
                    renderadd={false}
                    flex={true}
                  />
                  <div className="lastone">
                    <button className="btn" onClick={() => increment(item)}>
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
       
        {basket?.length !== 0 && 
        <div className='subtotal'>
         <div>
          <p>Subtotal ({basket?.length} items)</p>
          <CurrencyFormat amount={total}/>
         </div>
         <span>
          <input type="checkbox"/>
          <small>This order contains a gift</small>
         </span>
         <Link to ="/payments">Continue to check out</Link>

          </div>}
      </section>
    </Layout>
  );
}

export default Cart