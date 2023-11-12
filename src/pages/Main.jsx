import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";
import { searchPlaceBuyName } from "../features/forecast/forecastSlice";

export default function Main() {
  const mainBottomNavigationRef = useRef(null);

  const [weatherDetailsIsFullScreen, setWeatherDetailsIsFullScreen] =
    useState(false);

  const apiDataIsLoaded = useSelector((state) => state.forecast.dataIsLoaded);
  const language = useSelector((state) => state.settings.language);
  const locationName = useSelector((state) => state.location.name);
  const currentPlace = useSelector((state) =>
    searchPlaceBuyName(state, locationName)
  );

  return (
    <main
      className={
        "main" + (weatherDetailsIsFullScreen ? " main_fullscreen" : "")
      }
    >
      <section
        className={
          "main__important-info" +
          (weatherDetailsIsFullScreen ? " main__important-info_fullscreen" : "")
        }
      >
        {apiDataIsLoaded ? (
          <>
            <div className="main__location-name">{locationName}</div>
            <div className="main__fullscreen-wrapper">
              <div className="main__temperature">
                {currentPlace.temperature + "°"}
              </div>
              <div className="main__condition">
                {currentPlace.conditionText}
              </div>
            </div>
            <div className="main__temperature-limits">
              {uiDifferentLanguageData[language].pages.main.high_temperature +
                ":" +
                currentPlace.maxTemperature +
                "° " +
                uiDifferentLanguageData[language].pages.main.low_temperature +
                ":" +
                currentPlace.minTemperature +
                "°"}
            </div>
          </>
        ) : (
          <>
            <div>Data is loading</div>
          </>
        )}
      </section>

      <section className="main__image">
        <img
          className="main__image-object"
          src={require("../assets/images/house.png")}
          alt="object"
        />
      </section>

      <MainWeatherDetails
        isFullScreen={weatherDetailsIsFullScreen}
        setFullScreen={setWeatherDetailsIsFullScreen}
        mainBottomNavigationRef={mainBottomNavigationRef}
      />

      <MainBottomNavigation
        mainBottomNavigationRef={mainBottomNavigationRef}
        isHidden={weatherDetailsIsFullScreen}
      />
    </main>
  );
}
