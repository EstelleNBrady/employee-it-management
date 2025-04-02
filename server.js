// Import required packages
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // MongoDB ODM
const cors = require('cors'); // CORS to allow cross-origin requests
const bodyParser = require('body-parser'); // For parsing incoming request bodies

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// MongoDB connection using environment variable for security
const mongoURI = process.env.MONGO_URI;  // Read from .env file

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Sample route to test the server
app.get('/', (req, res) => {
  res.send("Welcome to the Employee IT Management API!");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
