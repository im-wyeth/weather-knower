import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";
import { useSelector } from "react-redux";

export default function Main(props) {
  const mainBottomNavigationRef = useRef(null);

  const [weatherDetailsIsFullScreen, setWeatherDetailsIsFullScreen] =
    useState(false);
  const locationName = useSelector((state) => state.location.name);
  const citiesWeatherData = useSelector(
    (state) => state.citiesWeatherData.list.payload
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
      <section className="main__important-info">
        <div className="main__place">
          {currentCityWeatherData.location.name}
        </div>
        <div className="main__fullscreen-wrapper">
          <div className="main__weather-temperature">
            {currentCityWeatherData.current.temp_c + "°"}
          </div>
          <div className="main__weather-state">
            {currentCityWeatherData.current.condition.text}
          </div>
        </div>
        <div className="main__temperature-limits">
          {"H:" +
            Math.floor(
              currentCityWeatherData.forecast.forecastday[0].day.maxtemp_c
            ) +
            "° L:" +
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
