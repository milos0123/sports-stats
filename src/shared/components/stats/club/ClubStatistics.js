import * as React from 'react'
import StatsTableOne from './StatsTableOne'
import StatsTableTwo from './StatsTableTwo'
import StatsTableThree from './StatsTableThree'
import StatsTableFour from './StatsTableFour'
import StatsTableFive from './StatsTableFive'

const ClubStatistics = ({ clubStats }) => {
    const data = Object.entries(clubStats)

    return (
        <React.Fragment>
            <StatsTableOne data={data?.filter(([key, value], i) => {
                if (typeof value === "string" && i > 2 || typeof value === "number" && i > 2) {
                    return { key, value }
                }
            })} />
            <StatsTableTwo data={data?.filter(([key, value], i) => {
                if (typeof value === "object" && ![10, 11, 12, 33].includes(i)) {
                    return { key, value }
                }
            })} />
            <StatsTableThree data={data?.filter(([key, value], i) => {
                if (i === 11 || i === 12) {
                    return { key, value }
                }
            })} />
            <StatsTableFour goalLineData={data?.find(e => e[0] === "goal_line")} />
            <StatsTableFive penaltiesData={data?.find(e => e[0] === "penalties")} />
        </React.Fragment>
    )
}

export default ClubStatistics