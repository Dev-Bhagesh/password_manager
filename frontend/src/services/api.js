const VITE_API_URL = import.meta.env.VITE_API_URL
export async function sendPassowrd(params) {
    let a = await fetch(`https://password-manager-nxb2.onrender.com/putpasswords`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params),
        credentials: "include"
    })
    return a.json()
}

export async function GetPasswords() {
    let passwords = await fetch(`https://password-manager-nxb2.onrender.com/getpasswords`,{credentials: "include"})
    return passwords.json()
}

export async function UpdatePassword(params) {
    let udatedPassword = await fetch(`https://password-manager-nxb2.onrender.com/updatepassword`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(params)
    })
    return udatedPassword.json()
}

export async function Registerfunction(params) {
    let registration = await fetch(`https://password-manager-nxb2.onrender.com/register`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    })
    return registration.json()
}

export async function Loginfunction(params) {
    let login = await fetch(`https://password-manager-nxb2.onrender.com/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params),
        credentials: "include"
    })
    return login.json()
}

export async function DeletePassword(id) {
    let res = await fetch(`https://password-manager-nxb2.onrender.com/deletepassword/${id}`, {
        method: "DELETE",
        credentials: "include" // 🔥 required for session
    })
    return res.json()
}