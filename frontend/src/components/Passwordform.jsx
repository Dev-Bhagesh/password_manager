import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import edit from '../animation/edit.json'
import delet from '../animation/delete.json'
import eye from '../animation/Eye.json'
import { sendPassowrd } from '../services/api'
import { GetPasswords } from '../services/api'
import {UpdatePassword} from '../services/api'

const Passwordform = () => {

    const [refresh, setRefresh] = useState(false)
    const [password, setPassword] = useState({ title: "", username: "", password: "" })
    const [passList, setPassList] = useState([])
    const [visiblility, setVisibility] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editingID,setEditingID] = useState({_id:"",title:"",username:"",password:""})

    
    // Fetch password from db
    useEffect(() => {
        const fetchData = async () => {
            let list = await GetPasswords()
            setPassList(list)
        }
        fetchData()
    },[refresh])
    
    // Focus on input fields
    const handler = (e) => {
        setPassword({
            ...password, [e.target.name]: e.target.value
        })
    }
    
    // Set password and send to db
    const submitHandler = async (e) => {
        e.preventDefault()
        
        if (password.title && password.username && password.password) {
            console.log(password)
            const result = await sendPassowrd(password)
            console.log(result)
            alert("Password Saved")
            setPassword({ title: "", username: "", password: "" })
            setRefresh(prev=>!prev)
        } else {
            alert("Fill all the Details")
            setPassword({ title: "", username: "", password: "" })
        }
    }
    
    // password visiblity
    const togglePassword = (index) => {
        setVisibility(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    // Editing password
    const handleEdit = (index) => {
        const editingPassword = passList[index]
        setPassword({
            title: editingPassword.title,
            username:editingPassword.username,
            password:editingPassword.password
        })
        setIsEditing(true)
        setEditingID({
            _id:editingPassword._id,
            title:editingPassword.title,
            username:editingPassword.username,
            password:editingPassword.password
        })
    }

    const saveEdit=async ()=>{
        const updatedData = {
            _id: editingID._id,
            ...password
        }
    
        const updated = await UpdatePassword(updatedData)
    
        if(updated){
            alert("Edit successful")
    
            const list = await GetPasswords()
            setPassList(list)
    
            setIsEditing(false)
            setPassword({ title:"", username:"", password:"" })
        }
        setRefresh(prev=>!prev)
    }

    const deletePassword = async (items)=>{
        const _id = items._id
        const title = items.title
        const password = items.password
        const username = items.username
        alert(`${_id} ${title} ${password} ${username}`) 
    }



    return (
        <>
            <div className="formdiv text-white p-5 w-full md:w-2/4 mx-auto">
                <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                    <input name='title' value={password.title} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Application Name' />
                    <input name='username' value={password.username} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Username' />
                    <input name='password' value={password.password} onChange={handler} className='w-full border p-2 rounded-2xl' type="text" placeholder='Enter Password' />
                    {isEditing === false ? (
            <button className='border rounded p-1' type='submit'>Add</button>
        ) : (
            <button className='border rounded p-1' type='button' onClick={()=>saveEdit()}>Save Edit</button>
        )}
                </form>
            </div>
            <div className="w-full list text-white p-5">
                {passList.map((items, index) => {
                    return (
                        <div className="flex justify-between my-2 gap-2 return border p-2 rounded-2xl" key={index}>
                            {/* <div>
                                {items._id}
                            </div> */}
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
                                <button onClick={() => togglePassword(index)}>
                                    <div className="h-8 w-7 shrink-0">
                                        <Lottie animationData={eye} loop={true}></Lottie>
                                    </div>
                                </button>
                            </div>
                            <div className="icons my-auto">
                                <div className='h-8 w-7 shrink-0'>
                                    <button onClick={()=>handleEdit(index)}>
                                        <Lottie animationData={edit} loop={true}></Lottie>
                                    </button>
                                </div>
                                <div className='h-8 w-7 shrink-0'>
                                    <button onClick={()=>deletePassword(items)}>
                                        <Lottie animationData={delet} loop={true}></Lottie>
                                    </button>
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