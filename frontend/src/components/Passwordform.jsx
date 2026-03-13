import React, { useState } from 'react'
import Lottie from 'lottie-react'
import edit from '../animation/edit.json'
import delet from '../animation/delete.json'
import { sendInfo } from '../services/api'

const Passwordform = () => {

    const list = [{ title: "Read", username: "bhagesh", password: "helloworld" }, { title: "Programing", username: "bhagesh niloor", password: "thisishellomydearhelloworld" }]
    const [password, setPassword] = useState({ title: "", username: "", password: "" })

    const handler = (e) => {
        setPassword({
            ...password, [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(password)
       const result = await sendInfo(password)
       console.log(result)
    }
    


    return (
        <>
            <div className="formdiv text-white p-5 w-full md:w-2/4 mx-auto">
                <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                    <input name='title' value={password.title} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Application Name' />
                    <input name='username' value={password.username} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Username' />
                    <input name='password' value={password.password} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Password' />
                    <button className='border rounded p-1' type='submit'>Add</button>
                </form>
            </div>
            <div className="w-full list text-white p-5">
                {list.map((items, index) => {
                    return (

                        <div className="flex justify-between my-2 gap-2 return border p-2 rounded-2xl" key={index}>
                            <div className='flex items-center break-all'>
                                {items.title}
                            </div>
                            <div className='flex items-center break-all'>
                                {items.username}
                            </div>
                            <div className='flex items-center break-all '>
                                {items.password}
                            </div>
                            <div className="icons my-auto">
                                <div className='h-8 w-7 shrink-0'>
                                    <Lottie animationData={edit} loop={true}></Lottie>
                                </div>
                                <div className='h-8 w-7 shrink-0'>
                                    <Lottie animationData={delet} loop={true}></Lottie>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Passwordform