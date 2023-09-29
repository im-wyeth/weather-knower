import { useSelector } from "react-redux";
import "../assets/scss/components/city-weather.scss";
import { useEffect, useState } from "react";

export default function SearchCityWeather(props) {
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
    <div className="city-weather">
      <svg
        className="city-weather__background-shape"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 342 175"
      >
        <path
          d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          fill="url(#linear-gradient)"
        />
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0"
            y1="128"
            x2="354.142"
            y2="128"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5936B4" />
            <stop offset="1" stopColor="#362A84" />
          </linearGradient>
        </defs>
      </svg>
      <div className="city-weather__wrapper">
        <div className="city-weather__left-side">
          {/* ToDo: Заменить теги по семантике (не только здесь, везде) */}
          <div className="city-weather__temperature">{props.temperature}°</div>
          <div className="city-weather__temperature-limits">
            <span>H:{props.highTemperature}°</span>{" "}
            <span>L:{props.lowestTemperature}°</span>
          </div>
          <div className="city-weather__place">
            {props.city}, {props.country}
          </div>
        </div>
        <div className="city-weather__right-side">
          <img
            className="city-weather__image"
            src={newSrcOfConditionImage}
            alt="rain"
          />
          <div className="city-weather__state">{props.weatherCondition}</div>
        </div>
      </div>
    </div>
  );
}
