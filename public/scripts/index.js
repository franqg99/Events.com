(function () {
  if (localStorage.getItem('token')) {
    console.log('user authenticated')
  } else {
    console.log('user not authenticated')
  }
})()

console.log(events);
