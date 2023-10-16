import "../assets/scss/components/rainfall.scss";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

export default function MainWeatherDetailsRainfall(props) {
  const language = useSelector((state) => state.app.settings.language);

  return (
    <div className="rainfall">
      <div className="rainfall__last-hour">
        {props.precipitationInLastHour}{" "}
        {
          uiDifferentLanguageData[language].components
            .main_weather_details_rainfall.mm_in_last_hour
        }
      </div>
      <span className="rainfall__expect">
        {props.precipitationInNext24Hour}{" "}
        {
          uiDifferentLanguageData[language].components
            .main_weather_details_rainfall.mm_expected_in_next_24
        }
      </span>
    </div>
  );
}
