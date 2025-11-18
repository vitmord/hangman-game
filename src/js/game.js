import { WORDS, KEYBOARD_LETTERS } from './consts'

const gameElement = document.getElementById('game')
const logoElement = document.querySelector('.logo')

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
        key.id = `key_${letter}`
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

export const startGame = () => {
    logoElement.classList.add('logo-sm')
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('word', wordToGuess)
    gameElement.innerHTML = createPlaceholders()
    gameElement.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>`
    const keyboardElement = createKeyboard()
    keyboardElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('key')) {
            const key = e.target
            console.log(key.textContent)
        }
    })
    gameElement.append(keyboardElement)
    const hangmanImg = createHangmamImg()
    gameElement.prepend(hangmanImg)

    console.log(wordToGuess)
    console.log(KEYBOARD_LETTERS)
}
