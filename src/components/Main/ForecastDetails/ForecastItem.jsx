import { useEffect, useState } from "react";
import "../../../assets/scss/components/forecast-item.scss";
import WeatherConditionImage from "../../App/WeatherConditionImage";
import getHourWithMinutesfromDateInstance from "../../../utils/getHourWithMinutesfromDateInstance";
import { FORECAST_TYPES } from "../../../utils/types";

const DATE_LOCALES = {
  ru: "ru-RU",
  en: "en-US",
};

export default function ForecastItem({
  language,
  mainFullscreenMode,
  forecastType,
  date,
  temperature,
  isDay,
  conditionCode,
}) {
  const dateInstance = new Date(date);
  const currentDateInstance = new Date(Date.now());

  const [isCurrentHour, setIsCurrentHour] = useState(false);
  const [isCurrentDay, setIsCurrentDay] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    minimizeHandle();
  }, []);

  useEffect(() => {
    minimizeHandle();
  }, [mainFullscreenMode]);

  useEffect(() => {
    switch (forecastType) {
      case FORECAST_TYPES.HOURLY:
        setIsCurrentDay(false);

        if (dateInstance.getHours() === currentDateInstance.getHours()) {
          setIsCurrentHour(true);
        }
        break;
      case FORECAST_TYPES.WEEKLY:
        setIsCurrentHour(false);

        if (dateInstance.getDay() === currentDateInstance.getDay()) {
          setIsCurrentDay(true);
        }
        break;
    }
  }, [forecastType]);

  function minimizeHandle() {
    if (mainFullscreenMode) {
      setIsMinimized(false);

      return;
    }

    if (document.documentElement.clientHeight < 630) {
      setIsMinimized(true);
    }
  }

  return (
    <div
      className={
        "forecast-item" +
        (isCurrentHour || isCurrentDay ? " forecast-item_current" : "") +
        (isMinimized ? " forecast-item_minimized" : "")
      }
    >
      <div className="forecast-item__time">
        {forecastType === "hourly" ? (
          <>{getHourWithMinutesfromDateInstance(dateInstance)}</>
        ) : (
          <>
            {dateInstance.toLocaleDateString(DATE_LOCALES[language], {
              weekday: "short",
            })}
          </>
        )}
      </div>
      <WeatherConditionImage
        className="forecast-item__weather-image"
        conditionCode={conditionCode}
        isDay={isDay}
      />
      <div className="forecast-item__temperature">{temperature + "°"}</div>
    </div>
  );
}
