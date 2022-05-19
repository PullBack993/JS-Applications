import {detailMovie} from './dom.js'

export let movieId = ''

export async function showDetail(id){
    const requests = [
        fetch(`http://localhost:3030/data/movies/${id}`),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    ]
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if(userData != null){
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`))
    }
    const [movieRes, likeRes, hasLikedRes] = await Promise.all(requests)
    const [movieData, likesData, hasLiked] = await Promise.all([
        movieRes.json(), 
        likeRes.json(),
        hasLikedRes && hasLikedRes.json(),
    ])
    movieId = movieData._id

   detailMovie(movieData, likesData,hasLiked)
}