import * as React from 'react'
import expand_more from "../assets/expand_more.svg"
import expand_less from "../assets/expand_less.svg"

const ResponsiveExpand = ({ name, classImg, classSpan, isActive, isActiveHandler }) => {
    return (
        <React.Fragment>
            <input id={name} onClick={isActiveHandler} type="checkbox" hidden
                checked={isActive
                    ? true
                    : false}
                readOnly={true} />
            <label htmlFor={name}
                className={classSpan || ""}
            >{name} <img src={isActive
                ? `/${expand_less.split("/").pop()}`
                : `/${expand_more.split("/").pop()}`}
                className={classImg || ""} /></label>
        </React.Fragment>
    )
}

export default ResponsiveExpand