import * as React from 'react'
import SquadTable from './SquadTable';

const Squad = ({ data, coach }) => {
    return (
        <div className='squad'>
            <div>
                <h3>Goalkeepers</h3>
                <SquadTable data={data?.filter(p => p.position_id === 1)} />
            </div>
            <div>
                <h3>Defenders</h3>
                <SquadTable data={data?.filter(p => p.position_id === 2)} />
            </div>
            <div>
                <h3>Midfielders</h3>
                <SquadTable data={data?.filter(p => p.position_id === 3)} />
            </div>
            <div>
                <h3>Attackers</h3>
                <SquadTable data={data?.filter(p => p.position_id === 4)} />
            </div>
            <div>
                <h3>Coach</h3>
                <div className='coach'>
                    <img src={coach?.image_path} />
                    <span>{coach?.fullname}</span>
                </div>
            </div>
        </div >
    )
}

export default Squad