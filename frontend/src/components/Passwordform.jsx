import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import edit from '../animation/edit.json'
import delet from '../animation/delete.json'
import eye from '../animation/Eye.json'
import { sendPassowrd } from '../services/api'
import { GetPasswords } from '../services/api'

const Passwordform = () => {

    // const list = [{ title: "Read", username: "bhagesh", password: "helloworld" }, { title: "Programing", username: "bhagesh niloor", password: "thisishellomydearhelloworld" }]

    const [password, setPassword] = useState({ title: "", username: "", password: "" })
    const [passList, setPassList] = useState([])
    const [visiblility, setVisibility] = useState({})

    const togglePassword = (index) => {
        setVisibility(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            let list = await GetPasswords()
            setPassList(list)
        }
        fetchData()
    }, [])


    const handler = (e) => {
        setPassword({
            ...password, [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password.title && password.username && password.password) {
            console.log(password)
            const result = await sendPassowrd(password)
            console.log(result)
            alert("Password Saved")
            setPassword({ title: "", username: "", password: "" })
        } else {
            alert("Fill all the Details")
            setPassword({ title: "", username: "", password: "" })
        }
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
                {passList.map((items, index) => {
                    return (

                        <div className="flex justify-between my-2 gap-2 return border p-2 rounded-2xl" key={index}>
                            <div className='flex items-center break-all'>
                                {items.title}
                            </div>
                            <div className='flex items-center break-all'>
                                {items.username}
                            </div>
                            <div className='flex items-center break-all gap-2'>
                                <div className="password mx-auto">
                                {visiblility[index] ? items.password : "••••••••"}
                                </div>
                                <button onClick={()=>togglePassword(index)}>
                                    <div className="h-8 w-7 shrink-0">
                                        <Lottie animationData={eye} loop={true}></Lottie>
                                    </div>
                                </button>
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