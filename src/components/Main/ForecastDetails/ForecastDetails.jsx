import "../../../assets/scss/components/forecast-details.scss";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ForecastItem from "./ForecastItem";
import UVIndex from "./UVIndex";
import Sunrise from "./Sunrise";
import Wind from "./Wind";
import Rainfall from "./Rainfall";
import FeelsLike from "./FeelsLike";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import uiLanguageData from "../../../assets/json/uiLanguageData.json";
import { FORECAST_TYPES } from "../../../utils/types";
import { searchPlaceBuyName } from "../../../features/forecast/forecastSlice";
import getCurrentDayFromPlace from "../../../utils/getCurrentDayFromPlace";
import Sceleton from "../../App/Sceleton";
import HorizontalSelection from "../../App/HorizontalSelection/HorizontalSelection";

const PROPERTY_COMPONENTS = [
  Sunrise,
  Wind,
  Rainfall,
  FeelsLike,
  Humidity,
  Pressure,
];

export default function ForecastDetails() {
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

  function onForecastItemsWheel(event) {
    forecastItemsRef.current.scrollLeft += event.deltaY;
  }

  return (
    <div className="forecast-details">
      <div className="forecast-details__top-bar">
        <HorizontalSelection
          selectionClassName={"forecast-details__selection"}
          lineClassName={"forecast-details__line"}
          value={currentForecastType}
          setValue={setCurrentForecastType}
          selections={[
            {
              text: uiLanguageData[language].components.main_weather_details
                .hourly_forecast,
              value: FORECAST_TYPES.HOURLY,
            },
            {
              text: uiLanguageData[language].components.main_weather_details
                .weekly_forecast,
              value: FORECAST_TYPES.WEEKLY,
            },
          ]}
        />
      </div>

      <div
        ref={forecastItemsRef}
        onWheel={onForecastItemsWheel}
        className="forecast-details__forecast-items"
      >
        {apiDataIsLoaded ? (
          <>
            {currentForecastType === FORECAST_TYPES.HOURLY
              ? getCurrentDayFromPlace(currentPlace).forecastOfHours.map(
                  (hour, idx) => (
                    <ForecastItem
                      key={idx}
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
          <div className="forecast-details__forecast-items-sceleton">
            <Sceleton width={"90%"} height={"146px"} borderRadius={"8px"} />
          </div>
        )}
      </div>

      <div className="forecast-details__container">
        <UVIndex
          apiDataIsLoaded={apiDataIsLoaded}
          language={language}
          currentPlace={currentPlace}
        />

        <div className="forecast-details__container-inner">
          {PROPERTY_COMPONENTS.map((Component, idx) => (
            <Component
              key={idx}
              apiDataIsLoaded={apiDataIsLoaded}
              language={language}
              currentPlace={currentPlace}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
