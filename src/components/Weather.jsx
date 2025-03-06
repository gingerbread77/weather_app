import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const { location, icon, humidity, windSpeed, temperature, weatherDescription } = weatherData;

  const icons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  // fetch data from API
  const getWeatherDataFromAPI = async (city) => {
    if (city === "") {
      toast.error('Please enter the correct city name!')
      return;
    }
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
      const data = await res.json();

      const icon = icons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed),
        location: data.name,
        icon: icon,
        weatherDescription: data.weather[0].description,
      })

    } catch (error) {
      setWeatherData(false);
      toast.error('Please enter the correct city name! ');
    }

  }

  // search when enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeatherDataFromAPI(inputRef.current.value);
    }
  }

  useEffect(() => {
    getWeatherDataFromAPI('Auckland');
  }, [])

  return (
    <div className="weather">
      <div className="search">
        <img className="search-icon" src={search_icon} alt="search icon" />
        <input ref={inputRef} type="text" className="search-input" placeholder="search location..." onKeyDown={handleKeyDown} />
      </div>
      {weatherData ?
        <>
          <h1>{location}</h1>
          <p id="description">{weatherDescription}</p>
          <p id="degrees">{temperature}°C</p>
          <img src={icon} className="weather-icon" alt="clear icon" />
          <div className="weather-data">
            <div className="left">
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="right">
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </> : <><h2>No Results</h2></>}
      <ToastContainer />
    </div>
  )
}

export default Weather