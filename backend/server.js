const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const itemRoutes = require("./routes/itemRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect the backend to MongoDB using the connection string from .env.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Lost and Found API routes.
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Lost and Found Registry API is running!"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});