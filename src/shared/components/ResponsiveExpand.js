import * as React from 'react'
import expand_more from "../../assets/expand_more.svg"

const ResponsiveExpand = ({ name, classImg, classSpan }) => {
    return (
        <span className={classSpan || ""} >
            {name} <img src={`/${expand_more.split("/").pop()}`} className={classImg || ""} />
        </span >
    )
}

export default ResponsiveExpand