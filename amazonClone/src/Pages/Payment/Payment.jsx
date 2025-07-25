import React, { useContext, useState} from "react";
import Layout from '../../component/Layout/Layout'
import './payment.css';
import { DataContext } from '../../component/DataProvider/DataProvider';
import ProductCard from '../../component/Product/ProductCard'
import { useStripe, useElements , CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../component/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../api/axios";
import { doc, collection , setDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase"; 
import { Type } from '../../Utility/action';




function Payment() {
const [{user ,basket} , dispatch] = useContext(DataContext);
 const totalitem = basket?.reduce((amount, item) => {
   return item.amount + amount;
 }, 0);
const total = basket.reduce((amount, item) => {
  return item.price * item.amount + amount;
}, 0);






const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate();
const [cardError , setCarderror] = useState(null);
const [processing , setProcessing] = useState(false);




  const handlechange = (e)=>{
     e?.error?.message? setCarderror(e ?.error?.message) : setCarderror("")
  }

 const handlePayment = async (e) => {
   e.preventDefault();
   try {
     setProcessing(true);
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${Math.round(total * 100)}`,
    });

     console.log(response.data);


     const clientSecret = response.data?.clientSecret;

    
     const confirmation = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: elements.getElement(CardElement),
       },
     });
     console.log(confirmation);

     const { paymentIntent } = confirmation;

    
     await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
       basket: basket,
       amount: paymentIntent.amount,
       created: paymentIntent.created,
     });

    //  empty in the basket
    dispatch({type:Type.EMPTY_BASKET})


    
     setProcessing(false);
     navigate("/order", { state: { msg: "you have placed new order" } });
   } catch (error) {
     setProcessing(false);
     console.log(error);
   }
 };





  return (
    <Layout>
      {/* header */}
      <div className="pay1">Checkout ({totalitem}) items</div>
      {/* payment method */}
      <section className="pay2">
        {/* addreess */}
        <div className="flexy">
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Bahir Dar ,Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className="flexy">
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item , index) => (
              <ProductCard   key= {index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className="flexy">
          <h3>Payment methods</h3>
          <div className="paymentform">
            <div className="pay3">
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handlechange} />
                {/* price */}
                <div className="price">
                  <div>
                    <span style={{display: "flex" , gap: "10px"}}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type= "submit">
                    {
                    processing? (
                      <div className="loading">
                        <ClipLoader color="grey" size={12} />
                        <p>Please Wait....</p>
                      </div>

                    ) : "Pay now"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment