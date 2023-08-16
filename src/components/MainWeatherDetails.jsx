import { useEffect, useRef, useState } from "react";

import "../assets/scss/components/weather-detailed-information.scss";
import moveLineToTarget from "../utils/moveLineToTarget";

export default function WeatherDetails() {
  const forecastFirstButtonRef = useRef(null);
  const forecastSecondButtonRef = useRef(null);
  const movableLineRef = useRef(null);

  const [currentForecastType, setCurrentForecastType] = useState("hourly");

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  function onForecastButtonClick(event, forecastType) {
    moveLineToTarget(movableLineRef.current, event.target);

    setCurrentForecastType(forecastType);
  }

  function onWindowResize() {
    if (currentForecastType === "hourly") {
      moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);
    } else {
      moveLineToTarget(movableLineRef.current, forecastSecondButtonRef.current);
    }
  }

  return (
    <div className="weather-details">
      <div className="weather-details__ellipse-1"></div>
      <div className="weather-details__ellipse-2"></div>
      <div className="weather-details__ellipse-3"></div>

      <div className="weather-details__top-bar">
        <button className="weather-details__main-button"></button>
        <a
          ref={forecastFirstButtonRef}
          onClick={(event) => onForecastButtonClick(event, "hourly")}
          href="#"
          className="weather-details__forecast-button"
        >
          Hourly forecast
        </a>
        <a
          ref={forecastSecondButtonRef}
          onClick={(event) => onForecastButtonClick(event, "weekly")}
          href="#"
          className="weather-details__forecast-button"
        >
          Weekly forecast
        </a>
        <div
          ref={movableLineRef}
          className="weather-details__movable-line"
        ></div>
      </div>
      <div className="weather-details__forecast-items"></div>
    </div>
  );
}
