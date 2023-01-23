import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClubStatistics from './ClubStatistics'
import Squad from './Squad'
import ClubInfo from './ClubInfo'


const Club = ({ club }) => {
    return (
        <div className='club' >
            <ClubInfo name={club?.name} img={club?.logo_path} />
            <Routes>
                <Route
                    key="clubStatistics"
                    path="Stats"
                    element={< ClubStatistics clubStats={club?.stats.data[0]} />} />
                <Route
                    key="squad"
                    path="Squad"
                    element={< Squad data={club?.squad.data}
                        coach={club?.coach.data} />} />
            </Routes>
        </div >
    )
}

export default Club