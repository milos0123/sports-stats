import * as React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import AuthContext from "./auth/auth-context";
import Navbar from './navbar/Navbar'
import Stats from './stats/Stats'
import ResponsiveExpand from './ResponsiveExpand'

const Main = ({ data, loginRepos, username, setUserHandler }) => {
  const [isActiveNav, setIsActiveNav] = React.useState(false)
  const isActiveNavHandler = (elem) => {
    setIsActiveNav(prevState => {
      return !prevState
    })
  }

  const ctx = React.useContext(AuthContext)
  React.useEffect(() => {
    if (username?.length) {
      ctx.logginUser(username)
    }
    return setUserHandler()
  }, [])
  // console.log("ctx from MAIN:::", ctx)

  return (
    <div className="main">
      <ResponsiveExpand name={"LEAGUES"} classSpan={"nav-expand"}
        isActive={isActiveNav}
        isActiveHandler={isActiveNavHandler}
      />
      <Navbar data={data} isActiveHandler={isActiveNavHandler} loginRepos={loginRepos} />
      <Routes>
        <Route
          key="league/:leagueName/:id"
          path="league/:leagueName/:id"
          element={<Stats data={data} loginRepos={loginRepos} />}
        />
        <Route
          key="league/:leagueName/:id/:clubName/:clubID/"
          path="league/:leagueName/:id/:clubName/:clubID/*"
          element={<Stats data={data} loginRepos={loginRepos} />}
        >
          <Route
            key=":clubNav/:playerName/:playerID"
            path=":clubNav/:playerName/:playerID"
            element={<Stats data={data} loginRepos={loginRepos} />}
          />
        </Route>
      </Routes>
      <Outlet />
    </div>
  );
}

export default Main