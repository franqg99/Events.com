var divContainer = document.getElementById('default-events')


function addModalEvent(event, idx) {
  const divContainer = document.getElementById('default-events')
  var newModal = document.createElement('div')
  //var addEvent = document.getElementById('addEvent')

  newModal.innerHTML = `
  <div class="modal fade" id="modal${idx}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${event.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body${idx}">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="addEvent">Añadir a mis eventos</button>
        </div>
      </div>
    </div>
  </div>`

  /*addEvent.addEventListener('click', () => {

  })*/
  divContainer.appendChild(newModal)
  addTodosToEvent(event, idx)
}

function addTodosToEvent(event, idx) {
  const divTasks = document.getElementsByClassName(`modal-body${idx}`)[0]
  event.tasks.forEach( task => {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    li.innerHTML = task.name
    ul.appendChild(li)
    divTasks.appendChild(ul)
  })
  
}

events.forEach((event, idx) => {
  const divContainer = document.getElementById('default-events')
  const newEvent = document.createElement('div')
  newEvent.setAttribute('class',  'card col-3')
  newEvent.setAttribute('data-toggle',  'modal')
  newEvent.setAttribute('data-target',  `#modal${idx}`)

  newEvent.style.width = '18rem'

  newEvent.innerHTML = `
    <img src="./img/${event.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
    </div>
  `
  divContainer.appendChild(newEvent)
  
  addModalEvent(event, idx)
 
});
