const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../weather/build')));

// API route
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'London';
  const apiKey = '106f455bf31e97431e5b4fcdafe6ce4c';
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../weather/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
