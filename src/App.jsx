import { useState } from 'react'
import CategorySelect from './components/CategorySelect'
import Quiz from './components/Quiz'
import Results from './components/Results'
import History from './components/History'
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
      <Header userName={userName} lang={lang} setLang={setLang} onLogout={logout}
        onProfile={() => setScreen('profile')} theme={theme} setTheme={handleTheme} T={T} />

      {screen === 'home' && (
        <CategorySelect lang={lang} T={T} onStart={(config) => { setQuizConfig({...config, lang}); setScreen('quiz') }} />
      )}
      {screen === 'quiz' && (
        <Quiz config={quizConfig} T={T} onFinish={(result) => { setLastResult(result); setScreen('results') }} />
      )}
      {screen === 'results' && (
        <Results result={lastResult} lang={lang} T={T} onRestart={() => setScreen('home')} onHistory={() => setScreen('history')} />
      )}
      {screen === 'history' && (
        <History lang={lang} T={T} onBack={() => setScreen('home')} />
      )}
      {screen === 'profile' && (
        <ProfileScreen userName={userName} T={T} onBack={() => setScreen('home')} onLogout={logout} />
      )}
    </div>
  )
}
