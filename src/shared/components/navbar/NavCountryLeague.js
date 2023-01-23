import * as React from 'react'
import { NavLink } from 'react-router-dom'
import star from '../../assets/star.svg'
import star_fill from '../../assets/star_fill.svg'

const NavCountryLeague = ({ countryLeaguesData, favLeagueHandler, favLeagues }) => {
    const { name, current_season_id, image_path } = countryLeaguesData
    const [starSrc, setStarSrc] = React.useState("star")

    React.useEffect(() => {
        if (favLeagues.some(e => +e.id === current_season_id)) {
            setStarSrc("star_fill")
        } else {
            setStarSrc("star")
        }
    }, [favLeagues])
    
    return (
        <React.Fragment>
            <NavLink to={`/soccer/league/${name}/${current_season_id}`}
                className={({ isActive }) =>
                    isActive ? "active-nav-fav-league-toggler" : "deactive-nav-fav-league-toggler"}   >
                {name}
            </NavLink>
            <img className='star'
                id={current_season_id}
                title={name}
                slot={image_path}
                onClick={favLeagueHandler}
                src={starSrc === "star"
                    ? `/${star.split("/").pop()}`
                    : `/${star_fill.split("/").pop()}`} />
        </React.Fragment>
    )
}

export default NavCountryLeague