const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// API route for weather
app.post('/weather', async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // 1. Get lat/lon from city name
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.length) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon } = geoRes.data[0];

    // 2. Get 3-hour forecast data from FREE API
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);

    if (forecastRes.data.cod !== "200") {
      return res.status(400).json({ error: 'Weather data not available' });
    }

    // 3. Send data back to frontend
    res.json(forecastRes.data);
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Server error or invalid API response' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
