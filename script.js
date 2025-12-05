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
    showError("Please enter a city name");
    return;
  }

  showLoading(true);
  hideError();
  hideWeatherCard();

  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "City not found. Please check the spelling and try again."
        );
      } else if (response.status === 401) {
        throw new Error(
          "Invalid API key. Please check your API key configuration."
        );
      } else {
        throw new Error(
          "Failed to fetch weather data. Please try again later."
        );
      }
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
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

  const additionalHTML = `
    <h3 style="margin-bottom: 15px; color: #333;">Additional Information</h3>
    <div class="info-row">
        <span class="info-label">Min Temperature:</span>
        <span class="info-value">${Math.round(data.main.temp_min)}°C</span>
    </div>
    <div class="info-row">
        <span class="info-label">Max Temperature:</span>
        <span class="info-value">${Math.round(data.main.temp_max)}°C</span>
    </div>
    <div class="info-row">
        <span class="info-label">Visibility:</span>
        <span class="info-value">${(data.visibility / 1000).toFixed(
          1
        )} km</span>
    </div>
    <div class="info-row">
        <span class="info-label">Cloudiness:</span>
        <span class="info-value">${data.clouds.all}%</span>
    </div>
    <div class="info-row">
        <span class="info-label">Wind Direction:</span>
        <span class="info-value">${getWindDirection(data.wind.deg)}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Sunrise:</span>
        <span class="info-value">${formatTime(data.sys.sunrise)}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Sunset:</span>
        <span class="info-value">${formatTime(data.sys.sunset)}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Coordinates:</span>
        <span class="info-value">${data.coord.lat.toFixed(
          2
        )}°, ${data.coord.lon.toFixed(2)}°</span>
    </div>
`;
  document.getElementById("additionalInfo").innerHTML = additionalHTML;
  showWeatherCard();
}

function getWindDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return `${directions[index]} (${degrees}°)`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function showLoading(show) {
  document.getElementById("loading").style.display = show ? "block" : "none";
}

function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

function hideError() {
  document.getElementById("error").style.display = "none";
}

function showWeatherCard() {
  document.getElementById("weatherCard").style.display = "block";
}

function hideWeatherCard() {
  document.getElementById("weatherCard").style.display = "none";
}
