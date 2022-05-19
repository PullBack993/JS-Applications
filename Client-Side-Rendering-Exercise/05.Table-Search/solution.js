import {html, render} from '../node_modules/lit-html/lit-html.js'

document.querySelector('#searchBtn').addEventListener('click', onClick);
const inputField = document.querySelector('#searchField');
let students
const student = (s) => html`
 <tr class=${s.match ? 'select' : ''}>
   <td>${s.item.firstName} ${s.item.lastName}</td>
   <td>${s.item.email}</td>
   <td>${s.item.course}</td>
</tr>`

start()
async function start(){
   const url = 'http://localhost:3030/jsonstore/advanced/table'
   const res = await fetch (url)
   const data = await res.json()
   students = Object.values(data).map(s =>({ item: s, match: false}))

    update()
}

function update(){
   render(students.map(student), document.querySelector('tbody'));
}


function onClick(event){
   const value = inputField.value.trim().toLocaleLowerCase();

   for(let student of students){
      console.log(student)
      student.match = Object.values(student.item).some(v => v.toLocaleLowerCase().includes(value));
   }

   update();
}