import '../css/style.css'
import { darkModeHandle } from './utils'

darkModeHandle()

const startGameButtonElement = document.getElementById('startGame')
startGameButtonElement.addEventListener('click', () => {
    console.log('Start game!')
})
