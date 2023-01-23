import * as React from 'react'

const LeagueHeader = ({ logo_path, name, season }) => {
    return (
        <div className="league-data">
                <img src={logo_path} />
                <div>
                    <h1>{name}</h1>
                    <span>{season}</span>
                </div>
        </div>
    )
}

export default LeagueHeader