import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import {auth, provider} from '../firebase'

function Login() {

    const signIn = () => {
        //google login functionality (remember it is listen by auth.onAuthStateChanged)
        auth.signInWithPopup(provider)
        .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png" alt=""/>
            </div>
            <Button type="submit" onClick={signIn}>
                Sign In
            </Button>
        </div>
    )
}

export default Login
