import { useEffect, useState } from "react";
import "../assets/scss/components/forecast-item.scss";
import { useSelector } from "react-redux";

export default function MainWeatherDetailsForecastItem(props) {
  const dateFromMilliseconds = new Date(props.timeInMilliseconds);
  const currentDate = new Date(Date.now());

  const splittedTimeInString = dateFromMilliseconds
    .toLocaleTimeString()
    .split(":");

  const [timeForDisplay, setTimeForDisplay] = useState(
    splittedTimeInString[0] + ":" + splittedTimeInString[1]
  );
  let [newSrcOfConditionImage, setNewSrcOfConditionImage] = useState("");

  const conditionIcons = useSelector(
    (state) => state.imagesOfWeatherConditions.codes
  );
  const imageSrcOfCondition = props.isDay
    ? conditionIcons[props.conditionCode].day
    : conditionIcons[props.conditionCode].night;

  useEffect(() => {
    if (props.forecastType === "weekly") {
      const dateName = dateFromMilliseconds.toLocaleDateString("en-US", {
        weekday: "short",
      });

      setTimeForDisplay(dateName);
    } else if (
      currentDate.toLocaleTimeString().split(":")[0] === splittedTimeInString[0]
    ) {
      setTimeForDisplay("Now");
    } else {
      setTimeForDisplay(
        splittedTimeInString[0] + ":" + splittedTimeInString[1]
      );

      if (timeForDisplay[0] === "0") {
        setTimeForDisplay(timeForDisplay.slice(1, timeForDisplay.length));
      }
    }
  }, [props.forecastType]);

  useEffect(() => {
    async function fetchSvg() {
      const svg = await import(
        "../assets/images/weather/" + imageSrcOfCondition.split("weather/")[1]
      );

      setNewSrcOfConditionImage(svg.default);
    }

    fetchSvg();
  }, []);

  return (
    <div
      className={
        "forecast-item" +
        (timeForDisplay === "Now" ? " forecast-item_current" : "")
      }
    >
      {props.forecastType === "hourly" ? (
        <div className="forecast-item__time">{timeForDisplay}</div>
      ) : (
        <div className="forecast-item__day-of-the-week">{timeForDisplay}</div>
      )}

      <img
        className="forecast-item__weather-image"
        src={newSrcOfConditionImage}
        alt="condition"
      />

      <div className="forecast-item__temperature">
        {props.temperature + "°"}
      </div>
    </div>
  );
}
