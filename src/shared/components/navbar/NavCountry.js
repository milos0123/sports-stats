import * as React from 'react'
import NavCountryLeague from './NavCountryLeague'
import expand_more from '../../assets/expand_more.svg'
import expand_less from '../../assets/expand_less.svg'

const NavCountry = ({ countryData, favLeagueHandler, favLeagues }) => {
    const { name, leagues, image_path } = countryData
    const [showLeagues, setShowLeagues] = React.useState(false)

    const showLeaguesHandler = (event) => {
        setShowLeagues((prevState) => {
            return !prevState
        })
    }
    
    return (
        <li className={showLeagues ? "active-league" : ""}
            key={`${name}_name`}>
            <span typeof='button'
                onClick={showLeaguesHandler}>
                {name}
                <img src={`/${expand_more.split("/").pop()}`}
                    className={showLeagues ? "hide" : "expand-more"} />
                <img src={`/${expand_less.split("/").pop()}`}
                    className={showLeagues ? "expand-less" : "hide"} />
            </span>
            <ul className={showLeagues ? "" : "none"}>
                {leagues.data.map(({ name, current_season_id, logo_path, current_round_id }) => (
                    current_round_id && <li key={`${name}_league`}
                        className='nav-countirie-league'>
                        <NavCountryLeague
                            key={`${name}_league123`}
                            favLeagues={favLeagues}
                            countryLeaguesData={{ name, current_season_id, logo_path, image_path }}
                            favLeagueHandler={favLeagueHandler}
                        />
                    </li>
                ))}
            </ul>
        </li>
    )

}

export default NavCountry