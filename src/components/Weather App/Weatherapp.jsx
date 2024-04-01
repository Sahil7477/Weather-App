import React, { useState } from "react";
import "./Weatherapp.css";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import drizzle from "../assets/drizzle.png";
import scattered from "../assets/scattered.png";
export const Weatherapp = () => {
  const [icon, setIcon] = useState(clear)

  
  let search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${process.env.REACT_APP_API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-speed");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = data.wind.speed;
    temprature[0].innerHTML = data.main.temp;
    location[0].innerHTML = data.name;

    
    switch (data.weather[0].icon) {
      case "01d":
      case "01n":
        setIcon(clear);
        break;
      case "02d":
      case "02n":
        setIcon(cloud);
        break;
      case "03d":
      case "03n":
        setIcon(scattered);
        break;
      case "04d":
      case "04n":
        setIcon(rain);
        break;
      case "13d":
      case "13n":
        setIcon(snow);
        break;
      default:
        setIcon(clear);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-img">
        <img src={icon} alt="" />
      </div>
      <div className="weather-temp">24</div>
      <div className="weather-location">London</div>
      <div className="weather-data">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percentage">81%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-speed">14 km/h</div>
            <div className="text">wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
