import * as React from 'react'

const StatsTableOne = ({data}) => {
    return (
        <table className="club-stats">
            <thead>
                <tr key="club-stats-tb1">
                    <th className='for'>For</th>
                    <th className='head-one'>#</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(([key, value], i) => {
                    return <tr key={`${i}_club-stats-tb1`}>
                        <td  className='name'>{key.at(0).toUpperCase().concat(key.slice(1)).replaceAll("_", " ")}</td>
                        <td className='data'>{value}{i === 2 && " %" || i === 15 && " %"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default StatsTableOne