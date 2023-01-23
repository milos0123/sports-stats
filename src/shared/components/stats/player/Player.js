import * as React from 'react'
import PlayerInfo from './PlayerInfo'
import PlayerTableOne from './PlayerTableOne'
import PlayerTableTwo from './PlayerTableTwo'

const Player = ({playerData}) => {
    const data = Object.entries(playerData)
    
    return (
        <div className='player'>
            <PlayerInfo data={playerData?.player.data} num={playerData?.number} />
            <PlayerTableOne data={data?.filter(([key, value], i) => {
                if (typeof value !== "object" && i > 3 || value === null) {
                    return { key, value }
                }
            })} />
            {data?.map((el, i) => {
                if (i > 25 && i !== 33) {
                    return <PlayerTableTwo data={el} key={`${i}_ppp`}/>
                }
            })}
        </div>
    )
}

export default Player