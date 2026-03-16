import React from 'react'

function Register({setisFlipped,isFlipped}) {

    return (
        <div className='flex justify-around items-center h-screen'>
            <div className="text-white flex justify-center gap-10 flex-col items-center p-5 login border border-blue-400 md:w-2/8 rounded-4xl ">
                <div className="heading">
                    <h1 className='font-bold text-3xl '>Register</h1>
                </div>
                <div className="inputs flex flex-col gap-5">
                    <div className="email w-full p-1">
                        <input className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Name' />
                    </div>
                    <div className="email w-full p-1">
                        <input className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter Email' />
                    </div>
                    <div className="password w-full p-1">
                        <input className='border p-2 md:w-[300px] sm:w-[100px] rounded-3xl ' type="text" placeholder='Enter password' />
                    </div>
                </div>
                <button className='border sm:w-[300px] w-[200px] border-blue-400 p-2 rounded-2xl md:w-75'>Log In</button>
                <div className="signin">
                    <h4>Already have an account → <button className='cursor-pointer text-blue-500' onClick={() => setisFlipped(!isFlipped)}>Log in</button></h4>
                </div>
            </div>
        </div>
    )
}

export default Register
