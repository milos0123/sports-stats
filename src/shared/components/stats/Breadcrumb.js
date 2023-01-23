import * as React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import sports_soccer from '../../assets/sports_soccer.svg'
import chevron_right from '../../assets/chevron_right.svg'
import player_run from '../../assets/player_run.svg'

const Breadcrumb = ({ countryImg, clubLogo, name }) => {
    const location = useLocation();
    const path = location.pathname
    const pathArr = path.split("/")
    
    return (
        <ul className="breadcrumb">
            <li key="brd1">
                <NavLink to={pathArr.slice(0, 5).join("/")}>
                    <img src={`/${sports_soccer.split("/").pop()}`} className="filter-green" />
                    &nbsp;<span>Soccer</span>&nbsp;
                    <img src={`/${chevron_right.split("/").pop()}`} className="chevron-right" />
                </NavLink>
            </li>
            <li key="brd2">
                <NavLink to={pathArr.slice(0, 5).join("/")}>
                    <img src={countryImg} />
                    &nbsp;<span>{pathArr.slice(3, 4).join()}</span>&nbsp;
                    <img src={`/${chevron_right.split("/").pop()}`} className="chevron-right" />
                </NavLink>
            </li>
            {pathArr.length > 5 && <li key="brd3">
                <NavLink to={pathArr.slice(0, 8).join("/")}>
                    <img src={clubLogo} />
                    &nbsp;<span>{name}</span>&nbsp;
                    <img src={`/${chevron_right.split("/").pop()}`} className="chevron-right" />
                </NavLink>
            </li>}
            {pathArr.length > 8 && <li key="brd4">
                <NavLink to={path}>
                    <img className='filter-green' src={`/${player_run.split("/").pop()}`} />
                    &nbsp;<span>{pathArr.slice(8, 9).join().replaceAll("20", " ")}</span>
                </NavLink>
            </li>}
        </ul>
    )
}

export default Breadcrumb