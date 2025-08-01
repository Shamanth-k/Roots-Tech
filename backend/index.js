require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const { connectToDB } = require("./database/db");

// server init
const server = express();

// database connection
connectToDB();

// Determine the allowed origin based on the environment (development or production)
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.ORIGIN
    : "http://localhost:3000";

// middlewares
server.use(
  cors({
    origin: allowedOrigin, // Dynamically set origin based on environment
    credentials: true, // Allow cookies to be sent with requests
    exposedHeaders: ["X-Total-Count"], // Expose custom headers if needed
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed methods
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// routeMiddleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

server.listen(8000, () => {
  console.log("server [STARTED] ~ http://localhost:8000");
});
