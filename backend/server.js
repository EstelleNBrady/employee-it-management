// Import required packages
import dotenv from "dotenv"; // For loading environment variables
dotenv.config(); // Load environment variables from .env file
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // For enabling CORS
import bodyParser from "body-parser"; // For parsing incoming request bodies
// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend's URLapp.use(bodyParser.json()); // Parse incoming JSON data

// MongoDB connection using environment variable for security
const mongoURI = process.env.MONGO_URI;  // Read from .env file

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

import employeeRoutes from "../routes/employeeRoutes.js"; // Import employee routes
app.use("/employees", employeeRoutes);

// Sample route to test the server
app.get("/", (req, res) => {
  res.send("Employee IT Management API is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port http://localhost:5000");
});
