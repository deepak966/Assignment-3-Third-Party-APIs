// API Configuration
const API_KEY = 'e48360d66665cb4b529eefe18fdd303a';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Weather icon mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        console.log('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log(data); // for testing
    } catch (error) {
        console.error(error);
    }
}