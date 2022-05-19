import * as api from './api.js';


export const login = api.login
export const register = api.register
export const logout = api.logout

window.api = api

const endpoints = {
    createMeme: "/data/memes",
    memes: "/data/memes?sortBy=_createdOn%20desc",
    memeDetails: "/data/memes/",
    editMeme: "/data/memes/",
    delMeme: "/data/memes/",
    getProfil: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

}

export async function createMeme(data) {
   return api.post(endpoints.createMeme, data)
}

export async function getAll() {
   return api.get(endpoints.memes)
}

export async function memeDetails(id) {
  return  api.get(endpoints.memeDetails + id)
}

export async function edinMeme(id, data) {
    return api.put(endpoints.editMeme + id, data)
}

export async function deleteMeme(id) {
    api.del(endpoints.delMeme + id)
}

export async function getUserProfil(id) {
   return api.get(endpoints.getProfil(id))
}
