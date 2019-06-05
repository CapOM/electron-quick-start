
let mainWindow = require('electron').remote.getCurrentWindow()
let el = document.getElementById('sprite')

el.addEventListener('mouseenter', () => {
  mainWindow.setIgnoreMouseEvents(false)
})

el.addEventListener('mouseleave', () => {
  mainWindow.setIgnoreMouseEvents(true, { forward: true })
})

el.addEventListener('mousemove', () => {
  console.log('-- mouse move --')
})

el.addEventListener('click', () => {
  console.log('-- mouse click --')
})

