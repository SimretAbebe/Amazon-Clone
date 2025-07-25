const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success | " });
});

// Payment route
app.post("/payment/create", async (req, res) => {
  const total = Number(req.query.total); 

  if (!isNaN(total) && total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total), // Stripe expects amount in cents (integer)
        currency: "usd",
      });

      logger.log(" Payment Intent Created:", paymentIntent.id);

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      logger.error("Stripe Error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({
      message: "total must be a number greater than 0",
    });
  }
});

// Export cloud function
exports.api = onRequest(app);
