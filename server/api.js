/*

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define the schema for favorites
const favoriteSchema = new mongoose.Schema({
  url: String,
  message: String,
});

// Create a model based on the favorite schema
const Favorite = mongoose.model("Favorite", favoriteSchema);

// Handle GET requests to /api/:resource
app.get("/api/:resource", async (req, res) => {
  const query = req.query.q;
  const resource = req.params.resource;
  let apiUrl;

  // Determine the API URL based on the requested resource
  if (resource === "random" || resource === "quack") {
    apiUrl = `https://random-d.uk/api/${resource}`;
  } else if (
    resource === "randomimg" ||
    resource === "list" ||
    resource.startsWith("http/")
  ) {
    apiUrl = `https://random-d.uk/api/v2/${resource}`;
  } else {
    // If the resource is not recognized, return a 404 error
    res.status(404).json({ error: "Invalid resource" });
    return;
  }

  try {
    // Make a request to the external API
    const response = await axios.get(apiUrl, { params: { q: query } });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from the API", error);
    res.status(500).json({ error: "Failed to fetch data from the API" });
  }
});

// Handle POST requests to /api/favorites
app.post("/api/favorites", async (req, res) => {
  const favoriteData = req.body;
  try {
    // Create a new Favorite instance and save it to the database
    const favorite = new Favorite(favoriteData);
    await favorite.save();
    res.json(favorite);
  } catch (error) {
    console.error("Error saving favorite", error);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

// Handle GET requests to /api/favorites
app.get("/api/favorites", async (req, res) => {
  try {
    // Retrieve all favorites from the database
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// Handle DELETE requests to /api/favorites/:id
app.delete("/api/favorites/:id", async (req, res) => {
  const favoriteId = req.params.id;
  try {
    // Remove the favorite with the specified ID from the database
    await Favorite.findByIdAndRemove(favoriteId);
    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/