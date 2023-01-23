import * as React from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../auth/auth-context';

const LoginForm = ({ notifHandler }) => {
    const loginEmailRef = React.useRef()
    const loginPasswordRef = React.useRef()
    const ctx = React.useContext(AuthContext)
    const navigation = useNavigate()

    const loginFormHandler = async (event) => {
        event.preventDefault()
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginEmailRef.current.value,
                password: loginPasswordRef.current.value,
            })
        })
        if (!response.ok) {
            try {
                const data = await response.json()
                notifHandler(data)
            } catch (e) {
                notifHandler('.......Incorrect username or password....')
            }
        } else {
            const data = await response.json()
            ctx.logginUser(data)
            notifHandler("")
            navigation('/soccer/league/Superliga/19686', { replace: true })
        }
    }
    
    return (
        <form className="form">
            <input id="e-mail"
                type="email"
                ref={loginEmailRef}
                placeholder=" E-mail:"
                className='input' />
            <input id="logPassword"
                type="password"
                ref={loginPasswordRef}
                placeholder=" Password:"
                className='input' />
            <button
                className='formBtn'
                onClick={loginFormHandler}>Login</button>
            <span>OR</span>
            <a
                href="/auth/google"
                role="button"
                className='googleBtn'>
                Continue with&nbsp;
                <img
                    className="googleBtnImg"
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />oogle
            </a>
        </form>
    )
}

export default LoginForm