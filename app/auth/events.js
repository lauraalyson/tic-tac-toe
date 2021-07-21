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
  console.log(clickedBox)
  store.gameIndex = clickedBox
  const gameIndex = store.game.cells[clickedBox]
  console.log(store.game.cells)
  console.log(gameIndex)

  api.updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

module.exports = {
  getFormFields,
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame
}
