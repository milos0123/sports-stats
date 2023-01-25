import * as React from 'react'

const PlayerTableTwo = ({ data }) => {
    return (
        <table className="club-stats">
            <thead>
                <tr key="pltb2">
                    <th className='for'>{data[0]?.at(0).toUpperCase().concat(data[0]?.slice(1))}</th>
                    <th className='head-one'>#</th>
                </tr>
            </thead>
            <tbody>

                {Object.entries(data[1])?.map((el, i) => {
                    return <tr key={`${i}_pltb2`}>
                        <td className='name'>{el[0].at(0).toUpperCase().concat(el[0].slice(1)).replaceAll("_", " ")}</td>
                        <td className='data'>{el[1] || "0"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default PlayerTableTwo