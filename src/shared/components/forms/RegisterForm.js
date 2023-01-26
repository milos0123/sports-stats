import * as React from 'react'

const RegisterForm = (props) => {
    const registerPasswordRef = React.useRef()
    const registerEmailRef = React.useRef()
    const repeatPasswordRef = React.useRef()
    const [isRegFormSent, setIsRegFormSent] = React.useState(false)

    const isRegFormSentHandler = (bool) => {
        setIsRegFormSent(bool)
    }

    const registerFormHandler = async (event) => {
        event.preventDefault()
        isRegFormSentHandler(true)
        const response = await fetch('/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: registerEmailRef.current.value,
                password: registerPasswordRef.current.value,
                repeatPassword: repeatPasswordRef.current.value,
            })
        })
        if (!response.ok) {
            try {
                const data = await response.json()
                isRegFormSentHandler(false)
                props.notifHandler(data)
            } catch (e) {
                isRegFormSentHandler(false)
                props.notifHandler('.......Something went wrong, please conntact us if you keep seeing this message....')
            }
        } else {
            const data = await response.json()
            isRegFormSentHandler(false)
            props.notifHandler(data)
        }
    }

    return (
        <form className="form">
            <input id="reg-E-mail"
                type="email"
                ref={registerEmailRef}
                placeholder=" E-mail:"
                className='input' />
            <input id="password"
                type="password"
                ref={registerPasswordRef}
                placeholder=" Password:"
                className='input' />
            <input id="repeatPassword"
                type="password"
                ref={repeatPasswordRef}
                placeholder=" Repeat password:"
                className='input' />
            {isRegFormSent
                ? <div className="lds-dual-ring-form"></div>
                : <React.Fragment>
                    <button
                        className='formBtn'
                        onClick={registerFormHandler}>Register</button>
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

export default RegisterForm