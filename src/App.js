import { Route, Routes, useLocation } from "react-router-dom";

import Main from "./pages/Main";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";
import { useDispatch } from "react-redux";
import * as imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import { useSelector } from "react-redux";
import * as citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";

const LOCATIONS = ["London", "Japan", "Paris"];

export default function App() {
  const location = useLocation();

  // ToDo: Move this code to RouteTransitionWrapper
  const [animationIsEnd, setAnimationState] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [citiesWeatherDataFromApi, setCitiesWeatherDataFromApi] = useState([]);

  useEffect(() => {
    // const citiesWeatherDataTemp = [];
    // const fetchCities = async () => {
    //   for (const location of LOCATIONS) {
    //     const fetchRes = await fetch(
    //       `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${location}&aqi=no`
    //     );
    //     const res = await fetchRes.json();
    //     citiesWeatherDataTemp.push(res);
    //   }
    //   setCitiesWeatherDataFromApi(citiesWeatherDataTemp);
    // };
    // fetchCities();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "citiesWeatherData",
  //     JSON.stringify(citiesWeatherDataFromApi)
  //   );
  // }, [citiesWeatherDataFromApi]);

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
