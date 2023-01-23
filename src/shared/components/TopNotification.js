import * as React from 'react'
import close from '../assets/close.svg'

const TopNotification = ({ data, notifHandler }) => {
    const closeNotif = () => {
        notifHandler("")
    }
    const modifData = data.replaceAll(/"/g, "").replace("be [ref:", "match ").replaceAll("]", "");
    return (
        <div className={modifData.includes("200") ? "notif-success" : 'notif'}>
            <h3>{`${modifData.slice(7).at(0).toUpperCase()
                .concat(modifData.slice(8, modifData.length - 4))}!`}</h3>
            <img src={`/${close.split("/").pop()}`}
                onClick={closeNotif} />
        </div>
    )
}

export default TopNotification