import * as React from "react";
import LeagueHeader from './LeagueHeader'
import LeagueStandings from './LeagueStandings'

const LeagueClubs = ({ leagueClubsData, leagueData }) => {
    return (
        <React.Fragment>
            <LeagueHeader
                logo_path={leagueData?.logo_path}
                name={leagueData?.name}
                season={leagueData?.season.data.name}
            />
            <LeagueStandings data={leagueClubsData} />
        </React.Fragment>
    )
}

export default LeagueClubs