var divContainer = document.getElementById('default-events')


function addModalEvent(event, idx) {
  var newModal = document.createElement('div')


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
        <div class="modal-body">
          ${event.tasks.forEach(task => {
            var taskp = document.createElement('p')
            taskp.innerHTML = `${task.name}`
            var divTask = document.getElementsByClassName('modal-body')
            divTask.appendChild(taskp)
          }) }
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Añadir a mis eventos</button>
        </div>
      </div>
    </div>
  </div>`

  return newModal
}

events.forEach((event, idx) => {
  var newEvent = document.createElement('div')
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

  newEvent.addEventListener('click', () => {
    divContainer.appendChild(addModalEvent(event, idx))
  })

  divContainer.appendChild(newEvent)
});
