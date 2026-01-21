require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');


const { GoogleGenAI } = require('@google/genai');


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.length) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon, name, country } = geoRes.data[0];
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);

    if (forecastRes.data.cod !== "200") {
      return res.status(400).json({ error: 'Weather data not available' });
    }

    const result = { ...forecastRes.data, locationName: `${name}, ${country}` };
    res.json(result);
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Server error or invalid API response' });
  }
});

app.post('/weather-by-coords', async (req, res) => {
  const { lat, lon } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);

    if (forecastRes.data.cod !== "200") {
      return res.status(400).json({ error: 'Weather data not available' });
    }

    const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const geoRes = await axios.get(reverseGeoUrl);
    const locationName = geoRes.data[0] ? `${geoRes.data[0].name}, ${geoRes.data[0].country}` : 'Current Location';
    
    const result = { ...forecastRes.data, locationName };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching location data' });
  }
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `You are a friendly weather assistant. The user says: ${message}` }] }],
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error('Generative AI error:', err);
    res.status(500).json({ error: 'The AI is currently unavailable.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});