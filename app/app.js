'use strict'

const authEvents = require('./auth/events')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#create-game').on('click', authEvents.onCreateGame)
  $('.box').on('click', authEvents.onUpdateGame)
  $('#create-account').on('click', authEvents.showSignUp)
})
