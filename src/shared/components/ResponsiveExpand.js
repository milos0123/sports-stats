import * as React from 'react'
import expand_more from "../assets/expand_more.svg"
import expand_less from "../assets/expand_less.svg"

const ResponsiveExpand = ({ name, classImg, classSpan, isActive, isActiveHandler }) => {
    return (
        <span className={classSpan || ""}
            onClick={isActiveHandler}>
            {name} <img src={isActive
                ? `/${expand_less.split("/").pop()}`
                : `/${expand_more.split("/").pop()}`}
                className={classImg || ""} />
        </span >
    )
}

export default ResponsiveExpand