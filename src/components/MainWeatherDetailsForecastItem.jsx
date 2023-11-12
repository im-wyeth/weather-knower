import { useEffect, useState } from "react";
import "../assets/scss/components/forecast-item.scss";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";
import { FORECAST_TYPES } from "../utils/types";
import imagesOfWeatherConditions from "../assets/json/imagesOfWeatherConditions.json";

const DATE_LOCALES = {
  ru: "ru-RU",
  en: "en-US",
};

export default function MainWeatherDetailsForecastItem(props) {
  const apiDataIsLoaded = useSelector((state) => state.forecast.dataIsLoaded);
  const language = useSelector((state) => state.settings.language);

  const dateFromMilliseconds = new Date(props.timeInMilliseconds);
  const currentDate = new Date(Date.now());
  const imageSrcOfCondition = props.isDay
    ? imagesOfWeatherConditions[props.conditionCode].day
    : imagesOfWeatherConditions[props.conditionCode].night;

  const splittedTimeInString = dateFromMilliseconds
    .toLocaleTimeString()
    .split(":");

  const [timeForDisplay, setTimeForDisplay] = useState(
    splittedTimeInString[0] + ":" + splittedTimeInString[1]
  );
  let [newSrcOfConditionImage, setNewSrcOfConditionImage] = useState("");
  const [isCurrentHour, setIsCurrentHour] = useState(false);

  useEffect(() => {
    if (!apiDataIsLoaded) {
      return;
    }

    switch (props.forecastType) {
      case FORECAST_TYPES.WEEKLY:
        const dateName = dateFromMilliseconds.toLocaleDateString(
          DATE_LOCALES[language],
          { weekday: "short" }
        );

        setTimeForDisplay(dateName);
        break;

      case FORECAST_TYPES.HOURLY:
        if (
          currentDate.toLocaleTimeString().split(":")[0] ===
          splittedTimeInString[0]
        ) {
          setIsCurrentHour(true);
          setTimeForDisplay(
            uiDifferentLanguageData[language].components
              .main_weather_details_forecast_item.now
          );
          return;
        }

        setTimeForDisplay(
          splittedTimeInString[0] + ":" + splittedTimeInString[1]
        );

        if (timeForDisplay[0] === "0") {
          setTimeForDisplay(timeForDisplay.slice(1, timeForDisplay.length));
        }

        break;
    }

    async function fetchSvg() {
      const svg = await import(
        "../assets/images/weather/" + imageSrcOfCondition.split("weather/")[1]
      );

      setNewSrcOfConditionImage(svg.default);
    }

    fetchSvg();
  }, [props.forecastType]);

  return (
    <div
      className={
        "forecast-item" + (isCurrentHour ? " forecast-item_current" : "")
      }
    >
      {apiDataIsLoaded ? (
        <>
          {props.forecastType === "hourly" ? (
            <div className="forecast-item__time">{timeForDisplay}</div>
          ) : (
            <div className="forecast-item__day-of-the-week">
              {timeForDisplay}
            </div>
          )}
          <img
            className="forecast-item__weather-image"
            src={newSrcOfConditionImage}
            alt="condition"
          />
          <div className="forecast-item__temperature">
            {props.temperature + "°"}
          </div>
        </>
      ) : (
        <>
          <div className="forecast-item__preload"></div>
        </>
      )}
    </div>
  );
}
