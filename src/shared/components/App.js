import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Header from './header/Header'
import AuthProvider from './auth/AuthProvider'
import TopNotification from './TopNotification'
import "./styles.css";

const App = ({ serverData, notif }) => {
    const location = useLocation()
    const [notification, setNotification] = React.useState(() => {
        return __isBrowser__
            ? window.__INITIAL_NOTIF__
            : notif || ""
    })
    
    const notifHandler = (data) => {
        setNotification(data)
    }

    return (
        <AuthProvider>
            {notification.length > 0 && <TopNotification notifHandler={notifHandler} data={notification} />}
            <div className={location.pathname.split("/").includes("user") ? "home-bg" : "user-bg"}>
                <Header />
                {/* Routes path must match with routes.js so server match browser */}
                <Routes>
                    <Route
                        key="home"
                        path="/user/*"
                        element={<Home notifHandler={notifHandler} />}
                    />
                    <Route
                        key="league"
                        path="/soccer/*"
                        element={<Main data={serverData} />}
                    />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </div>
        </AuthProvider >
    );
};

export default App