import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Navigate } from 'react-router-dom'
import { login } from '../redux/actions/userActions'

export const Login = () => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(()=> {

    }, [userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    if(userInfo) {
        return(
            <Navigate to={'/dashboard'}  />
        )
    } else {
        
    
    
        return (  
            <div className='login-page-container'> 
                <div className='form-container'>
                    <div className="side-box">
                        <h1 className='side-box__title'>DON'T HAVE AN ACCOUNT YET?</h1>
                        <div className="sign-up-btn">
                            <NavLink className='form-link' to={'/sign_up'}>Sign up</NavLink>
                        </div>
                    </div>
                    <div className="form-box">

                        <h1 className='form-title'>WELCOME</h1>

                        <div className="inputs-container">
                            <div className="input-wrapper">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder='Your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="btn-container">
                                <button
                                    type='submit'
                                    className='form-btn'
                                    onClick={handleSubmit}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
