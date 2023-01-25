import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../auth/auth-context";
import person from '../../assets/person.svg'

const HeaderUserInfo = () => {
    const navigation = useNavigate()
    const ctx = React.useContext(AuthContext)

    const userLogoutHandler = async () => {
        const response = await fetch('/logout', {
            method: "POST"
        })
        const data = await response.json()
        if (response.ok) {
            ctx.loggoutUser()
            navigation('/user/register', { replace: true })
        }
    }

    return (
        <div className="user-info">
            <div>
                <span>
                    <img src={`/${person.split("/").pop()}`}
                        className="header-user-svg" />
                    <span> {ctx.username.slice(0, ctx.username.indexOf("@"))
                    }</span>
                </span>
                <button onClick={userLogoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default HeaderUserInfo