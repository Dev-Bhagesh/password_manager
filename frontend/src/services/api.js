const VITE_API_URL = import.meta.env.VITE_API_URL
export async function sendPassowrd(params) {
    let a = await fetch(`${VITE_API_URL}/putpasswords`,{
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
    let passwords = await fetch(`${VITE_API_URL}/getpasswords`,{credentials: "include"})
    return passwords.json()
}

export async function UpdatePassword(params) {
    let udatedPassword = await fetch(`${VITE_API_URL}/updatepassword`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(params)
    })
    return udatedPassword.json()
}

export async function Registerfunction(params) {
    let registration = await fetch(`${VITE_API_URL}/register`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    })
    return registration.json()
}

export async function Loginfunction(params) {
    console.log(import.meta.env.VITE_API_URL)
    let login = await fetch(`${VITE_API_URL}/login`,{
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
    let res = await fetch(`${VITE_API_URL}/deletepassword/${id}`, {
        method: "DELETE",
        credentials: "include" // 🔥 required for session
    })
    return res.json()
}