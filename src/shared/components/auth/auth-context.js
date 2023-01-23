import * as React from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    username: "",
    logginUser: () => { },
    loggoutUser: () => { },
})

export default AuthContext;