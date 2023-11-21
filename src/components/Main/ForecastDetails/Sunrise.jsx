import "../../../assets/scss/components/sunrise.scss";
import uiDifferentLanguageData from "../../../assets/json/uiDifferentLanguageData.json";
import convertTime12To24 from "../../../utils/convertTime12To24";
import PropertyMin from "./PropertyMin";
import getCurrentDayFromPlace from "../../../utils/getCurrentDayFromPlace";

export default function Sunrise({ apiDataIsLoaded, language, currentPlace }) {
  return (
    <PropertyMin
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      name={
        uiDifferentLanguageData[language].components.main_weather_details
          .sunrise
      }
    >
      {apiDataIsLoaded ? (
        <div className="sunrise">
          <h2 className="sunrise__time">
            {language === "en"
              ? getCurrentDayFromPlace(currentPlace).sunriseTime
              : convertTime12To24(
                  getCurrentDayFromPlace(currentPlace).sunriseTime
                )}
          </h2>
          <span className="sunrise__sunset-time">
            {uiDifferentLanguageData[language].components
              .main_weather_details_sunrise.sunset + " "}

            {language === "en"
              ? getCurrentDayFromPlace(currentPlace).sunsetTime
              : convertTime12To24(
                  getCurrentDayFromPlace(currentPlace).sunsetTime
                )}
          </span>
        </div>
      ) : (
        <></>
      )}
    </PropertyMin>
  );
}
