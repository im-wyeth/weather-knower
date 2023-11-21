import "../../../assets/scss/components/weather-details.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moveLineToTarget from "../../../utils/moveLineToTarget";
import ForecastItem from "./ForecastItem";
import UVIndex from "./UVIndex";
import Sunrise from "./Sunrise";
import Wind from "./Wind";
import Rainfall from "./Rainfall";
import FeelsLike from "./FeelsLike";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import uiDifferentLanguageData from "../../../assets/json/uiDifferentLanguageData.json";
import { FORECAST_TYPES } from "../../../utils/types";
import { searchPlaceBuyName } from "../../../features/forecast/forecastSlice";
import getCurrentDayFromPlace from "../../../utils/getCurrentDayFromPlace";

const VERTICAL_POSITION_OF_THIS_ELEM_IN_FULLSCREEN = 147;
const TOP_MARGIN = 230;
const FULLSCREEN_ACTIVATE_POINT = 100;

const EMPTY_FORECAST_ITEM_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ForecastDetails(props) {
  const thisRef = useRef(null);
  const forecastFirstButtonRef = useRef(null);
  const forecastSecondButtonRef = useRef(null);
  const movableLineRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const forecastItemsRef = useRef(null);

  const apiDataIsLoaded = useSelector((state) => state.forecast.dataIsLoaded);
  const language = useSelector((state) => state.settings.language);
  const locationName = useSelector((state) => state.location.name);
  const currentPlace = useSelector((state) =>
    searchPlaceBuyName(state, locationName)
  );

  const [currentForecastType, setCurrentForecastType] = useState(
    FORECAST_TYPES.HOURLY
  );
  const [mainButtonTouchStartPosition, setMainButtonTouchStartPosition] =
    useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);

    positionAtTheBottomNavigation();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  function positionAtTheBottomNavigation() {
    const mainBottomNavigationRect =
      props.mainBottomNavigationRef.current.getBoundingClientRect();

    moveThisElemVerticallyWithTranslate(
      mainBottomNavigationRect.top - TOP_MARGIN
    );

    props.mainBottomNavigationRef.current.removeEventListener(
      "transitionend",
      positionAtTheBottomNavigation
    );
  }

  function onForecastButtonClick(event, forecastType) {
    moveLineToTarget(movableLineRef.current, event.target);

    setCurrentForecastType(forecastType);
  }

  function onWindowResize() {
    const mainBottomNavigationRect =
      props.mainBottomNavigationRef.current.getBoundingClientRect();

    moveThisElemVerticallyWithTranslate(
      mainBottomNavigationRect.top - TOP_MARGIN
    );

    if (currentForecastType === FORECAST_TYPES.HOURLY) {
      moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);
    } else {
      moveLineToTarget(movableLineRef.current, forecastSecondButtonRef.current);
    }
  }

  function onForecastItemsWheel(event) {
    forecastItemsRef.current.scrollLeft += event.deltaY;
  }

  function mainButtonOnTouchStart(event) {
    setMainButtonTouchStartPosition({
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    });
  }

  function moveThisElemVerticallyWithTranslate(y) {
    thisRef.current.style.transform = `translate3d(-50%, ${y}px, 0)`;
  }

  function mainButtonOnTouchMove(event) {
    if (!props.isFullScreen) {
      moveThisElemVerticallyWithTranslate(event.touches[0].pageY);
    }

    if (
      mainButtonTouchStartPosition.y - event.touches[0].pageY >=
      FULLSCREEN_ACTIVATE_POINT
    ) {
      if (props.isFullScreen) {
        return;
      }

      props.setFullScreen(true);

      moveThisElemVerticallyWithTranslate(
        VERTICAL_POSITION_OF_THIS_ELEM_IN_FULLSCREEN
      );

      thisRef.current.addEventListener(
        "transitionend",
        activateScrollForScrollWrapper
      );
    }
  }

  function activateScrollForScrollWrapper() {
    const scrollWrapperRect = scrollWrapperRef.current.getBoundingClientRect();
    scrollWrapperRef.current.style.height =
      window.innerHeight - scrollWrapperRect.top + "px";

    thisRef.current.removeEventListener(
      "transitionend",
      activateScrollForScrollWrapper
    );
  }

  function onClick() {
    props.setFullScreen(false);

    props.mainBottomNavigationRef.current.addEventListener(
      "transitionend",
      positionAtTheBottomNavigation
    );

    scrollWrapperRef.current.style.height = "auto";
  }

  return (
    <div ref={thisRef} className="weather-details">
      <div className="weather-details__top-bar">
        <button
          onTouchStart={mainButtonOnTouchStart}
          onTouchMove={mainButtonOnTouchMove}
          onClick={onClick}
          className="weather-details__main-button"
        ></button>
        <button
          ref={forecastFirstButtonRef}
          onClick={(event) =>
            onForecastButtonClick(event, FORECAST_TYPES.HOURLY)
          }
          className="weather-details__forecast-button"
        >
          {
            uiDifferentLanguageData[language].components.main_weather_details
              .hourly_forecast
          }
        </button>
        <button
          ref={forecastSecondButtonRef}
          onClick={(event) =>
            onForecastButtonClick(event, FORECAST_TYPES.WEEKLY)
          }
          className="weather-details__forecast-button"
        >
          {
            uiDifferentLanguageData[language].components.main_weather_details
              .weekly_forecast
          }
        </button>
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
          {apiDataIsLoaded ? (
            <>
              {currentForecastType === FORECAST_TYPES.HOURLY
                ? getCurrentDayFromPlace(currentPlace).forecastOfHours.map(
                    (hour, idx) => (
                      <ForecastItem
                        key={idx}
                        apiDataIsLoaded={apiDataIsLoaded}
                        language={language}
                        date={hour.time}
                        forecastType={currentForecastType}
                        conditionCode={hour.conditionCode}
                        isDay={hour.isDay}
                        temperature={Math.floor(hour.temperature)}
                      />
                    )
                  )
                : currentPlace.forecastOfDays.map((day, idx) => (
                    <ForecastItem
                      key={idx}
                      apiDataIsLoaded={apiDataIsLoaded}
                      language={language}
                      date={day.date}
                      forecastType={currentForecastType}
                      conditionCode={day.conditionCode}
                      isDay={true}
                      temperature={Math.floor(day.avgTemperature)}
                    />
                  ))}
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="weather-details__container">
          <UVIndex
            apiDataIsLoaded={apiDataIsLoaded}
            language={language}
            currentPlace={currentPlace}
          />

          <div className="weather-details__container-inner">
            <Sunrise
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
            <Wind
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
            <Rainfall
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
            <FeelsLike
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
            <Humidity
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
            <Pressure
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
          </div>
        </div>
      </div>

      <div className="weather-details__ellipse-1"></div>
      <div className="weather-details__ellipse-2"></div>
      <div className="weather-details__ellipse-3"></div>
    </div>
  );
}
