import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

function getDataModelOfMainPage(currentLocationWeatherDataFromAPI) {
  const dataModelForMainPage = {
    temperature: 20,
    conditionText: "Partly Cloudy",
    maxTemperature: 25,
    minTemperature: 15,
  };

  if (currentLocationWeatherDataFromAPI) {
    dataModelForMainPage.temperature = Math.floor(
      currentLocationWeatherDataFromAPI.current.temp_c
    );
    dataModelForMainPage.conditionText =
      currentLocationWeatherDataFromAPI.current.condition.text;
    dataModelForMainPage.maxTemperature =
      currentLocationWeatherDataFromAPI.forecast.forecastday[0].day.maxtemp_c;
    dataModelForMainPage.minTemperature =
      currentLocationWeatherDataFromAPI.forecast.forecastday[0].day.mintemp_c;
  }

  return dataModelForMainPage;
}

export default function Main() {
  const mainBottomNavigationRef = useRef(null);

  const language = useSelector((state) => state.app.settings.language);

  const [weatherDetailsIsFullScreen, setWeatherDetailsIsFullScreen] =
    useState(false);

  const locationName = useSelector((state) => state.location.name);
  const weatherDataOfCities = useSelector(
    (state) => state.app.weather.dataOfCities
  );

  const currentLocationWeatherData = weatherDataOfCities.find(
    (cityWeatherData) => cityWeatherData.location.name === locationName
  );

  const dateModelOfMainPage = getDataModelOfMainPage(
    currentLocationWeatherData
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
        <div className="main__location-name">{locationName}</div>
        <div className="main__fullscreen-wrapper">
          <div className="main__temperature">
            {dateModelOfMainPage.temperature + "°"}
          </div>
          <div className="main__condition">
            {dateModelOfMainPage.conditionText}
          </div>
        </div>
        <div className="main__temperature-limits">
          {uiDifferentLanguageData[language].pages.main.high_temperature +
            ":" +
            dateModelOfMainPage.maxTemperature +
            "° " +
            uiDifferentLanguageData[language].pages.main.low_temperature +
            ":" +
            dateModelOfMainPage.minTemperature +
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
      />

      <MainBottomNavigation
        mainBottomNavigationRef={mainBottomNavigationRef}
        isHidden={weatherDetailsIsFullScreen}
      />
    </main>
  );
}
