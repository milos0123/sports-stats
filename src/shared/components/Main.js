import * as React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Navbar from './navbar/Navbar'
import Stats from './stats/Stats'
import ResponsiveExpand from './ResponsiveExpand'

const Main = ({ data }) => {
  const [isActive, setIsActive] = React.useState(false)
  const isActiveHandler = () => {
    setIsActive((prevState) => {
      return !prevState
    })
  }
  return (
    <div className="main">
      <ResponsiveExpand name={"LEAGUES"} classSpan={"nav-expand"}
        isActive={isActive}
        isActiveHandler={isActiveHandler} />
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