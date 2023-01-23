import * as React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'

const Home = ({ notifHandler }) => {
  return (
    <React.Fragment>
      <div className="forms">
        <h1>SPORTS-STATS</h1>
        <div className="formToggler">
          <NavLink
            to="/user/register"
            className={({ isActive }) =>
              isActive ? "active-form-toggler" : "deactive-form-toggler"}>
            REGISTER</NavLink>
          <NavLink
            to="/user/login"
            className={({ isActive }) =>
              isActive ? "active-form-toggler" : "deactive-form-toggler"}>
            LOGIN</NavLink>
        </div>
        <Routes>
          <Route
            key="register"
            path="register"
            element={< RegisterForm notifHandler={notifHandler} />} />
          <Route
            key="login"
            path="login"
            element={< LoginForm notifHandler={notifHandler} />} />
        </Routes>
      </div>
    </React.Fragment>
  )
}

export default Home