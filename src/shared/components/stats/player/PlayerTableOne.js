import * as React from 'react'

const PlayerTableOne = ({ data }) => {
    return (
        <table className="club-stats">
            <thead>
                <tr key="pltbl1" >
                    <th className='for'>Statistics</th>
                    <th className='head-one'>#</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((el, i) => {
                    return <tr key={`${i}_pltb1`}>
                        <td className='name'>{el[0].at(0).toUpperCase().concat(el[0].slice(1)).replaceAll("_", " ")}</td>
                        <td className='data'>{el[1] === true && 'YES'
                            || el[1] === false && "NO"
                            || el[1] === null && "0"
                            || el[1]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default PlayerTableOne