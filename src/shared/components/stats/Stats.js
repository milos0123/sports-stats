import * as React from "react";
import { useNavigate, useParams } from 'react-router-dom'
import LeagueClubs from "./league/LeagueClubs";
import Club from "./club/Club"
import Player from './player/Player'
import Breadcrumb from "./Breadcrumb";

const Stats = ({ data }) => {
    const navigation = useNavigate()
    const { id, clubID, playerID } = useParams()
    const [repos, setRepos] = React.useState(() => {
        return __isBrowser__
            ? window.__INITIAL_CLUBS_DATA__ 
            : data.clubsData
    })
    const [loading, setLoading] = React.useState(
        repos ? false : true
    )

    React.useEffect(async () => {
        if (!repos || !repos.some(e => e.current_season_id === +id)) {
            setLoading(true)
            const response = await fetch(`/fetchClubsData/${id}`)
            const data = await response.json()
            if (!response.ok) {
                setLoading(false)
                return navigation('/something-went-wrong', { replace: true })
            } else {
                if (!data.standings || !data.clubs
                    || !data.standings.length || !data.clubs.length) {
                    setLoading(false)
                    return navigation('/something-went-wrong', { replace: true })
                } else {
                    const newRepos = data.clubs
                    newRepos?.map(team => {
                        team.standings = data?.standings[0].standings.data.find(t => t.team_id === team.id)
                    })
                    if (repos) {
                        setRepos((prevRepos) => {
                            return [...prevRepos, ...newRepos]
                        })
                    } else {
                        setRepos(newRepos)
                    }
                    setLoading(false)
                }
            }
        }
    }, [id])

    const league = repos?.find(team => team?.current_season_id === +id)
    const club = repos?.find(c => c?.id === +clubID)
    const player = club?.squad.data.find(p => p.player_id === +playerID)

    return (
        loading
            ? <div className="lds-dual-ring"></div>
            : <div className="stats">
                <Breadcrumb
                    name={club?.name}
                    countryImg={league?.country.data.image_path}
                    clubLogo={club?.logo_path}
                />
                {player && <Player playerData={player} />
                    || club && <Club club={club} />
                    || league && < LeagueClubs
                        leagueData={league?.country.data.leagues.data.find(el => el.current_season_id === +id)}
                        leagueClubsData={repos?.filter(team => team.current_season_id === +id)} />}
            </div >
    )
}

export default Stats