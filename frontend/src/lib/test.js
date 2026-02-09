const AUTH_URL = "/api/";
const DJANGO_URL = "http://127.0.0.1:8000/"

export async function request(URL, path, options= {}) {
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        credential: "include",
        ...options,
    }

    const res = await fetch(URL + path, options)
    const data = await res.json();

    if(!res.ok)
        throw new Error(data.detail || "something went wrong");

    return data;
}

// http methods
export const apiGET = (body)=> request()