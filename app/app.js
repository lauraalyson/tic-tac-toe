'use strict'

const authEvents = require('./auth/events')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#create-game').on('click', authEvents.onCreateGame)
})

$(() => {
  let currentPlayer = 'x'
  const onBoxClick = (event) => {
    console.log('click')
    const box = $(event.target)
    box.css('background', 'transparent').text(currentPlayer)
    currentPlayer = currentPlayer === 'O' ? 'x' : 'O'
  }
  $('.box').on('click', onBoxClick)
  console.log(currentPlayer)
})
