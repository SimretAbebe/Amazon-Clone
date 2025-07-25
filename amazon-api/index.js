const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success | ",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = Math.round(Number(req.query.total));
  if (!isNaN(total) && total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log("PaymentIntent created:", paymentIntent);

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be a number greater than 0.",
    });
  }
});

//  THIS LINE IS REQUIRED TO START THE SERVER
app.listen(3000, (err) => {
  console.log("Server running on http://localhost:3000");
});
