// API Configuration
const API_KEY = "e48360d66665cb4b529eefe18fdd303a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Weather icon mapping
const weatherIcons = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    console.log("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data); // for testing
  } catch (error) {
    console.error(error);
  }
}

function displayWeather(data) {
  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("weatherIcon").textContent =
    weatherIcons[data.weather[0].icon] || "🌡️";
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("weatherCard").style.display = "block";

  const detailsHTML = `
    <div class="detail-card">
        <div class="detail-icon">💨</div>
        <div class="detail-label">Wind Speed</div>
        <div class="detail-value">${data.wind.speed} m/s</div>
    </div>
    <div class="detail-card">
        <div class="detail-icon">💧</div>
        <div class="detail-label">Humidity</div>
        <div class="detail-value">${data.main.humidity}%</div>
    </div>
    <div class="detail-card">
        <div class="detail-icon">🌡️</div>
        <div class="detail-label">Feels Like</div>
        <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
    </div>
    <div class="detail-card">
        <div class="detail-icon">🔽</div>
        <div class="detail-label">Pressure</div>
        <div class="detail-value">${data.main.pressure} hPa</div>
    </div>
`;
  document.getElementById("weatherDetails").innerHTML = detailsHTML;
}
