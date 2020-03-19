const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

function getEvent (event, idx) {
  const divContainer = document.getElementById('my-events')
  const newEvent = document.createElement('div')
  newEvent.setAttribute('class', 'card col-3')
      
  newEvent.style.width = '18rem'
      
  newEvent.innerHTML = `
    <img src="./img/${event.event.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${event.event.name}</h5>
    </div>
    `
    
  newEvent.onclick = function () {
    getTasksEvent(event)
  }
  divContainer.appendChild(newEvent)
}

function updateTaskStatus(event, idx) {
  console.log(event)
  api.put(`events/${event._id}/${idx}`, {status: true}, { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    console.log(response)  
    
  })
  .catch(err => console.log(err))
}

function getTasksEvent(event) {
  var TODODiv = document.getElementById("my-todos")
  var h2 = document.createElement('h2')
  h2.innerHTML= `${event.event.name}`
  
  TODODiv.innerHTML = ''
  var table = document.createElement('table')

  table.classList.add('table');
  table.classList.add('table-dark');
  
  var headers = document.createElement("thead");
  headers.innerHTML = `
    <tr>
      <th scope="col"> Task </th>
      <th scope="col"> Status </th>
      <th scope="col"> Is done? </th>
      <th scope="col"> Wanna remove? </th>
    </tr>`
  table.appendChild(headers)

  var content = document.createElement("tbody");

  event.event.tasks.forEach((task, idx) => {
    
    var TODOTr = document.createElement("tr");
    TODOTr.innerHTML = `
        <td> ${task.name} </td>
        <td> ${task.status} </td>`
    var updateButton = document.createElement('input')
    updateButton.setAttribute('type', 'button')
    updateButton.setAttribute('value', 'Update')
    updateButton.classList.add('btn');
    updateButton.classList.add('btn-success');
    updateButton.onclick = function () {
      updateTaskStatus(event, idx)
    }
    var td = document.createElement('td')
    td.appendChild(updateButton)
    TODOTr.appendChild(td)
    var deleteButton = document.createElement('input')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('value', 'Delete')
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.onclick = function () {
      deleteTask(TODOElement.id)
    }
    var td = document.createElement('td')
    td.appendChild(deleteButton)
    TODOTr.appendChild(td)
    content.appendChild(TODOTr)
  })
  
  table.appendChild(content)
  TODODiv.appendChild(h2)
  TODODiv.appendChild(table)
}
 
  
api.get(`events/${localStorage.getItem('userId')}`, { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    response.data.forEach((event, idx) => { 
      getEvent(event, idx)
    })
    
  })