'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onSignUp = (event) => {
  event.preventDefault()
  console.log('onSignUp function')
  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('Sign In')
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onCreateGame = (event) => {
  console.log('new game created')
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onUpdateGame = (event) => {
  event.preventDefault()
  const clickedBox = event.target.getAttribute('data-cell-index')
  store.gameIndex = clickedBox

  const box = $(event.target)
  console.log(box)

  if (store.game.cells[clickedBox] === '') {
    store.game.cells[clickedBox] = store.currentPlayer
  }

  box.text(store.currentPlayer)

  api.updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)

  store.currentPlayer = store.currentPlayer === 'o' ? 'x' : 'o'
}

const winGame = () => {
  const winningPlayer = null
  const checkWinIndexes = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // first diagonal
    [2, 4, 6] // second diagonal
  ]
  console.log(winningPlayer)
  console.log(checkWinIndexes)
}
// loop over array of arrays and check if the index in each array all match the game

module.exports = {
  getFormFields,
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  winGame
}
