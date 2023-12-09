import { useState } from "react";
import "../assets/scss/pages/main.scss";
import BottomNavigation from "../components/Main/BottomNavigation/BottomNavigation";
import ForecastDetails from "../components/Main/ForecastDetails/ForecastDetails";
import { useSelector } from "react-redux";
import { searchPlaceBuyName } from "../features/forecast/forecastSlice";
import getCurrentDayFromPlace from "../utils/getCurrentDayFromPlace";
import getCurrentHourFromPlace from "../utils/getCurrentHourFromPlace";
import HouseImageSrc from "../assets/images/house.png";
import {
  GeneralInfo,
  GeneralInfoSceleton,
} from "../components/Main/GeneralInfo";

export default function Main() {
  const [mainFullscreenMode, setMainFullScreenMode] = useState(false);

  const apiDataIsLoaded = useSelector((state) => state.forecast.dataIsLoaded);
  const language = useSelector((state) => state.settings.language);
  const locationName = useSelector((state) => state.location.name);
  const currentPlace = useSelector((state) =>
    searchPlaceBuyName(state, locationName)
  );

  return (
    <main className={"main" + (mainFullscreenMode ? " main_fullscreen" : "")}>
      {apiDataIsLoaded ? (
        <GeneralInfo
          mainFullscreenMode={mainFullscreenMode}
          language={language}
          name={currentPlace.name}
          conditionText={getCurrentHourFromPlace(currentPlace).conditionText}
          temperature={Math.floor(
            getCurrentHourFromPlace(currentPlace).temperature
          )}
          maxTemperature={Math.floor(
            getCurrentDayFromPlace(currentPlace).maxTemperature
          )}
          minTemperature={Math.floor(
            getCurrentDayFromPlace(currentPlace).minTemperature
          )}
        />
      ) : (
        <GeneralInfoSceleton mainFullscreenMode={mainFullscreenMode} />
      )}

      <section className="main__image">
        <img className="main__image-object" src={HouseImageSrc} alt="object" />
      </section>

      <ForecastDetails
        mainFullscreenMode={mainFullscreenMode}
        setMainFullscreenMode={setMainFullScreenMode}
      />

      <BottomNavigation mainFullscreenMode={mainFullscreenMode} />
    </main>
  );
}
