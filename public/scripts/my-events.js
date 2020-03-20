/* eslint-disable no-undef */
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

// document.getElementById('addTask').addEventListener('keydown', (e) => {
//   if (e.code === 'Enter') {
//     api.post(`events/${event._id}/tasks`,
//       { todo: document.getElementById('addTask').value },
//       { headers: { token: localStorage.getItem('token') } }).then(response => {
//       addTaskToList(document.getElementById('addTask').value)
//       document.getElementById('addTask').value = ''
//     })
//   }
// })

// function addTaskToList (todo) {
//   var TODODiv = document.getElementById('my-todos')
//   const todoLI = document.createElement('li')
//   todoLI.innerHTML = `<input type="checkbox"> ${todo}`
//   todosUL.appendChild(todoLI)
// }

function getEvent (event, idx) {
  const divContainer = document.getElementById('my-events')
  const newEvent = document.createElement('div')
  newEvent.setAttribute('class', 'card col-3')
  newEvent.style.width = '18rem'
  newEvent.innerHTML = `
    <img src='./img/${event.img}' class='card-img-top' alt='...'>
    <div class='card-body'>
      <h5 class='card-title'>${event.name}</h5>
    </div>
    `

  newEvent.onclick = function () {
    getTasksEvent(event)
  }
  divContainer.appendChild(newEvent)
}

function updateTaskStatus (event, idx) {
  console.log('Cambio de estado')
  api.put(`events/${event._id}/tasks/${event.tasks[idx]._id}`,
    { status: !event.tasks[idx].status },
    { headers: { token: localStorage.getItem('token') } })
    .then(() => {
      if (event.tasks[idx].status) {
        document.getElementById(event.tasks[idx]._id).innerText = 'No hecho'
      } else {
        document.getElementById(event.tasks[idx]._id).innerText = 'Hecho'
      }
    })
    .catch(err => console.log(err))
}

function deleteTask (e, event, idx) {
  api.delete(`events/${event._id}/tasks/${event.tasks[idx]._id}`,
    { headers: { token: localStorage.getItem('token') } })
    .then(() => {
      document.getElementById(event.tasks[idx]._id + 'TR').remove()
    })
    .catch(err => console.log(err))
}

function getTasksEvent (event) {
  var TODODiv = document.getElementById('my-todos')
  var h2 = document.createElement('h2')
  h2.innerHTML = `${event.name}`

  TODODiv.innerHTML = ''
  var table = document.createElement('table')

  table.classList.add('table')
  table.classList.add('tableColor')

  var headers = document.createElement('thead')
  headers.innerHTML = `
    <tr>
      <th scope='col'> Tarea </th>
      <th scope='col'> Estado </th>
      <th scope='col'> Actualizar </th>
      <th scope='col'> Eliminar </th>
    </tr>`
  table.appendChild(headers)

  var content = document.createElement('tbody')

  event.tasks.forEach((task, idx) => {
    var TODOTr = document.createElement('tr')
    TODOTr.setAttribute('id', task._id + 'TR')

    const tdName = document.createElement('td')
    tdName.innerText = task.name
    TODOTr.appendChild(tdName)

    const tdStatus = document.createElement('td')
    tdStatus.setAttribute('id', task._id)
    tdStatus.innerText = task.status ? 'Hecho' : 'No hecho'
    TODOTr.appendChild(tdStatus)

    var updateButton = document.createElement('input')
    updateButton.setAttribute('type', 'button')
    updateButton.setAttribute('value', 'Update')
    updateButton.classList.add('btn')
    updateButton.classList.add('btn-success')
    updateButton.onclick = function () {
      updateTaskStatus(event, idx)
    }
    var td = document.createElement('td')
    td.appendChild(updateButton)
    TODOTr.appendChild(td)
    var deleteButton = document.createElement('input')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('value', 'Delete')
    deleteButton.classList.add('btn')
    deleteButton.classList.add('btn-danger')
    deleteButton.onclick = function (e) {
      deleteTask(e, event, idx)
    }
    var td2 = document.createElement('td')
    td2.appendChild(deleteButton)
    TODOTr.appendChild(td2)
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
