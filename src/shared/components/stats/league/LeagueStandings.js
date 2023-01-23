import * as React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const LeagueStandings = ({ data }) => {
    const { id, leagueName } = useParams()
    
    return (
        <table className="standings">
            <thead>
                <tr key="leagueStandingsTable">
                    <th>#</th><th>Team</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>P</th><th>Form</th>
                </tr>
            </thead>
            <tbody>
                {data?.sort((a, b) => a.standings.position - b.standings.position)
                    .map((club) => (
                        <tr className="league-clubs-club"
                            key={`${club.id}_club`}>
                            <td><h4>{club.standings.position}</h4></td>
                            <td><NavLink
                                to={`/soccer/league/${leagueName}/${id}/${encodeURI(club.name).replaceAll("%", "")}/${club.id}/Stats`}>
                                <img src={club.logo_path} />
                                {club.name}
                            </NavLink></td>
                            <td className="standings-data">{club.standings.overall.games_played}</td>
                            <td className="standings-data">{club.standings.overall.won}</td>
                            <td className="standings-data">{club.standings.overall.draw}</td>
                            <td className="standings-data">{club.standings.overall.lost}</td>
                            <td className="standings-data">{club.standings.overall.goals_scored}:{club.standings.overall.goals_against}</td>
                            <td className="standings-data"><h4>{club.standings.overall.points}</h4></td>
                            <td>{club.standings.recent_form}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default LeagueStandings