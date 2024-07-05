import React, { useState } from 'react';
import axios from 'axios';
import WeatherIcon from 'react-icons-weather';
import { WiSunrise, WiSunset, WiThermometer, WiStrongWind } from 'react-icons/wi';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <div className="weather-item">
            <WeatherIcon name="owm" iconId={weather.weather[0].id.toString()} flip="horizontal" rotate="90" />
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          </div>
          <div className="weather-item">
            <WiThermometer size={24} />
            <p>Feels Like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
          </div>
          <div className="weather-item">
            <p>Climate: {weather.weather[0].description}</p>
          </div>
          <div className="weather-item">
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
          <div className="weather-item">
            <p>Visibility: {weather.visibility} meters</p>
          </div>
          <div className="weather-item">
            <WiStrongWind size={24} />
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
          <div className="weather-item">
            <WiSunrise size={24} />
            <p>Sunrise (in IST): {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div className="weather-item">
            <WiSunset size={24} />
            <p>Sunset (in IST): {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
