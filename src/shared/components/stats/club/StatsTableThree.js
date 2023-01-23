import * as React from 'react'

const StatsTableThree = ({ data }) => {
    return (
        <React.Fragment>
            {data?.map((elem, i) => {
                return <table className="club-stats">
                    <thead>
                        <tr key={`${i}_club-stats-tb3`}>
                            <th className='for'>{elem[0].at(0).toUpperCase().concat(elem[0].slice(1)).replaceAll("_", " ")}</th>
                            <th>Count</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elem[1][0].period?.map((el, i) => {
                            return <tr key={`${i}_club-stats-tb3-body`}>
                                <td className='name'>{el.minute}</td>
                                <td className='data'>{el.count}</td>
                                <td className='data'>{el.percentage} %</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            })}
        </React.Fragment>
    )
}

export default StatsTableThree