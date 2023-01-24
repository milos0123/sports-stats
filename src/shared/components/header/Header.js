import * as React from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../auth/auth-context";
import HeaderUserInfo from './HeaderUserInfo'
import SportsNavigation from './SportsNavigation'
import ResponsiveExpand from '../ResponsiveExpand'


const Header = () => {
    const location = useLocation()
    const ctx = React.useContext(AuthContext)
    const [isActiveHead, setIsActiveHead] = React.useState(false)

    React.useEffect(async () => {
        const response = await fetch('/getUser')
        const user = await response.json()
        if (response.ok) {
            ctx.logginUser(user)
        }
    }, [])

    const isActiveHeadHandler = () => {
        setIsActiveHead((prevState) => {
            return !prevState
        })
    }

    return (
        <nav className={location.pathname.split("/").includes("user") ? "none" : "header"}>
            <div className="headline">
                <h1>SPORTS-STATS</h1>
            </div>
            <div className="navigation">
                <HeaderUserInfo />
                <ResponsiveExpand name={"SPORTS"} classImg={"filter-white"}
                    classSpan={"header-expand"}
                    isActive={isActiveHead}
                    isActiveHandler={isActiveHeadHandler} />
                <SportsNavigation />
            </div>

        </nav>
    );
}

export default Header