import { useState } from "react";
import "../assets/scss/pages/main.scss";
import BottomNavigation from "../components/Main/BottomNavigation/BottomNavigation";
import ForecastDetails from "../components/Main/ForecastDetails/ForecastDetails";
import { useSelector } from "react-redux";
import { searchPlaceBuyName } from "../features/forecast/forecastSlice";
import getCurrentDayFromPlace from "../utils/getCurrentDayFromPlace";
import getCurrentHourFromPlace from "../utils/getCurrentHourFromPlace";
import HouseImageSrc from "../assets/images/house.png";
import uiLanguageData from "../assets/json/uiLanguageData.json";
import Sceleton from "../components/App/Sceleton";

export default function Main() {
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const apiDataIsLoaded = useSelector((state) => state.forecast.dataIsLoaded);
  const language = useSelector((state) => state.settings.language);
  const locationName = useSelector((state) => state.location.name);
  const currentPlace = useSelector((state) =>
    searchPlaceBuyName(state, locationName)
  );

  return (
    <main className={"main" + (fullscreenMode ? " main_fullscreen" : "")}>
      {apiDataIsLoaded ? (
        <section className="main__general-info">
          <div className="main__location-name">{currentPlace.name}</div>
          <div className="main__fullscreen-wrapper">
            <div className="main__temperature">
              {Math.floor(getCurrentHourFromPlace(currentPlace).temperature) +
                "°"}
            </div>
            <div className="main__condition">
              {getCurrentHourFromPlace(currentPlace).conditionText}
            </div>
          </div>
          <div className="main__temperature-limits">
            {uiLanguageData[language].pages.main.max_temperature +
              ":" +
              Math.floor(getCurrentDayFromPlace(currentPlace).maxTemperature) +
              "° " +
              uiLanguageData[language].pages.main.min_temperature +
              ":" +
              Math.floor(getCurrentDayFromPlace(currentPlace).minTemperature) +
              "°"}
          </div>
        </section>
      ) : (
        <section className="main__general-info main__general-info_sceleton">
          <div className="main__location-name">
            <Sceleton width={"129px"} height={"41px"} borderRadius={"8px"} />
          </div>
          <div className="main__fullscreen-wrapper">
            <div className="main__temperature">
              <Sceleton width={"170px"} height={"70px"} borderRadius={"8px"} />
            </div>
            <div className="main__condition">
              <Sceleton width={"115px"} height={"48px"} borderRadius={"8px"} />
            </div>
          </div>
        </section>
      )}

      <section className="main__image">
        <img className="main__image-object" src={HouseImageSrc} alt="object" />
      </section>

      <ForecastDetails
        mainFullscreenMode={fullscreenMode}
        setMainFullscreenMode={setFullscreenMode}
      />

      <BottomNavigation mainFullscreenMode={fullscreenMode} />
    </main>
  );
}
