import '../css/style.css'
import { startGame } from './game'
import { darkModeHandle } from './utils'

darkModeHandle()

const startGameButtonElement = document.getElementById('startGame')
startGameButtonElement.addEventListener('click', startGame)
