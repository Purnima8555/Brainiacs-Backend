const express = require("express");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to DB
connectDb();

// Enable CORS
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// routes
app.use("/api/users", userRoutes);

module.exports = app;
