import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import Result from "./Pages/Results/Result";
import Productdetail from "./Pages/Productdetail/Productdetail";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Protected from "./component/Protected/Protected";

// ✅ Keep your original Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RmaPfG1PomJCzDBmRjXCUjhDUe71qHPeUFQNUu6lLFH5wtMZ6t8WBm56rwvPtNYbxokZCjLVW7sRlUaMUYoZ8jr00fYhJAMbm"
);

function Routeing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/payments"
          element={
            <Protected msg="You must log in to pay" redirect="/auth">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </Protected>
          }
        />

        <Route
          path="/order"
          element={
            <Protected
              msg="You must log in to access your orders"
              redirect="/auth">
              <Order />
            </Protected>
          }
        />

        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/product/:productId" element={<Productdetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routeing;
