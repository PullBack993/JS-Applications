import * as api from './api.js';

export const login = api.login
export const register = api.register
export const logout = api.logout

const endpoints = {
    all: '/data/catalog',
    byId: '/data/catalog',
    myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog',
    delete: '/data/catalog',

}

export async function createFurniture(data){
    return api.post('/data/catalog', data);
}
export async function getAll(){
    return api.get('/data/catalog');
}
export async function furnitureDetail(id){
    return api.get('/data/catalog/' + id);
}
export async function editFurniture(id, data){
    return api.put('/data/catalog/' + id,data)
}
export async function deleteById(id){
    return api.del('/data/catalog/' + id)
}

export async function myFurniture(userId){
    return api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}