'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const showSignUp = (event) => {
  $('#sign-up').show()
  $('#create-account').hide()
  $('#sign-in').hide()
}

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

  $('.box').html('')
  $('#winner-message').html('')
  $('#confirm-message').show()
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

  box.html(store.currentPlayer)

  api.updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)

  store.currentPlayer = store.currentPlayer === 'o' ? 'x' : 'o'
  return onShowResults()
}

const onShowResults = () => {
  let winner = ''
  const winningIndexes = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  winningIndexes.forEach((index) => {
    if (
      index.every((index) => {
        return store.game.cells[index] === 'o'
      })
    ) {
      winner = 'o'
    }
    if (
      index.every((index) => {
        return store.game.cells[index] === 'x'
      })
    ) {
      winner = 'x'
    }
  })
  if (winner) {
    store.game.over = true
    $('#winner-message').text(winner + ' wins this round.. play again?')
    console.log(store.game.over)
    console.log(winner)
  }
  console.log(winner)
  const tie = !store.game.cells.includes('')
  if (tie) {
    store.game.over = true
    $('#winner-message').text('All tied up... try again?')
  }
  // if (store.game.over === true) {
  //   $('.box').off('click')
  // }
  console.log(onShowResults)
}

module.exports = {
  getFormFields,
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  onShowResults,
  showSignUp
}
