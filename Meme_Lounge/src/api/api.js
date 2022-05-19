import { notify } from '../views/notify.js';

const host = 'http://localhost:3030'

async function request(url,options) {
    try{
        const response = await fetch(host + url,options); //host --> constant, url --> privet, option --> object to create request 

        if (response.ok == false){
            if(response.status == 403){
                sessionStorage.removeItem('userData')
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json()
        } catch (err){
            return response;      
        }
      

    }catch(err){
        notify(err.message)
        throw err
    }
    
}

function createOptions(method = 'get',data){
    const options = {
        method,
        headers: {}
    }
    if (data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData != null){
        options.headers['X-Authorization'] = userData.token
    }
    return options;
}

export async function get(url){
    return request(url, createOptions())
}

export async function post(url,data){
    return request(url, createOptions('post', data));
}

export async function put(url, data){
    return request(url, createOptions('put', data));
}

export async function del(url){
    return request(url, createOptions('delete'))
}

export async function login(email,password){
    const result = await post('/users/login', {email, password})

    const userData = {
        username: result.username,
        email: result.email,
        gender: result.gender,
        id: result._id,
        token: result.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData))
    return result
}

export async function register(username,email,password,gender){
    const result = await post('/users/register', {username, email, password, gender})

    const userData = {
        username: result.username,
        email:result.email,
        gender: result.gender,
        id: result._id,
        token: result.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData))
    return result
}

export async function logout(){
    await get('/users/logout');
    sessionStorage.removeItem('userData');
    
}