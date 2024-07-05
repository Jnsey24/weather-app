import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
        console.log("request made");
      const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Feels Like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Visibility: {weather.visibility} meters</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
