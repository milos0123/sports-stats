import * as React from 'react'
import { NavLink } from 'react-router-dom'
import star_fill from '../../assets/star_fill.svg'


const NavFavLeague = ({ favLeagueData, favLeagueHandler, isActiveHandler }) => {
    const { name, id, imgPath } = favLeagueData

    return (
        <React.Fragment>
            <div>
                <img width="50px" src={imgPath} />
                <NavLink to={`/soccer/league/${name}/${id}`}
                    className={({ isActive }) =>
                        isActive ? "active-nav-fav-league-toggler" : "deactive-nav-fav-league-toggler"}
                    onClick={isActiveHandler} >
                    {name}
                </NavLink>
            </div>
            <img className='star'
                id={id}
                title={name}
                slot={imgPath}
                onClick={favLeagueHandler}
                src={`/${star_fill.split("/").pop()}`} />
        </React.Fragment>
    )
}

export default NavFavLeague