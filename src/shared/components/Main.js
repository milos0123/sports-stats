import * as React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Navbar from './navbar/Navbar'
import Stats from './stats/Stats'

const Main = ({ data }) => {
  return (
    <div className="main">
      <Navbar data={data} />
      <Routes>
        <Route
          key="league/:leagueName/:id"
          path="league/:leagueName/:id"
          element={<Stats data={data} />}
        />
        <Route
          key="league/:leagueName/:id/:clubName/:clubID/"
          path="league/:leagueName/:id/:clubName/:clubID/*"
          element={<Stats data={data} />}
        >
          <Route
            key=":clubNav/:playerName/:playerID"
            path=":clubNav/:playerName/:playerID"
            element={<Stats data={data} />}
          />
        </Route>
      </Routes>
      <Outlet />
    </div>
  );
}

export default Main