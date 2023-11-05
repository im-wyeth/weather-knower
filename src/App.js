import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";
import CustomLayout from "./layouts/CustomLayout";

const LOCATIONS = ["London", "Japan", "Paris"];

export default function App() {
  const [weatherDataOfCitiesFromApi, setweatherDataOfCitiesFromApi] = useState(
    []
  );

  useEffect(() => {
    const weatherDataOfCitiesTemp = [];

    const fetchCities = async () => {
      for (const location of LOCATIONS) {
        const fetchRes = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${location}&aqi=no`
        );

        const res = await fetchRes.json();

        weatherDataOfCitiesTemp.push(res);
      }

      setweatherDataOfCitiesFromApi(weatherDataOfCitiesTemp);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "weatherDataOfCities",
      JSON.stringify(weatherDataOfCitiesFromApi)
    );
  }, [weatherDataOfCitiesFromApi]);

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
