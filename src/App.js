import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import RouteTransitionWrapper from "./components/App/RouteTransitionWrapper";
import CustomLayout from "./layouts/CustomLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlacesData,
  setDataIsLoaded,
} from "./features/forecast/forecastSlice";

export default function App() {
  const dispatch = useDispatch();

  const { places } = useSelector((state) => state.forecast);

  useEffect(() => {
    if (!places.length) {
      dispatch(fetchPlacesData());
    } else {
      dispatch(setDataIsLoaded(true));
    }
  }, []);

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
