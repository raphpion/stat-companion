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
const reinitialiserButton = document.getElementById('reinitialiser')

tendanceCentraleButton.addEventListener('click', calculTendanceCentrale)
reinitialiserButton.addEventListener('click', reinitialiser)

// Fonctions des boutons
function calculTendanceCentrale() {
  recupererEchantillon()
  let moyenne = calculMoyenne()
  let mediane = calculMediane()
  let mode = calculMode()
  if (isNaN(moyenne)) output.value = 'Échantillon invalide!'
  else {
    output.value = `x̄: ${limiterDecimales(moyenne, 4)}\nmd: ${mediane}\nmo: ${mode}`
    dispertionButton.disabled = false
  }
}

function calculDispertion() {
  recupererEchantillon()
  // TODO: calcul des mesures de dispertion
}

function reinitialiser() {
  input.value = ''
  output.value = ''
  dispertionButton.disabled = true
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
  if (valeurs.length % 2 == 0) {
    if (valeurs[valeurs.length / 2 - 1] != valeurs[valeurs.length / 2]) {
      return [valeurs.length / 2 - 1] + ' et ' + [valeurs.length / 2]
    } else return [valeurs.length / 2 - 1]
  } else return [Math.ceil(valeurs.length / 2 - 1)]
}

function calculMode() {
  // 1. créer un array vide
  let arr = []
  // 2. looper dans le array de valeurs et le array vide pour voir si la valeur est présente
  for (let valeur of valeurs) {
    let valueFound = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] == valeur) {
        arr[i][1] += 1
        valueFound = true
        break
      }
    }
    if (!valueFound) {
      arr.push([valeur, 1])
    }
  }
  // 3. ordonner le nouvel array par arr[i][1]
  arr = arr.sort(function (a, b) {
    return b[1] - a[1]
  })
  // 4. vérifier combien de modes il y a
  let numModes = 1
  for (let i = 1; i < arr.length; i++) {
    if (arr[0][1] > arr[i][1]) break
    numModes += 1
  }
  // 5. retourner les modes
  let reponse = ''
  if (numModes == 1) reponse = arr[0][0]
  else {
    for (let i = 0; i < numModes; i++) {
      reponse += arr[i][0] + ', '
    }
    reponse = reponse.slice(0, reponse.length - 2)
  }
  return reponse
}

// fonctions de calculs intermédiaires
function limiterDecimales(valeur, num) {
  if (compterDecimales(valeur) > num) return valeur.toFixed(num)
  else return valeur
}

function compterDecimales(valeur) {
  const valeurStr = String(valeur)
  if (valeurStr.includes('.')) {
    return valeurStr.split('.')[1].length
  }
  return 0
}

function recupererEchantillon() {
  let values = input.value
  valeurs = values.split(',').map(Number)
  valeurs.sort(function (a, b) {
    return a - b
  })
}
