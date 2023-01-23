import * as React from 'react'
import AuthContext from "./auth-context"

const defaultAuthState = {
    isLoggedIn: false,
    username: "",
}

const authReducer = (state, action) => {
    if (action.type === 'LOGGIN') {
        return {
            isLoggedIn: true,
            username: action.username,
        }
    }
    if (action.type === 'LOGGOUT') {
        return {
            isLoggedIn: false,
            username: "",
        }
    }
    return defaultAuthState
}

const AuthProvider = props => {
    const [authState, dispatchAuthAction] = React.useReducer(authReducer, defaultAuthState);
    
    const logginHandler = (username) => {
        dispatchAuthAction({ type: 'LOGGIN', username })
    }

    const loggoutHandler = () => {
        dispatchAuthAction({ type: 'LOGGOUT' })
    }

    const authContext = {
        isLoggedIn: authState.isLoggedIn,
        username: authState.username,
        logginUser: logginHandler,
        loggoutUser: loggoutHandler
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider