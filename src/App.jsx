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
  const { userName, saveName, logout } = useProfile()
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!userName && <NameModal onSave={saveName} />}

      <Header
        userName={userName}
        lang={lang}
        setLang={setLang}
        onLogout={logout}
        onProfile={() => setScreen('profile')}
      />

      {screen === 'home' && (
        <CategorySelect lang={lang} onStart={(config) => { setQuizConfig({...config, lang}); setScreen('quiz') }} />
      )}
      {screen === 'quiz' && (
        <Quiz config={quizConfig} onFinish={(result) => { setLastResult(result); setScreen('results') }} />
      )}
      {screen === 'results' && (
        <Results result={lastResult} lang={lang} onRestart={() => setScreen('home')} onHistory={() => setScreen('history')} />
      )}
      {screen === 'history' && (
        <History lang={lang} onBack={() => setScreen('home')} />
      )}
      {screen === 'profile' && (
        <ProfileScreen userName={userName} onBack={() => setScreen('home')} onLogout={logout} />
      )}
    </div>
  )
}
