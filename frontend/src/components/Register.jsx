import React, { useState } from 'react'
import { Registerfunction } from '../services/api'
function Register({ setisFlipped, isFlipped }) {

    const [registerData ,setregisterData] = useState({name:'',email:'',password:''})

    const handler=(e)=>{
        setregisterData({
            ...registerData,[e.target.name]:e.target.value
        })
    }

    const RegistrationSubmit =async ()=>{
        console.log(registerData)
        const res = await Registerfunction(registerData)
        console.log(res)
        setregisterData({name:"",email:"",password:""})
    }



    return (
        <div className='flex justify-around items-center h-screen'>
            <div className="text-white flex justify-center gap-10 flex-col items-center p-5 login border border-blue-400 md:w-2/8 rounded-4xl ">
                <form onSubmit={(e) => { e.preventDefault(); RegistrationSubmit(); }}>
                    <div className="heading flex justify-center">
                        <h1 className='font-bold text-3xl '>Register</h1>
                    </div>
                    <div className="inputs flex flex-col gap-5">
                        <div className="name w-full p-1">
                            <input name='name' value={registerData.name} onChange={handler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Name' />
                        </div>
                        <div className="email w-full p-1">
                            <input name='email' value={registerData.email} onChange={handler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Email' />
                        </div>
                        <div className="password w-full p-1">
                            <input name='password' value={registerData.password} onChange={handler} className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter password' />
                        </div>
                    </div>
                    <button className='border sm:w-[300px] w-[200px] border-blue-400 p-2 rounded-2xl md:w-75' type='submit'>Register</button>
                </form>
                <div className="signin">
                    <h4>Already have an account → <button className='cursor-pointer text-blue-500' onClick={() => setisFlipped(!isFlipped)}>Log in</button></h4>
                </div>
            </div>
        </div>
    )
}

export default Register
