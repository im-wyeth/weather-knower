import { useEffect, useRef, useState } from "react";

import "../assets/scss/components/weather-detailes.scss";
import moveLineToTarget from "../utils/moveLineToTarget";
import MainWeatherDetailsForecastItem from "./MainWeatherDetailsForecastItem";
import UVIndex from "./UVIndex";
import Sunrise from "./Sunrise";
import Wind from "./Wind";

const HEIGHT_AND_TOP_MARGIN = 70 + 77;

const TOP_MARGIN = 240;

export default function MainWeatherDetails(props) {
  const thisRef = useRef(null);
  const forecastFirstButtonRef = useRef(null);
  const forecastSecondButtonRef = useRef(null);
  const movableLineRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const forecastItemsRef = useRef(null);

  const [currentForecastType, setCurrentForecastType] = useState("hourly");
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // ToDo: Firstly, set transition none, and then add the transition
    const mainBottomNavigationRect =
      props.mainBottomNavigationRef.current.getBoundingClientRect();

    thisRef.current.style.transform = `translate3d(-50%, ${
      mainBottomNavigationRect.top - TOP_MARGIN
    }px, 0)`;
  }, [props.animationIsEnd]);

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

  function onForecastItemsWheel(event) {
    forecastItemsRef.current.scrollLeft += event.deltaY;
  }

  function onTouchStart(event) {
    setTouchStartPosition({
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    });
  }

  function onTouchMove(event) {
    if (touchStartPosition.y - event.touches[0].pageY >= 40) {
      if (props.isFullScreen) {
        return;
      }

      props.setFullScreen(true);

      thisRef.current.style.transform = `translate3d(-50%, ${HEIGHT_AND_TOP_MARGIN}px, 0)`;

      thisRef.current.addEventListener("transitionend", () => {
        const scrollWrapperRect =
          scrollWrapperRef.current.getBoundingClientRect();

        scrollWrapperRef.current.style.height =
          window.innerHeight - scrollWrapperRect.top + "px";
      });
    }
  }

  return (
    <div
      ref={thisRef}
      className={
        "weather-details" +
        (props.isFullScreen ? " weather-details_fullscreen" : "")
      }
    >
      <div className="weather-details__top-bar">
        <button
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          className="weather-details__main-button"
        ></button>
        {/* ToDo: Use button instead of a:href */}
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

      <div ref={scrollWrapperRef} className="weather-details__scroll-wrapper">
        <div
          ref={forecastItemsRef}
          onWheel={onForecastItemsWheel}
          className="weather-details__forecast-items"
        >
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
          <MainWeatherDetailsForecastItem />
        </div>

        <div className="weather-details__container">
          <UVIndex />

          <div className="weather-details__container-inner">
            <Sunrise />
            <Wind />
          </div>
        </div>
      </div>

      <div className="weather-details__ellipse-1"></div>
      <div className="weather-details__ellipse-2"></div>
      <div className="weather-details__ellipse-3"></div>
    </div>
  );
}
