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

const onCreateGameFailure = () => {
  $('#confirm-message').text('Hmmm... try again')
  console.log('This does not work')
}

$('.box-choice').on('click', function (event) {
  console.log('this is clicked')
})

const onEmptyBox = function (event) {
  if ($('.box-choice').is(':empty')) {
    console.log('empty')
  }
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
  onEmptyBox
}
