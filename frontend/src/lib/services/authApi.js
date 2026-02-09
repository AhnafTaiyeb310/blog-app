const BASE_URL = '/api/'

async function request(path, options={}) {
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...options,
    }
    try {
        const res = await fetch(BASE_URL + path, defaultOptions);
        const data = await res.json();

        if (!res.ok) {
            // Handle Django's object-based errors (e.g., { email: ["..."] })
            if (typeof data === 'object' && !data.detail) {
                const firstError = Object.values(data)[0];
                throw new Error(Array.isArray(firstError) ? firstError[0] : "Validation error");
            }
            throw new Error(data.detail || "Something went wrong");
        }

        return data;
    } catch (error) {
        console.error("API error: ", error.message);
        throw error;
    }
}

// generic http methods
export const apiGET = (path)=> request(path, {method: "GET",});
export const apiPOST = (path, body)=> request(path, {method:"POST", body: JSON.stringify(body)});
export const apiPUT = (path, body)=> request(path, {method:"PUT", body: JSON.stringify(body)});
export const apiDELETE = (path)=> request(path, {method: "DELETE",});

// Auth helpers
export const login = (data)=> apiPOST("auth/login", data);
export const signup = (data)=> apiPOST("auth/signup", data);
export const logout = ()=> apiPOST("auth/logout");
export const getProfile = ()=> apiGET("auth/me");
