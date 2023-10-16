import { useSelector } from "react-redux";
import "../assets/scss/components/sunrise.scss";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";
import convertTime12To24 from "../utils/convertTime12To24";

export default function MainWeatherDetailsSunrise(props) {
  const language = useSelector((state) => state.app.settings.language);

  return (
    <div className="sunrise">
      <h2 className="sunrise__time">
        {language === "en" ? props.sunrise : convertTime12To24(props.sunrise)}
      </h2>
      <span className="sunrise__sunset-time">
        {uiDifferentLanguageData[language].components
          .main_weather_details_sunrise.sunset + " "}

        {language === "en" ? props.sunset : convertTime12To24(props.sunset)}
      </span>
    </div>
  );
}
