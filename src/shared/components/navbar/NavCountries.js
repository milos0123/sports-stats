import * as React from 'react'
import NavCountry from './NavCountry'
import expand_more from '../../assets/expand_more.svg'

const NavCountries = ({ repos, favourites, favLeagueHandler, isActiveHandler }) => {
    const [showCountiresNum, setShowCountiresNum] = React.useState(30)

    const showMoreCountriesNumHandler = () => {
        setShowCountiresNum(1000)
    }

    return (
        <ul className="nav-countries">
            <h2>All leagues</h2>
            {repos?.sort((a, b) => a.name.localeCompare(b.name))
                .map(({ name, leagues, image_path }, i) => (
                    i < showCountiresNum && leagues && <NavCountry
                        key={`${i}_123`}
                        isActiveHandler={isActiveHandler}
                        favLeagues={favourites.favLeagues}
                        countryData={{ name, leagues, image_path }}
                        favLeagueHandler={favLeagueHandler}
                    />
                ))}
            {showCountiresNum === 30 && <span
                className="more-countires"
                onClick={showMoreCountriesNumHandler}>
                <span>Show more</span>
                <img src={`/${expand_more.split("/").pop()}`} className="expand-less" />
            </span>}
        </ul>
    )
}

export default NavCountries