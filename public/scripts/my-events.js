/* eslint-disable no-undef */
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

api.get(`events/${localStorage.getItem('userId')}`, { headers: { token: localStorage.getItem('token') } })
  .then(response => {
    response.data.forEach((event, idx) => {
      getEvent(event)
    })
  })

function getEvent (event) {
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

  var body = document.createElement('tbody')
  body.setAttribute('id', 'tablebody')

  event.tasks.forEach((task, idx) => {
    const taskTR = generateTaskTR(event, task, idx)
    body.appendChild(taskTR)
  })

  table.appendChild(body)

  const divAddTask = createinputNewTask(event)

  TODODiv.appendChild(h2)
  TODODiv.appendChild(table)
  TODODiv.appendChild(divAddTask)
}

function generateTaskTR (event, task, idx) {
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

  return TODOTr
}

function createinputNewTask (event) {
  const divAddTask = document.createElement('div')
  const labelTask = document.createElement('label')
  const inputTask = document.createElement('input')

  divAddTask.setAttribute('id', 'addtask')
  divAddTask.classList.add('col-10')
  divAddTask.classList.add('offset-1')
  divAddTask.classList.add('mt-2')

  inputTask.setAttribute('id', 'inputTask')
  inputTask.classList.add('form-control')
  inputTask.setAttribute('type', 'text')
  labelTask.setAttribute('for', 'inputTask')

  labelTask.innerText = 'Añadir tarea'

  inputTask.addEventListener('keypress', (e) => {
    const newTaskInput = inputTask.value
    if (e.code === 'Enter' && newTaskInput.length !== 0) {
      api.post(`events/${event._id}/tasks`,
        { newTask: { name: newTaskInput, status: false } },
        { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          getTasksEvent(response.data)
        })
    }
  })

  divAddTask.appendChild(labelTask)
  divAddTask.appendChild(inputTask)

  return divAddTask
}
