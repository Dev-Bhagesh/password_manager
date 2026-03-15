const VITE_API_URL = import.meta.env.VITE_API_URL
export async function sendPassowrd(params) {
    let a = await fetch(`${VITE_API_URL}/putpasswords`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    })
    return a.json()
}

export async function GetPasswords() {
    let passwords = await fetch(`${VITE_API_URL}/getpasswords`)
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