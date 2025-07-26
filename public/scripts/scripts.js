async function searchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert("Please enter a city name.");

  const response = await fetch('/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city })
  });


  const data = await response.json();

  if (data.error) return alert(data.error);

  const current = data.list[0];
  document.getElementById('weather-desc').textContent = current.weather[0].description;
  document.getElementById('temp').textContent = `${Math.round(current.main.temp)}°C`;
  document.getElementById('feels-like').textContent = `Feels like: ${Math.round(current.main.feels_like)}°C`;
  document.getElementById('weatherIcon').textContent = getWeatherIcon(current.weather[0].main);

  const forecastCards = document.getElementById('forecastCards');
  forecastCards.innerHTML = '';

  data.list.slice(0, 12).forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white p-2 rounded shadow text-center";
    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const icon = getWeatherIcon(item.weather[0].main);
    const temp = `${Math.round(item.main.temp)}°C`;
    const desc = item.weather[0].main;

    card.innerHTML = `
      <div class="text-lg font-semibold">${time}</div>
      <div class="material-symbols-outlined text-3xl my-1">${icon}</div>
      <div>${temp}</div>
      <div class="text-sm text-gray-600">${desc}</div>
    `;
    forecastCards.appendChild(card);
  });
}

function getWeatherIcon(type) {
  const iconMap = {
    Clear: 'sunny',
    Clouds: 'cloud',
    Rain: 'rainy',
    Drizzle: 'rainy_light',
    Thunderstorm: 'thunderstorm',
    Snow: 'ac_unit',
    Mist: 'foggy',
    Haze: 'dehaze',
    Fog: 'foggy'
  };
  return iconMap[type] || 'device_unknown';
}
