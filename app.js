const express = require("express");
const connectDb = require("./config/db");
require("dotenv").config({ path: "./config.env" });

const userRoutes = require("./routes/userRoute");
const progressRoutes = require("./routes/progressRoute");
const badgeRoutes = require("./routes/badgeRoute");
const leaderboardRoutes = require("./routes/leaderboardRoute");
const questionRoutes = require("./routes/questionRoute");
const lessonRoutes = require("./routes/lessonRoute");
const adminRoutes = require("./routes/adminRoute");

const app = express();

// Connect to DB
connectDb();

// Enable CORS
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow both origins
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/admins", adminRoutes);

module.exports = app;