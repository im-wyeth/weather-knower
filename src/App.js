import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/Main";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";

export default function App() {
  const location = useLocation();

  // ToDo: Move this code to RouteTransitionWrapper
  const [animationIsEnd, setAnimationState] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

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
