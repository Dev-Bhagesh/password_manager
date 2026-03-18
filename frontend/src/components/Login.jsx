import React from 'react'
import { useState, useEffect } from 'react'
import Register from './Register'
import { Loginfunction } from '../services/api'
import { useNavigate } from "react-router-dom"

function Login() {
    const [isFlipped, setisFlipped] = useState(false)
    const [userID, setUserID] = useState('')
    const [loginData, setLoginData] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate()

    const LoginHandler = async () => {
        const res = await Loginfunction(loginData)
        console.log(`${res.userID} ${res.success} this is the returned data`)
        if (res.success === true) {
            navigate('/dashboard')
        }
        console.log(`${res} this is the returned data 2`)
        setUserID(res.userID)
    }

    const changeHandler = (e) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        })
    }
    return (
        <>
            {isFlipped ? <Register setisFlipped={setisFlipped} isFlipped={isFlipped} /> :
                <div className='flex justify-around items-center h-screen perspective'>

                    <div className="text-white flex justify-center gap-10 flex-col items-center p-5 login border border-blue-400 md:w-2/8 md:h-95 rounded-4xl ">
                        <div className="heading">
                            <h1 className='font-bold text-3xl '>Log In</h1>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            LoginHandler()
                        }}>
                            <div className="inputs flex flex-col gap-5">
                                <div className="Name w-full p-1">
                                    <input name='name' value={loginData.name} onChange={changeHandler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Name' />
                                </div>
                                <div className="email w-full p-1">
                                    <input name='email' value={loginData.email} onChange={changeHandler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Email' />
                                </div>
                                <div className="password w-full p-1">
                                    <input name='password' value={loginData.password} onChange={changeHandler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter password' />
                                </div>
                            </div>
                            <button className='border sm:w-[300px] w-[200px] border-blue-400 p-2 rounded-2xl md:w-75'>Log In</button>
                            <div className="signin">
                                <h4>Don't have an account → <button className='cursor-pointer text-blue-500' onClick={() => setisFlipped(!isFlipped)}>Sign up</button></h4>
                            </div>
                        </form>
                    </div>
                </div >
            }
        </>
    )
}

export default Login
