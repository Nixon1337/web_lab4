const express = require("express");
const axios = require("axios");

const app = express();
const port = process.argv[2] || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/api", async (req, res) => {
  const term = req.query.term; // Отримання параметра term з запиту
  const url = `https://itunes.apple.com/search?term=${term}`;

  axios
    .get(url)
    .then((response) => {
      const results = response.data.results;
      const response_data = results.map((result) => ({
        album: result.collectionName,
        artist: result.artistName,
        price: result.collectionPrice,
      }));
      res.json(response_data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      res.status(500).send("An error occurred");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
