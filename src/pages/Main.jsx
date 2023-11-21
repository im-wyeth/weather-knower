import { useState, useRef } from "react";
import "../assets/scss/pages/main.scss";
import BottomNavigation from "../components/Main/BottomNavigation/BottomNavigation";
import ForecastDetails from "../components/Main/ForecastDetails/ForecastDetails";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";
import { searchPlaceBuyName } from "../features/forecast/forecastSlice";
import getCurrentDayFromPlace from "../utils/getCurrentDayFromPlace";
import getCurrentHourFromPlace from "../utils/getCurrentHourFromPlace";
import HouseImageSrc from "../assets/images/house.png";
import MainGeneralInfo from "../components/Main/GeneralInfo";

export default function Main() {
  const mainBottomNavigationRef = useRef(null);

  const [weatherDetailsIsFullScreen, setForecastDetailsIsFullScreen] =
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
      <MainGeneralInfo
        weatherDetailsIsFullScreen={weatherDetailsIsFullScreen}
        language={language}
        apiDataIsLoaded={apiDataIsLoaded}
        currentPlace={currentPlace}
      />

      <section className="main__image">
        <img className="main__image-object" src={HouseImageSrc} alt="object" />
      </section>

      <ForecastDetails
        isFullScreen={weatherDetailsIsFullScreen}
        setFullScreen={setForecastDetailsIsFullScreen}
        mainBottomNavigationRef={mainBottomNavigationRef}
      />

      <BottomNavigation
        mainBottomNavigationRef={mainBottomNavigationRef}
        isHidden={weatherDetailsIsFullScreen}
      />
    </main>
  );
}
