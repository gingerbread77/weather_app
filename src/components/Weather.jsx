import React, { useRef } from 'react'
import './Weather.css'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import search from '../assets/search.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
  const inputRef = useRef();
  
  return (
    <div className="weather">
      <div className="search">
        <img className="search-icon" src={search} alt="search icon" />
        <input ref={inputRef} type="text" className="search-input" placeholder="search location..." />
      </div>
      <h1>Beijing</h1>
      <p id="description">clear</p>
      <p id="degrees">25°C</p>
      <img src={clear} className="weather-icon" alt="clear icon" />
      <div className="weather-data">
        <div className="left">
          <img src={humidity} alt="humidity icon" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="right">
          <img src={wind} alt="wind icon" />
          <div>
            <p>3.6 Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather