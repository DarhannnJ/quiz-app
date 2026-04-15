import { useState } from 'react'

export function useProfile() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const saveName = (name) => {
    localStorage.setItem('userName', name)
    setUserName(name)
  }
  const logout = () => {
    localStorage.removeItem('userName')
    setUserName('')
  }
  return { userName, saveName, logout }
}

export function NameModal({ onSave }) {
  const [input, setInput] = useState('')
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 w-80 text-center">
        <div className="text-4xl mb-4">👋</div>
        <h2 className="text-2xl font-bold mb-2">Добро пожаловать!</h2>
        <p className="text-gray-400 mb-6">Как тебя зовут?</p>
        <input
          className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Твоё имя..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && input.trim() && onSave(input.trim())}
          autoFocus
        />
        <button
          onClick={() => input.trim() && onSave(input.trim())}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors">
          Начать
        </button>
      </div>
    </div>
  )
}

export function Header({ userName, lang, setLang, onLogout, onProfile }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <button onClick={onProfile}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
        <span className="text-gray-300">👋 <span className="text-white font-semibold">{userName}</span></span>
        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{history.length} игр</span>
      </button>
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          <button onClick={() => setLang('ru')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${lang === 'ru' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            RU
          </button>
          <button onClick={() => setLang('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${lang === 'en' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            EN
          </button>
        </div>
        <button onClick={onLogout}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors">
          Выйти
        </button>
      </div>
    </div>
  )
}

export function ProfileScreen({ userName, onBack, onLogout }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  const totalGames = history.length
  const avgScore = totalGames
    ? Math.round(history.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / totalGames)
    : 0
  const bestScore = totalGames
    ? Math.max(...history.map(r => Math.round((r.score / r.total) * 100)))
    : 0
  const bestStreak = totalGames
    ? Math.max(...history.map(r => r.maxStreak || 0))
    : 0

  return (
    <div className="max-w-md mx-auto pt-10 p-6">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 block">← Назад</button>

      <div className="text-center mb-8">
        <div className="text-6xl mb-3">🧑‍💻</div>
        <h2 className="text-2xl font-bold">{userName}</h2>
        <p className="text-gray-400">{totalGames} игр сыграно</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{avgScore}%</div>
          <div className="text-xs text-gray-400 mt-1">средний результат</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{bestScore}%</div>
          <div className="text-xs text-gray-400 mt-1">лучший результат</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{bestStreak}</div>
          <div className="text-xs text-gray-400 mt-1">макс. серия</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{totalGames}</div>
          <div className="text-xs text-gray-400 mt-1">всего игр</div>
        </div>
      </div>

      <button onClick={onLogout}
        className="w-full bg-red-800 hover:bg-red-700 p-3 rounded-lg font-medium transition-colors">
        Сменить игрока
      </button>
    </div>
  )
}
