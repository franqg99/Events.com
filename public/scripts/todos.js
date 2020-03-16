(function () {
  const api = axios.create({
    baseURL: 'api/',
    timeout: 1000
  })

  if (localStorage.getItem('token')) {
    document.getElementById('username').innerText = localStorage.getItem('email')
  } else {
    location.href = 'auth.html'
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear()
    location.assign('index.html')
  })

  document.getElementById('newTodo').addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      api.post('todos',
        { todo: document.getElementById('newTodo').value },
        { headers: { token: localStorage.getItem('token') } }).then(response => {
        addTodoToList(document.getElementById('newTodo').value)
        document.getElementById('newTodo').value = ''
      })
    }
  })

  function addTodoToList (todo) {
    const todosUL = document.getElementById('todosUL')
    const todoLI = document.createElement('li')
    todoLI.innerHTML = `<input type="checkbox"> ${todo}`
    todosUL.appendChild(todoLI)
  }

  api.get('todos', { headers: { token: localStorage.getItem('token') } }).then(response => {
    response.data.forEach(todo => {
      addTodoToList(todo.task)
    })
  })
})()
