import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

export default function Main(props) {
  const mainBottomNavigationRef = useRef(null);

  const language = useSelector((state) => state.app.settings.language);

  const [weatherDetailsIsFullScreen, setWeatherDetailsIsFullScreen] =
    useState(false);

  const locationName = useSelector((state) => state.location.name);
  const citiesWeatherData = useSelector(
    (state) => state.citiesWeatherData.list
  );

  const currentCityWeatherData = citiesWeatherData.find(
    (cityWeatherData) => cityWeatherData.location.name === locationName
  );

  return (
    <main
      className={
        "main" + (weatherDetailsIsFullScreen ? " main_fullscreen" : "")
      }
    >
      <section
        className={
          "main__important-info" +
          (weatherDetailsIsFullScreen ? " main__important-info_fullscreen" : "")
        }
      >
        <div className="main__place">
          {currentCityWeatherData.location.name}
        </div>
        <div className="main__fullscreen-wrapper">
          <div className="main__weather-temperature">
            {Math.floor(currentCityWeatherData.current.temp_c) + "°"}
          </div>
          <div className="main__weather-state">
            {currentCityWeatherData.current.condition.text}
          </div>
        </div>
        <div className="main__temperature-limits">
          {uiDifferentLanguageData[language].pages.main.high_temperature +
            ":" +
            Math.floor(
              currentCityWeatherData.forecast.forecastday[0].day.maxtemp_c
            ) +
            "° " +
            uiDifferentLanguageData[language].pages.main.low_temperature +
            ":" +
            Math.floor(
              currentCityWeatherData.forecast.forecastday[0].day.mintemp_c
            ) +
            "°"}
        </div>
      </section>

      <section className="main__image">
        <img
          className="main__image-object"
          src={require("../assets/images/house.png")}
          alt="object"
        />
      </section>

      <MainWeatherDetails
        isFullScreen={weatherDetailsIsFullScreen}
        setFullScreen={setWeatherDetailsIsFullScreen}
        mainBottomNavigationRef={mainBottomNavigationRef}
        animationIsEnd={props.animationIsEnd}
      />

      <MainBottomNavigation
        mainBottomNavigationRef={mainBottomNavigationRef}
        isHidden={weatherDetailsIsFullScreen}
      />
    </main>
  );
}
