if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").then(registration =>{
    console.log("SW Registered!");
    console.log(registration);
  }).catch(error =>{
    console.log("SW Failed to register!");
    console.log(error);
  })
}
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
var currentClass
let oWinsText = document.getElementById("o-wins").innerText
let xWinsText = document.getElementById("x-wins").innerText

let oWins = isNaN(parseInt(oWinsText)) ? 0 : parseInt(oWinsText)
let xWins = isNaN(parseInt(xWinsText)) ? 0 : parseInt(xWinsText)
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  document.getElementById("currentClass").innerHTML = "Next Player: X ";
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  if(currentClass === CIRCLE_CLASS){
    document.getElementById("currentClass").innerHTML = "Next Player: X ";
  }else{
    document.getElementById("currentClass").innerHTML = "Next Player: O ";
  }
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    if (circleTurn) {
      winningMessageTextElement.innerText = 'O Wins!'
      oWins++
    } else {
      winningMessageTextElement.innerText = 'X Wins!'
      xWins++
    }
  }
  document.getElementById("o-wins").innerText = oWins
document.getElementById("x-wins").innerText = xWins
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

