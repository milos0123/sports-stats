import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../auth/auth-context";
import HeaderUserInfo from './HeaderUserInfo'
import sports_soccer from "../../assets/sports_soccer.svg"
import sports_basketball from "../../assets/sports_basketball.svg"
import sports_tennis from "../../assets/sports_tennis.svg"
import sports_hockey from "../../assets/sports_hockey.svg"
import expand_more from "../../assets/expand_more.svg"


const Header = () => {
    const location = useLocation()
    const ctx = React.useContext(AuthContext)
    
    React.useEffect(async () => {
        const response = await fetch('/getUser')
        const user = await response.json()
        if (response.ok) {
            ctx.logginUser(user)
        }
    }, [])

    return (
        <nav className={location.pathname.split("/").includes("user") ? "none" : "header"}>
            <div className="headline">
                <h1>Sports-Stats</h1>
            </div>
            <div className="navigation">
                <HeaderUserInfo />
                <div className="head-links">
                    <NavLink to="/soccer/league/Superliga/19686"
                        className={location.pathname.includes("/soccer/league/") ? "active-header" : ""}>
                        <img src={`/${sports_soccer.split("/").pop()}`}
                            className={location.pathname.includes("/soccer/league/") ? "active-header-svg" : "header-svg"} />
                        &nbsp;<span>SOCCER</span></NavLink>
                    <NavLink
                        className={location.pathname.includes("/basketball") ? "active-header" : ""}>
                        <img src={`/${sports_basketball.split("/").pop()}`}
                            className={location.pathname.includes("/basketball") ? "active-header-svg" : "header-svg"} />
                        &nbsp;<span>BASKETBALL</span></NavLink>
                    <NavLink
                        className={location.pathname.includes("/tennis") ? "active-header" : ""}>
                        <img src={`/${sports_tennis.split("/").pop()}`}
                            className={location.pathname.includes("/tennis") ? "active-header-svg" : "header-svg"} />
                        &nbsp;<span>TENNIS</span></NavLink>
                    <NavLink
                        className={location.pathname.includes("/hockey") ? "active-header" : ""}>
                        <img src={`/${sports_hockey.split("/").pop()}`}
                            className={location.pathname.includes("/hockey") ? "active-header-svg" : "header-svg"} />
                        &nbsp;<span>HOCKEY</span></NavLink>
                    <NavLink>
                        <span>More</span>&nbsp;
                        <img src={`/${expand_more.split("/").pop()}`}
                            className="header-svg" />
                    </NavLink>
                </div>
            </div>

        </nav>
    );
}

export default Header