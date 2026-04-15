import { useState } from 'react'

export function useProfile() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const saveName = (name) => { localStorage.setItem('userName', name); setUserName(name) }
  const logout = () => { localStorage.removeItem('userName'); setUserName('') }
  return { userName, saveName, logout }
}

export function NameModal({ onSave, T }) {
  const [input, setInput] = useState('')
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className={`${T.card} rounded-2xl p-6 w-full max-w-sm text-center`}>
        <div className="text-4xl mb-4">👋</div>
        <h2 className="text-xl font-bold mb-2">Добро пожаловать!</h2>
        <p className={`${T.sub} mb-6 text-sm`}>Как тебя зовут?</p>
        <input
          className={`w-full ${T.input} rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
          placeholder="Твоё имя..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && input.trim() && onSave(input.trim())}
          autoFocus
        />
        <button onClick={() => input.trim() && onSave(input.trim())}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors text-white">
          Начать
        </button>
      </div>
    </div>
  )
}

export function Header({ userName, lang, setLang, onLogout, onProfile, theme, setTheme, T }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  return (
    <div className={`flex items-center justify-between px-3 py-3 border-b ${T.border} gap-2`}>
      <button onClick={onProfile}
        className={`flex items-center gap-2 ${T.card} ${T.cardHover} px-2 py-1.5 rounded-lg transition-colors min-w-0`}>
        <span className={`${T.sub} text-sm truncate max-w-[100px]`}>👋 <span className="font-semibold">{userName}</span></span>
        <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full shrink-0">{history.length}</span>
      </button>
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`text-base px-2 py-1 ${T.card} ${T.cardHover} rounded-lg transition-colors`}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className={`flex gap-1 ${T.card} rounded-lg p-1`}>
          <button onClick={() => setLang('ru')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === 'ru' ? 'bg-blue-600 text-white' : T.cardHover}`}>
            RU
          </button>
          <button onClick={() => setLang('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : T.cardHover}`}>
            EN
          </button>
        </div>
        <button onClick={onLogout} className={`text-xs ${T.sub} hover:text-red-400 transition-colors`}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export function ProfileScreen({ userName, onBack, onLogout, T }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  const totalGames = history.length
  const avgScore = totalGames ? Math.round(history.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / totalGames) : 0
  const bestScore = totalGames ? Math.max(...history.map(r => Math.round((r.score / r.total) * 100))) : 0
  const bestStreak = totalGames ? Math.max(...history.map(r => r.maxStreak || 0)) : 0

  return (
    <div className="max-w-md mx-auto pt-8 p-4">
      <button onClick={onBack} className={`${T.sub} hover:text-blue-400 mb-6 block text-sm`}>← Назад</button>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🧑‍💻</div>
        <h2 className="text-xl font-bold">{userName}</h2>
        <p className={`${T.sub} text-sm`}>{totalGames} игр сыграно</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { val: avgScore + '%', label: 'средний результат', color: 'text-blue-400' },
          { val: bestScore + '%', label: 'лучший результат', color: 'text-green-400' },
          { val: bestStreak, label: 'макс. серия', color: 'text-yellow-400' },
          { val: totalGames, label: 'всего игр', color: 'text-purple-400' },
        ].map((s, i) => (
          <div key={i} className={`${T.card} rounded-xl p-4 text-center`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            <div className={`text-xs ${T.sub} mt-1`}>{s.label}</div>
          </div>
        ))}
      </div>
      <button onClick={onLogout}
        className="w-full bg-red-800 hover:bg-red-700 text-white p-3 rounded-lg font-medium transition-colors text-sm">
        Сменить игрока
      </button>
    </div>
  )
}
