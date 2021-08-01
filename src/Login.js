import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {
    const [{},dispatch]=useStateValue()
    const signIn = () => {
        // alert('Signing in...')
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch((error)=>{ alert(error.message)
        console.log(error.message)
})

    }
    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login