'use strict'

const store = require('./../store')
const config = require('./../config')

const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

const signIn = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const createGame = function (data, response) {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const updateGame = function () {
  console.log(`in the api call updateGame ${store.game.over}`)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    data: {
      game: {
        cell: {
          index: store.gameIndex,
          value: store.currentPlayer
        },
        over: store.game.over
      }
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  createGame,
  updateGame
}
