# 🌍 WeatherApp with AI Assistant

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](YOUR_FUTURE_LINK_HERE)

An interactive weather application built with Node.js and Express that provides real-time forecasts and features a built-in AI weather assistant powered by Google Gemini.

##  Features

* **Real-Time Weather**: Fetches 3-hour forecasts using the OpenWeatherMap API.
* **AI Chatbot**: A friendly AI assistant to answer your weather-related questions.
* **Auto-Location**: One-click location detection to see weather for your current coordinates.
* **Reverse Geocoding**: Automatically identifies your city name when using auto-location.
* **Responsive Design**: Styled with Tailwind CSS for a modern look on all devices.

##  Tech Stack

* **Backend**: Node.js, Express
* **Frontend**: EJS (Embedded JavaScript), Tailwind CSS
* **APIs**: OpenWeatherMap API, Google Gemini API
* **Tools**: Axios, Dotenv

##  Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Manash-0/weather-app.git](https://github.com/Manash-0/weather-app.git)
    cd weather-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```text
    PORT=3000
    WEATHER_API_KEY=your_openweathermap_key
    GEMINI_API_KEY=your_google_gemini_key
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    Open `http://localhost:3000` in your browser.

##  Project Structure

* `server.js`: The main backend logic and API routes.
* `public/scripts/scripts.js`: Frontend logic for UI updates and API calls.
* `views/index.ejs`: The main page template.
* `.gitignore`: Prevents sensitive files like `.env` from being uploaded.


---
