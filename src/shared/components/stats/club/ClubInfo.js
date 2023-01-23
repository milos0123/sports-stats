import * as React from 'react'
import { useParams, NavLink } from 'react-router-dom'

const ClubInfo = ({ img, name }) => {
    const { leagueName, id, clubName, clubID } = useParams()
    
    return (
        <React.Fragment>
            <div className='club-name'>
                <img src={img} />&nbsp;
                <h1>{name}</h1>
            </div>
            <div className='club-nav'>
                <NavLink
                    to={`/soccer/league/${leagueName}/${id}/${clubName}/${clubID}/Stats`}
                    className={({ isActive }) =>
                        isActive ? "active-club-nav-toggler" : "deactive-club-nav-toggler"}>
                    Statistics</NavLink>
                <NavLink
                    to={`/soccer/league/${leagueName}/${id}/${clubName}/${clubID}/Squad`}
                    className={({ isActive }) =>
                        isActive ? "active-club-nav-toggler" : "deactive-club-nav-toggler"}>
                    Squad</NavLink>
            </div>
        </React.Fragment>
    )
}

export default ClubInfo