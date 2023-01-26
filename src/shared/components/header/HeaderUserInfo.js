import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../auth/auth-context";
import person from '../../assets/person.svg'

const HeaderUserInfo = () => {
    const navigation = useNavigate()
    const [isLogoutSent, setIsLogoutSent] = React.useState(false)
    const ctx = React.useContext(AuthContext)

    const isLogoutSentHandler = (bool) => {
        setIsLogoutSent(bool)
    }
    const userLogoutHandler = async () => {
        isLogoutSentHandler(true)
        const response = await fetch('/logout', {
            method: "POST"
        })
        if (response.ok) {
            ctx.loggoutUser()
            isLogoutSentHandler(false)
            navigation('/user/register', { replace: true })
        }
    }

    // console.log("ctx from HEADER:::", ctx)

    return (
        <div className="user-info">
            <div>
                <span>
                    <img src={`/${person.split("/").pop()}`}
                        className="header-user-svg" />
                    <span> {ctx.username?.slice(0, ctx.username?.indexOf("@"))
                    }</span>
                </span>
                {isLogoutSent
                    ? <div className="lds-dual-ring-logout"></div>
                    : <button onClick={userLogoutHandler}>Logout</button>}
            </div>
        </div>
    )
}

export default HeaderUserInfo