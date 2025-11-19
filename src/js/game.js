import { WORDS, KEYBOARD_LETTERS } from './consts'

const gameElement = document.getElementById('game')
const logoElement = document.querySelector('.logo')
let triesLeft
let winCount

const createPlaceholders = () => {
    const word = sessionStorage.getItem('word')
    const wordArray = Array.from(word)
    const placeholderHTML = wordArray.reduce((acc, _, i) => (acc += `<span id="letter_${i}" class="letter">_</span>`), '')

    return `<div id="placehlolder" class="placeholders-wrapper">${placeholderHTML}</div>`
}

const createKeyboard = () => {
    const keyboard = document.createElement('div')
    keyboard.classList.add('keyboard')
    keyboard.id = 'keyboard'

    KEYBOARD_LETTERS.forEach((letter) => {
        const key = document.createElement('button')
        key.setAttribute('type', 'button')
        key.classList.add('key')
        key.classList.add('button-primary')
        key.id = letter
        key.textContent = letter
        keyboard.append(key)
    })

    return keyboard
}

const createHangmamImg = () => {
    const img = document.createElement('img')
    img.src = 'images/hg-0.png'
    img.setAttribute('alt', 'Hangman image')
    img.classList.add('hangman-img')
    img.id = 'hangman-img'

    return img
}

const checkLetter = (letter) => {
    const word = sessionStorage.getItem('word')
    const inputLetter = letter.toLowerCase()
    if (!word.includes(inputLetter)) {
        const triesCounter = document.getElementById('tries-left')
        triesLeft--
        triesCounter.textContent = triesLeft

        const hangmanImg = document.getElementById('hangman-img')
        hangmanImg.src = `images/hg-${10 - triesLeft}.png`

        if (triesLeft === 0) stopGame('lose')
    } else {
        const wordArray = Array.from(word)

        wordArray.forEach((currentLetter, index) => {
            if (currentLetter === inputLetter) {
                document.getElementById(`letter_${index}`).textContent = inputLetter
                winCount++

                if (winCount === word.length) stopGame('win')
            }
        })
    }
}

const stopGame = (status) => {
    document.getElementById('placehlolder').remove()
    document.getElementById('tries').remove()
    document.getElementById('keyboard').remove()
    document.getElementById('quit').remove()

    const word = sessionStorage.getItem('word')

    if (status === 'win') {
        document.getElementById('hangman-img').src = 'images/hg-win.png'
        document.getElementById('game').innerHTML += '<h2 class="result-header win">You won!</h2>'
    } else if (status === 'lose') {
        document.getElementById('game').innerHTML += '<h2 class="result-header lose">You lose :(</h2>'
    } else if (status === 'quit') {
        document.getElementById('hangman-img').remove()
        logoElement.classList.remove('logo-sm')
    }

    document.getElementById('game').innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary px-5 py-2 mt-5">Play again</button>`

    document.getElementById('play-again').onclick = startGame
}

export const startGame = () => {
    triesLeft = 10
    winCount = 0

    logoElement.classList.add('logo-sm')
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    const wordToGuess = WORDS[randomIndex].toLowerCase()
    sessionStorage.setItem('word', wordToGuess)
    gameElement.innerHTML = createPlaceholders()
    gameElement.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>`
    const keyboardElement = createKeyboard()
    keyboardElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('key')) {
            const key = e.target
            key.disabled = true
            checkLetter(key.id)
        }
    })
    gameElement.append(keyboardElement)
    const hangmanImg = createHangmamImg()
    gameElement.prepend(hangmanImg)

    gameElement.insertAdjacentHTML('beforeend', '<button id="quit" class="button-secondary px-2 py-1 mt-4" type="button">Quit</button>')

    document.getElementById('quit').onclick = () => {
        if (window.confirm('Are you sure you want to quit and lose progress?')) {
            stopGame('quit')
        }
    }
}
