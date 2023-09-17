import { useEffect, useState } from "react";
import "../assets/scss/components/forecast-item.scss";
import { useSelector } from "react-redux";

export default function MainWeatherDetailsForecastItem(props) {
  const [time, setTime] = useState(props.time);

  let d = new Date().toLocaleTimeString().split(":")[0];

  if (time.split(":")[0] === d) {
    setTime("Now");
  }

  const conditionIcons = useSelector(
    (state) => state.imagesOfWeatherConditions.codes.payload
  );
  const imageSrcOfCondition = props.isDay
    ? conditionIcons[props.conditionCode].day
    : conditionIcons[props.conditionCode].night;

  let [newSrcOfConditionImage, setNewSrcOfConditionImage] = useState("");

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
        "forecast-item" + (time === "Now" ? " forecast-item_current" : "")
      }
    >
      {/* <div className="forecast-item__top"> */}
      <div className="forecast-item__time">{time}</div>

      <img
        className="forecast-item__weather-image"
        src={newSrcOfConditionImage}
        alt="condition"
      />
      {/* </div> */}

      <div className="forecast-item__temperature">
        {props.temperature + "°"}
      </div>
    </div>
  );
}
