import "../../../assets/scss/components/feels-like.scss";
import uiDifferentLanguageData from "../../../assets/json/uiDifferentLanguageData.json";
import { PropertyMin, PropertyMinSceleton } from "./PropertyMin";
import getCurrentHourFromPlace from "../../../utils/getCurrentHourFromPlace";

export default function FeelsLike({ apiDataIsLoaded, language, currentPlace }) {
  if (!apiDataIsLoaded) {
    return <PropertyMinSceleton />;
  }

  return (
    <PropertyMin
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          version="1.1"
        >
          <path d="M21.25 6.008c0-6.904-10.5-6.904-10.5 0v13.048c-1.238 1.298-2.001 3.061-2.001 5.001 0 4.004 3.246 7.25 7.25 7.25s7.25-3.246 7.25-7.25c0-1.94-0.762-3.702-2.003-5.003l0.003 0.003zM16 28.75c-2.623 0-4.75-2.127-4.75-4.75 0-1.405 0.61-2.667 1.58-3.537l0.004-0.004c0.009-0.008 0.013-0.020 0.022-0.029 0.059-0.063 0.112-0.133 0.157-0.208l0.003-0.006c0.043-0.053 0.084-0.113 0.119-0.175l0.003-0.006c0.020-0.055 0.037-0.122 0.049-0.19l0.001-0.007c0.027-0.081 0.047-0.175 0.056-0.272l0-0.005 0.007-0.033v-13.52c-0.001-0.031-0.002-0.068-0.002-0.105 0-1.52 1.232-2.752 2.752-2.752s2.752 1.232 2.752 2.752c0 0.037-0.001 0.074-0.002 0.11l0-0.005v13.52c0 0.012 0.007 0.023 0.007 0.035 0.009 0.098 0.028 0.188 0.056 0.274l-0.002-0.009c0.013 0.079 0.031 0.149 0.055 0.217l-0.003-0.009c0.038 0.068 0.079 0.127 0.123 0.182l-0.002-0.002c0.048 0.081 0.101 0.151 0.16 0.215l-0.001-0.001c0.009 0.009 0.012 0.021 0.022 0.029 0.974 0.874 1.584 2.136 1.584 3.541 0 2.623-2.127 4.75-4.75 4.75v0zM26.5 1.75c-2.071 0-3.75 1.679-3.75 3.75s1.679 3.75 3.75 3.75c2.071 0 3.75-1.679 3.75-3.75v0c-0.002-2.070-1.68-3.748-3.75-3.75h-0zM26.5 6.75c-0.69 0-1.25-0.56-1.25-1.25s0.56-1.25 1.25-1.25c0.69 0 1.25 0.56 1.25 1.25v0c-0.001 0.69-0.56 1.249-1.25 1.25h-0z" />
        </svg>
      }
      name={
        uiDifferentLanguageData[language].components.main_weather_details
          .feels_like
      }
    >
      <div className="feels-like">
        <div className="feels-like__temperature">
          {Math.floor(
            getCurrentHourFromPlace(currentPlace).feelslikeTemperature
          )}
          °
        </div>
      </div>
    </PropertyMin>
  );
}
