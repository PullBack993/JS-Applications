import * as api from './api.js';

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function create(data){
    return api.post('/data/books', data);
}
// export async function getAll(){
//     return api.get('/data/games?sortBy=_createdOn%20desc');   
// }

export async function getBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc')
}

export async function getByUserId(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getById(id){
    return api.get('/data/books/' + id);
}

export async function editGame(id, data){
    return api.put('/data/books/' + id, data)
}
export async function deleteById(id){
    return api.del('/data/books/' + id)
}

export async function addLike(data) {
    return api.post('/data/likes', data)
}

export async function totalLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function userLikes(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}