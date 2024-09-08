import { useState } from "react";
import "./App.css";
import { Droplet, Wind } from "react-feather";
import getWeather from "./Api";
import dateFormat from "dateformat";
import clear_d from "./images/clear-day.png";
import clear_n from "./images/clear-night.png";
import cloud_d from "./images/cloud-day.png";
import d_rain from "./images/day-rain.png";
import n_rain from "./images/night-rain.png";
import t_storms from "./images/thunderstorms.png";
import snow from "./images/snow.png";
import mist from "./images/mist.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherByCity = async () => {
    const weatherData = await getWeather(city);
    console.log(weatherData);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = (nowDate) => {

    return dateFormat(nowDate, `dddd  |  mmm d  |  h:MM TT`);
  };

  const renderLocalDate = () => {
    if (!weather.timezone) return "";

    const nowUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(nowUTC + weather.timezone * 1000);

    return renderDate(localTime)
  };

  const getIcon = (iconCode) => {
    const ApiIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    switch (iconCode) {
      case "01d":
        return clear_d;
      case "01n":
        return clear_n;
      case "02d":
        return cloud_d;
      case "02n":
        return ApiIcon;
      case "03d":
      case "03n":
        return ApiIcon;
      case "04d":
      case "04n":
        return ApiIcon;
      case "09d":
      case "09n":
        return ApiIcon;
      case "10d":
        return d_rain;
      case "10n":
        return n_rain;
      case "11d":
      case "11n":
        return t_storms;
      case "13d":
      case "13n":
        return snow;
      case "50d":
      case "50n":
        return mist;
      default:
        return ApiIcon;
    }
  };

  const weatherIcon = weather.weather && weather.weather[0] ? getIcon(weather.weather[0].icon) : clear_d;

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getWeatherByCity();
    }
  };

  return (
    <div className="layout">
      <div className="container">
        <div className="search-area">
          <input
            type="text"
            className="search-box"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-icon" onClick={getWeatherByCity}>
            <i class="ri-search-line"></i>
          </button>
        </div>

        {weather && weather.weather && (
          <>
            <div className="basic-weather">
              <div className="weather-icon">
                <img src={weatherIcon} alt="" />
              </div>

              <div className="location">
                <i class="ri-map-pin-line"></i> <p>{weather.name}</p>
              </div>

              <h1 className="temperature">
                {Math.floor(weather.main.temp)}
                <span>&deg;C</span>
              </h1>

              <p className="datetext">{renderLocalDate()}</p>
            </div>

            <div className="temp-others">
              <div className="left">
                <div className="humidity">
                  <div className="hum-icon">
                    <Droplet size={40} color="white" />
                  </div>
                  <p>
                    <span>{weather.main.humidity}</span>{" "}
                    <span style={{ fontSize: 18 }}>%</span> <br /> Humidity{" "}
                  </p>
                </div>
              </div>

              <div className="right">
                <div className="wind">
                  <div className="wind-icon">
                    <Wind size={40} color="white" />
                  </div>
                  <p>
                    <span>{weather.wind.speed}</span> km/h <br /> Wind Speed
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {!weather.weather && (
          <div className="content">
            <h4>Please Enter City Name!</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
