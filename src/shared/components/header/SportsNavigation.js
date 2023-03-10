import * as React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import sports_soccer from "../../assets/sports_soccer.svg"
import sports_basketball from "../../assets/sports_basketball.svg"
import sports_tennis from "../../assets/sports_tennis.svg"
import sports_hockey from "../../assets/sports_hockey.svg"
import expand_more from "../../assets/expand_more.svg"

const SportsNavigation = ({ isActiveHeadHandler }) => {
    const location = useLocation()

    return (
        <div className="head-links" >
            <NavLink to="/soccer/league/Superliga/19686"
                onClick={isActiveHeadHandler}
                className={location.pathname.includes("/soccer/league/") ? "active-header" : ""}
                key="soccer_nav">
                <img src={`/${sports_soccer.split("/").pop()}`}
                    className={location.pathname.includes("/soccer/league/") ? "active-header-svg" : "header-svg"} />
                &nbsp;<span>SOCCER</span></NavLink>
            <NavLink key="bassketball_nav"
                className={location.pathname.includes("/basketball") ? "active-header" : ""}>
                <img src={`/${sports_basketball.split("/").pop()}`}
                    className={location.pathname.includes("/basketball") ? "active-header-svg" : "header-svg"} />
                &nbsp;<span>BASKETBALL</span></NavLink>
            <NavLink key="tennis_nav"
                className={location.pathname.includes("/tennis") ? "active-header" : ""}>
                <img src={`/${sports_tennis.split("/").pop()}`}
                    className={location.pathname.includes("/tennis") ? "active-header-svg" : "header-svg"} />
                &nbsp;<span>TENNIS</span></NavLink>
            <NavLink key="hockey_nav"
                className={location.pathname.includes("/hockey") ? "active-header" : ""}>
                <img src={`/${sports_hockey.split("/").pop()}`}
                    className={location.pathname.includes("/hockey") ? "active-header-svg" : "header-svg"} />
                &nbsp;<span>HOCKEY</span></NavLink>
            <NavLink key="more_nav">
                <span>More</span>&nbsp;
                <img src={`/${expand_more.split("/").pop()}`}
                    className="header-svg" />
            </NavLink>
        </div>
    )
}

export default SportsNavigation