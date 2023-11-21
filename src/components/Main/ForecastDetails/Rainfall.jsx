import "../../../assets/scss/components/rainfall.scss";
import uiDifferentLanguageData from "../../../assets/json/uiDifferentLanguageData.json";
import PropertyMin from "./PropertyMin";
import getCurrentHourFromPlace from "../../../utils/getCurrentHourFromPlace";
import calculatePrecipitationFor24Hour from "../../../utils/calculatePrecipitationFor24Hour";

export default function Rainfall({ apiDataIsLoaded, language, currentPlace }) {
  return (
    <PropertyMin
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,20a6,6,0,0,1-6-6c0-4,6-10.8,6-10.8S18,10,18,14A6,6,0,0,1,12,20Z" />
        </svg>
      }
      name={
        uiDifferentLanguageData[language].components.main_weather_details
          .rainfall
      }
    >
      {apiDataIsLoaded ? (
        <div className="rainfall">
          <div className="rainfall__last-hour">
            {getCurrentHourFromPlace(currentPlace).precipitationInMM}{" "}
            {
              uiDifferentLanguageData[language].components
                .main_weather_details_rainfall.mm_in_last_hour
            }
          </div>
          <span className="rainfall__expect">
            {calculatePrecipitationFor24Hour(currentPlace)}{" "}
            {
              uiDifferentLanguageData[language].components
                .main_weather_details_rainfall.mm_expected_in_next_24
            }
          </span>
        </div>
      ) : (
        <></>
      )}
    </PropertyMin>
  );
}
