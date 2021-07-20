'use strict'

const store = require('./../store')

const onSignUpSuccess = (response) => {
  $('#confirm-message').text(`Your account is ready, ${response.user.email}, let's sign in!`)
  console.log(response)
  $('#sign-up').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').show()
  // $('#sign-out').show()
  // $('#new-game').show()
  // $('#board').show()
}

const onSignUpFailure = (response) => {
  $('#confirm-message').text('Failed to Sign Up')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  $('#confirm-message').text(`Hey, ${response.user.email}! let's play!`)
  store.token = response.user.token
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#create-game').show()
  $('#board').show()
}

const onSignInFailure = () => {
  $('#confirm-message').trigger('Login Attempt Failed')
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = () => {
  $('#confirm-message').text('Signed out! See ya next time.')
  $('#sign-in').show()
  $('#sign-up').show()
  $('#sign-out').hide()
  $('#create-game').hide()
  $('#board').hide()
}

const onSignOutFailure = () => {
  $('#confirm-message').text('Oops, try again.')
}

const onCreateGameSuccess = (response) => {
  $('#confirm-message').text('New Game')
  store.gameToken = response.game.id
  store.cells = response.game.cells
  console.log(store.gameToken)
  console.log(store.cells)
}

const onCreateGameFailure = (response) => {
  $('#confirm-message').text('Hmmm... try again')
  console.log('failed to create game')
}

$('.box').on('click', function (event) {
  console.log('this is clicked')
})

// $('.box').on('click', event.doSomething)

// const doSomething = function (event) {
// const clickedBox = event.target
// console.log(clickedBox)
// }

const onEmptyDiv = (response) => {
  const emptyDiv = $('.box')
  response.game.cells.each(function (i) {
    emptyDiv[i] = response.game.cells[i]
  })
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onEmptyDiv
}
