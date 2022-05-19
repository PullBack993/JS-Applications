const postBtn = document.querySelector('.public').addEventListener('click', createPost)
document.querySelector('.cancel').addEventListener('click', clearField)


getAllTopics()
let titleId = null


async function createPost(e) {
    const title = document.getElementById('topicName').value
    const userName = document.getElementById('username').value
    const postText = document.getElementById('postText').value
    let now = new Date();
    e.preventDefault()
    if (!title || !userName || !postText){
        return alert('Please fill all fields')
    }
    const res = await postTopic(title, userName, postText, now)
    const data = await res.json()
    const topic = createTopic(data)
    document.querySelector('.topic-container').appendChild(topic)
    const allTopic = document.querySelectorAll('.normal')
    allTopic.forEach(e => {
        e.addEventListener('click', topicDetails)
    });   
    
    
}

async function getAllTopics(){
    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts")
    let data = await res.json()
    const container = document.querySelector('.topic-container')
    Object.values(data).forEach(e => container.appendChild(createTopic(e)))
    const allTopic = document.querySelectorAll('.normal')
    allTopic.forEach(e => {
        e.addEventListener('click', topicDetails)
    });   
}
async function topicDetails(e){
    e.preventDefault()
    document.getElementById('topic').innerHTML = ''
    titleId = e.target.parentElement.id
    const data = await getCurrentTopic(titleId)
    showTopic(data)
}

async function show(){
    const data = await getCurrentTopic(titleId)
    showTopic(data)

}

async function refresh(){
    const allComments = await getComments(titleId)
    if (allComments){
        filterComments(allComments, titleId)
    }
}
function showComments(data){
    const div = document.createElement('div')
    div.className = 'user-comment'
    div.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <p><strong>${data.name}</strong> commented on <time>${data.time}</time></p>
            <div class="post-content">
                <p>${data.comments}</p>
            </div>
        </div>
    </div>`
    return div

}
function filterComments(comments, id){
    for (const comment in Object.values(comments)) {
        if (Object.values(comments)[comment].id === id) {
            document.getElementById('topic')
            .appendChild(showComments(Object.values(comments)[comment]))
        }
        
    }
}
async function showTopic(data){
    const div = document.createElement('div')
    div.className = 'comment'
    div.innerHTML =
    `<div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${data.userName}</span> posted on <time>${data.now.slice(0, -5)}</time></p>

        <p class="post-content">${data.postText}</p>
    </div>`
   
    const topicField = document.getElementById('topic')
    topicField.replaceChildren(div)
    const allComments = await getComments()
    if (Object.values(allComments).length > 0){
        filterComments(allComments, titleId)
    }
    topicField.appendChild(showCommentsPanel())
    if (document.querySelector('.container')){
         document.querySelector('.container').remove()

    }
    document.querySelector('form > button').addEventListener('click', creatComent)

}
function showCommentsPanel(){
    const div = document.createElement('div')
    div.className = 'answer-comment'
    div.innerHTML = `
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>`
    return div
}
async function creatComent(e){
    e.preventDefault()
    let now = new Date();
    const commentField = document.querySelector('#comment').value
    const userName = document.querySelector('#username').value
    postComments(commentField, userName, titleId, now)
    show()

}
async function postComments(comments, name, id, time){
    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments, name, id, time}),
      });
      if (res.ok == false){
          return alert("Error")
      }
} 


function clearField(){
    e.preventDefault()
    title.textContent = ''
    userName.textContent = ''
    postText.textContent = ''
}


function createTopic(data){
    const div = document.createElement('div')
    div.className = 'topic-container'
    div.innerHTML = `<div class="topic-name-wrapper">
    <div class="topic-name" >
        <a href="#" class="normal" id=${data._id}>
            <h2>${data.title}</h2>
        </a>
        <div class="columns ">
            <div>
                <p>Date: <time>${data.now.slice(0, -5)} </time></p>
                <div class="nick-name">
                    <p>Username: <span>${data.userName}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`

    return div
}

async function postTopic(title, userName, postText, now){
    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userName, postText,now}),
      });
      if (res.ok == false){
          return alert("Error")
      }
    return res
} 

async function getCurrentTopic (id){
    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`)
    const data = await res.json()
    return data
}


async function getComments (){
    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`)
    const data = await res.json()
    return data

    
}