import { useEffect } from "react";
import "../../../assets/scss/components/forecast-item.scss";
import WeatherConditionImage from "../../App/WeatherConditionImage";

const DATE_LOCALES = {
  ru: "ru-RU",
  en: "en-US",
};

export default function ForecastItem({
  apiDataIsLoaded,
  language,
  forecastType,
  date,
  temperature,
  isDay,
  conditionCode,
}) {
  const dateInstance = new Date(date);

  useEffect(() => {
    // switch (props.forecastType) {
    //   case FORECAST_TYPES.WEEKLY:
    //     const dateName = dateFromMilliseconds.toLocaleDateString(
    //       DATE_LOCALES[language],
    //       { weekday: "short" }
    //     );
    //     setTimeForDisplay(dateName);
    //     break;
    //   case FORECAST_TYPES.HOURLY:
    //     if (
    //       currentDate.toLocaleTimeString().split(":")[0] ===
    //       splittedTimeInString[0]
    //     ) {
    //       setIsCurrentHour(true);
    //       setTimeForDisplay(
    //         uiDifferentLanguageData[language].components
    //           .main_weather_details_forecast_item.now
    //       );
    //       return;
    //     }
    //     setTimeForDisplay(
    //       splittedTimeInString[0] + ":" + splittedTimeInString[1]
    //     );
    //     if (timeForDisplay[0] === "0") {
    //       setTimeForDisplay(timeForDisplay.slice(1, timeForDisplay.length));
    //     }
    //     break;
    // }
  }, []);

  return (
    <div className="forecast-item">
      {/*  + (isCurrentHour ? " forecast-item_current" : "") */}
      {forecastType === "hourly" ? (
        <div className="forecast-item__time">
          {dateInstance.getHours() + ":" + dateInstance.getMinutes()}
        </div>
      ) : (
        <div className="forecast-item__day-of-the-week">
          {dateInstance.toLocaleDateString(DATE_LOCALES[language], {
            weekday: "short",
          })}
        </div>
      )}
      <WeatherConditionImage
        className="forecast-item__weather-image"
        conditionCode={conditionCode}
        isDay={isDay}
      />
      <div className="forecast-item__temperature">{temperature + "°"}</div>
    </div>
  );
}
