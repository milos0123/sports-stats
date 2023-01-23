import * as React from 'react'

const StatsTableFour = ({ goalLineData }) => {
    return (
        <React.Fragment>
            {Object.entries(goalLineData[1])?.map((elem, i) => {
                return <table className="club-stats">
                    <thead>
                        <tr key={`${i}_club-stats-tb4`}>
                            <th className='for'>{"Goal line " + elem[0]}</th>
                            <th>Home</th>
                            <th>Away</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(elem[1])?.map((el, i) => {
                            return <tr key={`${i}_club-stats-tb4-body`}>
                                <td className='name'>{el[0].replace("_", ".")}</td>
                                <td className='data'>{el[1].home} %</td>
                                <td className='data'>{el[1].away} %</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            })}
        </React.Fragment>
    )
}

export default StatsTableFour