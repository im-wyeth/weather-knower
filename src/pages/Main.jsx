import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";
import { useSelector } from "react-redux";

export default function Main(props) {
  const [weatherDetailsIsFullScreen, setWeatherDetailsIsFullScreen] =
    useState(false);

  const mainBottomNavigationRef = useRef(null);

  const locationName = useSelector((state) => state.location.name.payload);
  // We need current hour temperature
  const temperatureC = Math.floor(
    Number(
      useSelector((state) => state.currentWeatherData.temperatureC.payload)
    )
  );
  //
  // Its the same here
  const condition = useSelector(
    (state) => state.currentWeatherData.condition.payload
  );
  //
  const currentDayWeatherData = useSelector(
    (state) => state.forecast.days.payload[0]
  );

  return (
    <main
      className={
        "main" + (weatherDetailsIsFullScreen ? " main_fullscreen" : "")
      }
    >
      <section className="main__important-info">
        <div className="main__place">{locationName}</div>
        <div className="main__fullscreen-wrapper">
          <div className="main__weather-temperature">{temperatureC + "°"}</div>
          <div className="main__weather-state">{condition}</div>
        </div>
        <div className="main__temperature-limits">
          {"H:" +
            Math.floor(currentDayWeatherData.day.maxtemp_c) +
            "° L:" +
            Math.floor(currentDayWeatherData.day.mintemp_c) +
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
