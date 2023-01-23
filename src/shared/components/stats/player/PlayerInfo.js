import * as React from 'react'

const PlayerInfo = ({ data, num }) => {
    return (
        <div className='player-name'>
            <img src={data?.image_path}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://cdn.sportmonks.com/images/soccer/placeholder.png";
                }}
                alt="Player photo" />&nbsp;
            <div className='player-data'>
                <h1>{data?.display_name}&nbsp;{num}</h1>
                <span>Position:&nbsp;{data?.position_id === 1 && 'Goalkeeper'
                    || data?.position_id === 2 && 'Defender'
                    || data?.position_id === 3 && 'Midfielder'
                    || data?.position_id === 4 && 'Attacker'}</span>
                <span>DOB:&nbsp;{data?.birthdate}</span>
                <span>Nationality:&nbsp;{data?.nationality}</span>
            </div>
        </div>
    )
}

export default PlayerInfo