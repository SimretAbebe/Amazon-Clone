import React, { useContext, useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import { db } from "../../Utility/firebase"; 
import { DataContext } from "../../component/DataProvider/DataProvider";
import ProductCard from "../../component/Product/ProductCard";
import {collection,doc,query,orderBy, onSnapshot} from "firebase/firestore";
import './order.css';


function Order() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
useEffect(() => {
  if (user) {
    const userOrdersRef = collection(
      doc(collection(db, "users"), user.uid),
      "orders"
    );
    const q = query(userOrdersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  } else {
    setOrders([]);
  }
}, [user]);


  return (
    <Layout>
      <section className="ordercont">
        <div className="order">
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div style={{padding : "20px"}}>
            you don't have orders yet !
          </div>

          }
          <div>
            {orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
