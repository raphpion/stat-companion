/*
  app.js
  Cette application web permet de calculer plusieurs mesures d'analyse statistique et probabiliste
  à partir d'un échantillon.

  par Raphaël Pion
 */

let valeurs = []
let estEchantillon = false
let mesuresTendanceCentrale = ''
let mesuresDispertion = ''

let moyenne, mediane, mode, etendue, variance, ecartType, coefficientVariation

const input = document.getElementById('input')
const output = document.getElementById('output')
const type = document.getElementsByName('type')

const analyseButton = document.getElementById('analyse')
const reinitialiserButton = document.getElementById('reinitialiser')

analyseButton.addEventListener('click', analyserDonnees)
reinitialiserButton.addEventListener('click', reinitialiser)

//* Fonctions des boutons =============================================================================================================================
function analyserDonnees() {
  calculTendanceCentrale()
  calculDispertion()
  updateOutput()
}

function reinitialiser() {
  input.value = ''
  output.value = ''
}

//* Calculs des mesures ===============================================================================================================================
function calculTendanceCentrale() {
  recupererEchantillon()
  moyenne = calculMoyenne()
  mediane = calculMediane()
  mode = calculMode()
  mesuresTendanceCentrale = `${estEchantillon ? 'x̄' : 'μ'}: ${limiterDecimales(moyenne, 4)}\nmd: ${mediane}\nmo: ${mode}`
}

function calculDispertion() {
  recupererEchantillon()
  etendue = calculEtendue()
  variance = calculVariance()
  ecartType = calculEcartType()
  coefficientVariation = calculCoefficientVariation()
  mesuresDispertion = `E: ${etendue}\n${estEchantillon ? 's' : 'σ'}²: ${limiterDecimales(variance, 4)}\n${estEchantillon ? 's' : 'σ'}: ${limiterDecimales(ecartType, 4)}\nCV: ${limiterDecimales(
    coefficientVariation,
    4
  )}`
}

//* Calculs individuels ===============================================================================================================================
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

function calculEtendue() {
  return valeurs[valeurs.length - 1] - valeurs[0]
}

function calculVariance() {
  let resultat = 0
  let moyenne = limiterDecimales(calculMoyenne(), 4)
  for (let v of valeurs) {
    resultat += Math.pow(v - moyenne, 2)
  }
  resultat /= estEchantillon ? valeurs.length - 1 : valeurs.length
  return resultat
}

function calculEcartType() {
  return Math.sqrt(variance)
}

function calculCoefficientVariation() {
  return ecartType / moyenne
}

//* Calculs intermédiaires =============================================================================================================================
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
  if (type[0].checked) estEchantillon = true
  if (type[1].checked) estEchantillon = false
}

function updateOutput() {
  if (isNaN(moyenne) || isNaN(etendue) || isNaN(variance) || isNaN(ecartType) || isNaN(coefficientVariation))
    output.value = `Échantillon invalide !\nAssurez-vous d'avoir entré uniquement des nombres séparés d'une virgule sans espace.`
  else output.value = mesuresTendanceCentrale + '\n' + mesuresDispertion
}
