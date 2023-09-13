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
  const temperatureC = Math.floor(
    Number(
      useSelector((state) => state.currentWeatherData.temperatureC.payload)
    )
  );
  const condition = useSelector(
    (state) => state.currentWeatherData.condition.payload
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
        <div className="main__temperature-limits">H:24° L:18°</div>
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
