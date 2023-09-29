import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/Main";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";
import { useDispatch } from "react-redux";
import * as locationSlice from "./features/location/locationSlice";
import * as currentWeatherDataSlice from "./features/currentWeatherData/currentWeatherDataSlice";
import * as forecastSlice from "./features/forecast/forecastSlice";
import * as imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";

import imagesOfWeatherConditionsJSON from "./assets/json/imagesOfWeatherConditions.json";

export default function App() {
  const location = useLocation();

  // ToDo: Move this code to RouteTransitionWrapper
  const [animationIsEnd, setAnimationState] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  const [apiAnswer] = useState(JSON.parse(localStorage.getItem("res")));

  const dispatch = useDispatch();
  dispatch(locationSlice.setName(apiAnswer.location.name));
  dispatch(currentWeatherDataSlice.setTemperatureC(apiAnswer.current.temp_c));
  dispatch(
    currentWeatherDataSlice.setCondition(apiAnswer.current.condition.text)
  );
  dispatch(
    forecastSlice.setDaysForecast(Array.from(apiAnswer.forecast.forecastday))
  );
  dispatch(
    imagesOfWeatherConditionsSlice.setCodes(imagesOfWeatherConditionsJSON)
  );

  return (
    <div className="wrapper">
      <Routes location={displayLocation}>
        <Route
          path="/"
          exact
          element={
            <RouteTransitionWrapper
              location={location}
              transitionStage={transitionStage}
              setTransitionStage={setTransitionStage}
              setDisplayLocation={setDisplayLocation}
              setAnimationState={setAnimationState}
            >
              <Main animationIsEnd={animationIsEnd} />
            </RouteTransitionWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <RouteTransitionWrapper
              location={location}
              transitionStage={transitionStage}
              setTransitionStage={setTransitionStage}
              setDisplayLocation={setDisplayLocation}
              setAnimationState={setAnimationState}
            >
              <Search />
            </RouteTransitionWrapper>
          }
        />
      </Routes>
    </div>
  );
}
