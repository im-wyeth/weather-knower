import "../assets/scss/components/rainfall.scss";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";
import { useEffect, useState } from "react";
import MainWeatherDetailsPropertyMin from "../components/MainWeatherDetailsPropertyMin";

const HOURS = 23;

export default function MainWeatherDetailsRainfall({
  apiDataIsLoaded,
  language,
  currentPlace,
}) {
  const [precipitationInLastHour, setPrecipitationInLastHour] = useState(0);
  const [precipitationInNext24Hour, setPrecipitationInNext24Hour] = useState(0);

  useEffect(() => {
    if (currentLocationWeatherData) {
      setPrecipitationInLastHour(
        currentLocationWeatherData.forecast.forecastday[0].hour[
          currentDate.getHours()
        ].precip_mm
      );

      for (
        let i = currentDate.getHours();
        i < HOURS - currentDate.getHours();
        ++i
      ) {
        setPrecipitationInNext24Hour(
          precipitationInNext24Hour +
            currentLocationWeatherData.forecast.forecastDay[0].hour[i].precip_mm
        );
      }
    }
  }, [apiDataIsLoaded]);

  return (
    <MainWeatherDetailsPropertyMin
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
      <div className="rainfall">
        <div className="rainfall__last-hour">
          {precipitationInLastHour}{" "}
          {
            uiDifferentLanguageData[language].components
              .main_weather_details_rainfall.mm_in_last_hour
          }
        </div>
        <span className="rainfall__expect">
          {precipitationInNext24Hour}{" "}
          {
            uiDifferentLanguageData[language].components
              .main_weather_details_rainfall.mm_expected_in_next_24
          }
        </span>
      </div>
    </MainWeatherDetailsPropertyMin>
  );
}
