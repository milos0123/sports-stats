import * as React from 'react'

const StatsTableTwo = ({ data }) => {
    return (
        <table className="club-stats">
            <thead>
                <tr key="club-stats-table2">
                    <th className='for'>For</th>
                    <th>Total</th>
                    <th>Home</th>
                    <th>Away</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((el, i) => {
                    return <tr key={`${i}_club-stats-table2`}>
                        <td className='name'>{el[0].at(0).toUpperCase().concat(el[0].slice(1)).replaceAll("_", " ")}</td>
                        <td className='data'>{el[1].total}{i > 8 && "in"}</td>
                        <td className='data'>{el[1].home}{i > 8 && "in"}</td>
                        <td className='data'>{el[1].away}{i > 8 && "in"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default StatsTableTwo