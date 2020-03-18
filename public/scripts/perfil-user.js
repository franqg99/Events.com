const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const updateUser = {
    user_name: document.getElementById('user_name').value,
    user_email: document.getElementById('user_email').value,
    user_password: document.getElementById('user_new_password').value,
    user_phone: document.getElementById('user_phone').value
  }

  api
    .put('auth/signup', updateUser)
    //
    // Aqui es donde el backend crea el usuario
    // crea el token y me lo devuelve
    //
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('name', response.data.username)
      localStorage.setItem('email', response.data.email)
      location.assign('my-events.html')
    })
    .catch(function (error) {
      console.log(error.response)
    })
})