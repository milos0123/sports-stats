import * as React from 'react'
import NavFavLeague from "./NavFavLeague";
import star_fill from '../../assets/star_fill.svg'

const NavFavLeagues = ({ favourites, favLeagueHandler }) => {
    return (
        <ul className="nav-fav-leagues">
            <h2>
                <img
                    className="fav-star"
                    src={`/${star_fill.split("/").pop()}`} />
                <span> Favourite leagues </span>
            </h2>
            {favourites?.favLeagues.map(({ imgPath, name, id }) => (
                <li key={`${id}_favL`}>
                    <NavFavLeague
                        key={`${id}_favL123`}
                        favLeagueData={{ imgPath, name, id }}
                        favLeagueHandler={favLeagueHandler}
                    />
                </li>
            ))}
        </ul>
    )
}

export default NavFavLeagues