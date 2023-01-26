import * as React from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../auth/auth-context';

const LoginForm = ({ notifHandler, sendLoginRepos }) => {
    const [isFormSent, setIsFormSent] = React.useState(false)
    const loginEmailRef = React.useRef()
    const loginPasswordRef = React.useRef()
    const ctx = React.useContext(AuthContext)
    const navigation = useNavigate()
    const formSentHandler = (bool) => {
        setIsFormSent(bool)
    }

    const loginFormHandler = async (event) => {
        event.preventDefault()
        formSentHandler(true)
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
                formSentHandler(false)
                notifHandler(data)
            } catch (e) {
                formSentHandler(false)
                notifHandler('.......Incorrect username or password....')
            }
        } else {
            const data = await response.json()
            const { nationsData, clubsData, username } = data
            // console.log("logindata client:::", data)
            ctx.logginUser(username)
            sendLoginRepos({ nationsData, clubsData })
            notifHandler("")
            formSentHandler(false)
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
            {isFormSent
                ? <div className="lds-dual-ring-form"></div>
                : <React.Fragment>
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
                </React.Fragment>}
        </form>
    )
}

export default LoginForm