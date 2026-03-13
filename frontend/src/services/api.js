const VITE_API_URL = import.meta.env.VITE_API_URL
export async function sendInfo(params) {
    let a = await fetch(`${VITE_API_URL}/p`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    })
    return a.json()
}