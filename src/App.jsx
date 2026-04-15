import { useState } from 'react'
import CategorySelect from './components/CategorySelect'
import Quiz from './components/Quiz'
import Results from './components/Results'
import History from './components/History'
import Sidebar from './components/Sidebar'
import { useProfile, NameModal, Header, ProfileScreen } from './components/Profile'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [quizConfig, setQuizConfig] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [lang, setLang] = useState('ru')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const { userName, saveName, logout } = useProfile()

  const handleTheme = (t) => {
    setTheme(t)
    localStorage.setItem('theme', t)
  }

  const T = theme === 'dark'
    ? { bg: 'bg-gray-900', text: 'text-white', card: 'bg-gray-800', cardHover: 'hover:bg-gray-700', border: 'border-gray-800', input: 'bg-gray-700', sub: 'text-gray-400' }
    : { bg: 'bg-gray-100', text: 'text-gray-900', card: 'bg-white', cardHover: 'hover:bg-gray-100', border: 'border-gray-200', input: 'bg-gray-200', sub: 'text-gray-500' }

  return (
    <div className={`min-h-screen ${T.bg} ${T.text}`}>
      {!userName && <NameModal onSave={saveName} T={T} />}

      {/* Сайдбар — только десктоп, всегда светлый */}
      <Sidebar screen={screen} setScreen={setScreen} onLogout={logout} userName={userName} />

      <div className="md:ml-56 flex flex-col min-h-screen">

        {/* Хедер — только мобилка */}
        <div className="md:hidden">
          <Header userName={userName} lang={lang} setLang={setLang} onLogout={logout}
            onProfile={() => setScreen('profile')} theme={theme} setTheme={handleTheme} T={T} />
        </div>

        {/* Десктоп топбар — всегда светлый */}
        <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-[#ebe8ff]">
          <span className="text-sm text-[#2d2b55]">👋 Привет, <strong>{userName}</strong></span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-sm px-2 py-1 bg-[#f0eeff] rounded-lg text-[#5348b5] hover:bg-[#e4e0ff] transition-colors">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="flex gap-1 bg-[#f0eeff] rounded-lg p-1">
              <button onClick={() => setLang('ru')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === 'ru' ? 'bg-[#6C63FF] text-white' : 'text-[#8882b5] hover:bg-[#e4e0ff]'}`}>
                RU
              </button>
              <button onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === 'en' ? 'bg-[#6C63FF] text-white' : 'text-[#8882b5] hover:bg-[#e4e0ff]'}`}>
                EN
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 md:bg-[#f8f7ff] md:text-[#2d2b55]">
          {screen === 'home' && (
            <CategorySelect lang={lang} T={T} userName={userName}
              onStart={(config) => { setQuizConfig({...config, lang}); setScreen('quiz') }} />
          )}
          {screen === 'quiz' && (
            <Quiz config={quizConfig} T={T}
              onFinish={(result) => { setLastResult(result); setScreen('results') }} />
          )}
          {screen === 'results' && (
            <Results result={lastResult} lang={lang} T={T}
              onRestart={() => setScreen('home')} onHistory={() => setScreen('history')} />
          )}
          {screen === 'history' && (
            <History lang={lang} T={T} onBack={() => setScreen('home')} />
          )}
          {screen === 'profile' && (
            <ProfileScreen userName={userName} T={T}
              onBack={() => setScreen('home')} onLogout={logout} />
          )}
        </main>
      </div>
    </div>
  )
}
