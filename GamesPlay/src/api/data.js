import * as api from './api.js';

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function createGame(data){
    return api.post('/data/games', data);
}
export async function getAll(){
    return api.get('/data/games?sortBy=_createdOn%20desc');   
}

export async function getNew() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}
export async function getById(id){
    return api.get('/data/games/' + id);
}
export async function editGame(id, data){
    return api.put('/data/games/' + id, data);
}
export async function deleteById(id){
    return api.del('/data/games/' + id)
}

export async function getComments(gameId){
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function creatComment(data) {
    return api.post('/data/comments', data)
}
