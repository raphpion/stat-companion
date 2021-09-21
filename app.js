/*
  app.js
  Cette application web permet de calculer plusieurs mesures d'analyse statistique et probabiliste
  à partir d'un échantillon.
 */

let valeurs = []
let estEchantillon = false

const input = document.getElementById('input')
const output = document.getElementById('output')

const tendanceCentraleButton = document.getElementById('tendance-centrale')
const dispertionButton = document.getElementById('dispertion')

tendanceCentraleButton.addEventListener('click', calculTendanceCentrale)

// Fonctions des boutons
function calculTendanceCentrale() {
  recupererEchantillon()
  let moyenne = calculMoyenne()
  let mediane = calculMediane()
  output.value = `x̄: ${moyenne}\nmd: ${mediane}`
}

function calculDispertion() {
  recupererEchantillon()
  // TODO: calcul des mesures de dispertion
}

// Calculs individuels
function calculMoyenne() {
  let reponse = 0
  for (let i = 0; i < valeurs.length; i++) {
    reponse += valeurs[i]
  }
  reponse /= valeurs.length
  return reponse
}

function calculMediane() {
  if (valeurs.length % 2 == 0) return valeurs[valeurs.length / 2 - 1] + ' et ' + valeurs[valeurs.length / 2]
  else return valeurs[Math.ceil(valeurs.length / 2 - 1)]
}

function calculMode() {
  let arr = []
  for (let num of valeurs) {
  }
}

function recupererEchantillon() {
  let values = input.value
  valeurs = values.split(',').map(Number)
  valeurs.sort(function (a, b) {
    return a - b
  })
}
