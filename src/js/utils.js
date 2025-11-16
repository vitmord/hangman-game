export const darkModeHandle = () => {
    const darkModeSwitcherElement = document.getElementById('toggleDarkMode')
    const htmlElement = document.documentElement
    htmlElement.classList.add(localStorage.getItem('mode'))

    darkModeSwitcherElement.addEventListener('input', () => {
        htmlElement.classList.toggle('dark')

        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark')
        } else {
            localStorage.setItem('mode', 'light')
        }
    })
}
