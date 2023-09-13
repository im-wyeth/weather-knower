import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/Main";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";
import { useDispatch } from "react-redux";
import * as locationSlice from "./features/location/locationSlice";
import * as currentWeatherDataSlice from "./features/currentWeatherData/currentWeatherDataSlice";

export default function App() {
  const location = useLocation();

  // ToDo: Move this code to RouteTransitionWrapper
  const [animationIsEnd, setAnimationState] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  const [apiAnswer, setApiAnswer] = useState(
    JSON.parse(localStorage.getItem("res"))
  );

  console.log(apiAnswer);

  const dispatch = useDispatch();
  dispatch(locationSlice.setName(apiAnswer.location.name));
  dispatch(currentWeatherDataSlice.setTemperatureC(apiAnswer.current.temp_c));
  dispatch(
    currentWeatherDataSlice.setCondition(apiAnswer.current.condition.text)
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
