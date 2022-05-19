import * as api from './api.js';

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function createCar(data){
    return api.post('/data/cars', data);
}

export async function getAll(){
    return api.get('/data/cars?sortBy=_createdOn%20desc');   
}

export async function getNew() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}
export async function getById(id){
    return api.get('/data/cars/' + id);
}

export async function getMyCars(userId) {
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function edit(id, data){
    return api.put('/data/cars/' + id,data)
}
export async function deleteById(id){
    return api.del('/data/cars/' + id)
}

export async function getComments(gameId){
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function creatComment(data) {
    return api.post('/data/comments', data)
}

export async function seacrh(query) {
    return api.get(`/data/cars?where=year%3D${query}`)
}