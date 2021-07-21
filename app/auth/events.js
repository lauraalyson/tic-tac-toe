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
  winnerOfGame()
}

const winnerOfGame = () => {
  let winningPlayer = ''

  const checkWinIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  checkWinIndexes.forEach((index) => {
    if (
      index.every((index) => {
        return store.game.cells[index] === 'x'
      })
    ) {
      winningPlayer = 'x'
    }
    if (
      index.every((index) => {
        return store.game.cells[index] === 'o'
      })
    ) {
      winningPlayer = 'o'
    }
  })

  if (winningPlayer) {
    store.game.over = true
    $('#winner-message').text('Player ' + winningPlayer + ' is the winner!!')
    console.log(store.game.over)
    console.log(winningPlayer)
  }
  console.log(winningPlayer)
  if (store.game.over === true) {
    $('.box').off('click')
  }
  const tie = !store.game.cells.includes('')
  if (tie) {
    store.game.over = true
    $('#winner-message').text('Tied')
  }
}

module.exports = {
  getFormFields,
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  winnerOfGame
}
