import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Main from "./pages/Main";
import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        }
      />
      <Route
        path="/search"
        element={
          <DefaultLayout>
            <Search />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}
