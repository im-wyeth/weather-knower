import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";
import * as imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import { useDispatch, useSelector } from "react-redux";
import * as citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";
import CustomLayout from "./layouts/CustomLayout";
import * as appSlice from "./features/app/appSlice";

const LOCATIONS = ["London", "Japan", "Paris"];

export default function App() {
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

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <RouteTransitionWrapper>
              <Main />
            </RouteTransitionWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <CustomLayout>
              <RouteTransitionWrapper>
                <Search />
              </RouteTransitionWrapper>
            </CustomLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <CustomLayout>
              <RouteTransitionWrapper>
                <Settings />
              </RouteTransitionWrapper>
            </CustomLayout>
          }
        />
      </Routes>
    </div>
  );
}
