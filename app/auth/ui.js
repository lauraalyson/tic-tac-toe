'use strict'

const store = require('./../store')

const onSignUpSuccess = (response) => {
  $('#confirm-message').text(`Your account is ready, ${response.user.email}, let's play!`)
  console.log(response)
  $('#sign-up').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
}

const onSignUpFailure = (response) => {
  $('#confirm-message').text('Failed to Sign Up')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  $('#confirm-message').text(`Hey, ${response.user.email}! Welcome back.`)
  store.token = response.user.token
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
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
}

const onSignOutFailure = () => {
  $('#confirm-message').text('Oops, try again.')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
