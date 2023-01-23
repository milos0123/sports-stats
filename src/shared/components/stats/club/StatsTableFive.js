import * as React from 'react'

const StatsTableFive = ({ penaltiesData }) => {
    const data = Object.entries(penaltiesData[1])
    
    return (
        <table className="club-stats">
            <thead>
                <tr key="clubstats">
                    <th className='for'>Penalties</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((el, i) => {
                    return <tr key={`${i}_club_stats`}>
                        <td className='name'>{el[0].at(0).toUpperCase().concat(el[0].slice(1))}</td>
                        <td className='data'>{el[1] || "0"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default StatsTableFive