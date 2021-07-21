'use strict'

const authEvents = require('./auth/events')
const store = require('./store')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#create-game').on('click', authEvents.onCreateGame)
  $('.box').on('click', authEvents.onUpdateGame)
})

$(() => {
  let currentPlayer = 'x'
  store.player = currentPlayer
  const onBoxClick = (event) => {
    console.log(currentPlayer)
    const box = $(event.target)
    box.text(currentPlayer)
    currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
  }
  $('.box').one('click', onBoxClick)
})
