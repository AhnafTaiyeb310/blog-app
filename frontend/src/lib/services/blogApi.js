const BASE_URL = "http://127.0.0.1:8000/"

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

        if (!res.ok)
            throw new Error(data.detail || "Something went wrong");

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

// blog specific helpers
export const getPosts = ()=> apiGET("posts");
export const getPost = (id)=> apiGET(`posts/${id}`);
export const createPost = (data)=> apiPOST("posts", data)
export const updatePost = (id,data)=> apiPUT(`posts/${id}`, data)
export const deletePost = (id)=> apiDELETE(`posts/${id}`);

export const getComments = ()=> apiGET("comments");
export const getComment = (id)=> apiGET(`comments/${id}`);
export const createComment = (data)=> apiPOST("comments", data);
export const updateComment = (id,data)=> apiPUT(`comments/${id}`, data);
export const deleteComment = (id)=> apiDELETE(`comments/${id}`);

