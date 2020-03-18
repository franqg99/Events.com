const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000
})

function getEvent (event, idx) {
  const divContainer = document.getElementById('default-events')
  const newEvent = document.createElement('div')
  newEvent.setAttribute('class', 'card col-3')
  newEvent.setAttribute('data-toggle', 'modal')
  newEvent.setAttribute('data-target', `#modal${idx}`)
      
  newEvent.style.width = '18rem'
      
  newEvent.innerHTML = `
    <img src="./img/${event.event.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${event.event.name}</h5>
    </div>
    `
      
  divContainer.appendChild(newEvent)
}
      

api.get(`events/${localStorage.getItem('userId')}`)
  .then(response => {
    console.log(response)
      response.data.forEach((event, idx) => { 
        getEvent(event, idx)
    })
  })