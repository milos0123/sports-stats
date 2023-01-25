import * as React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const SquadTable = ({ data }) => {
    const { leagueName, id, clubName, clubID } = useParams()
    return (
        <table className="squad-table">
            <thead>
                <tr key="squadTable">
                    <th>#</th><th>Name</th><th>MP</th><th>G</th><th>A</th><th>YC</th><th>RC</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((p, i) => (
                    <tr key={`${i}_squad`}>
                        <td><h4>{p.number || "n/a"}</h4></td>
                        <td><NavLink
                            to={`/soccer/league/${leagueName}/${id}/${clubName}/${clubID}/Squad/${encodeURI(p.player.data.display_name).replaceAll("%", "")}/${p.player_id}`}>
                            <img src={p.player.data.country.data.image_path} />
                            {p.player.data.display_name}
                        </NavLink></td>
                        <td className="standings-data">{p.appearences || "0"}</td>
                        <td className="standings-data">{p.goals || "0"}</td>
                        <td className="standings-data">{p.assists || "0"}</td>
                        <td className="standings-data">{p.yellowcards || "0"}</td>
                        <td className="standings-data">{p.redcards || "0"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SquadTable