export function decodeHTML(str) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

export function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function saveResult(result) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  history.unshift({ ...result, date: new Date().toISOString() })
  localStorage.setItem('quiz_history_' + (localStorage.getItem('userName') || 'guest'), JSON.stringify(history.slice(0, 20)))
}
