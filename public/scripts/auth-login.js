// eslint-disable-next-line no-undef
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

document.getElementById('btn-login').addEventListener('click', (event) => {
  const newUser = {
    user_email: document.getElementById('login_email').value,
    user_password: document.getElementById('login_password').value
  }

  api
    .post('auth/login', newUser)
    .then(function (response) {
      if (response.data.error) {
        alert('WRONG PASSWORD')
      } else {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('name', response.data.username)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('userId', response.data.userId)
        location.assign('my-events.html')
      }
    })
    .catch(function (error) {
      console.log(error.response)
    })
})
