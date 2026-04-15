export default function Sidebar({ screen, setScreen, onLogout, userName, T }) {
  const nav = [
    { id: 'home', label: 'Главная', icon: '🏠' },
    { id: 'history', label: 'История', icon: '📊' },
    { id: 'profile', label: 'Профиль', icon: '👤' },
  ]

  return (
    <aside className={`hidden md:flex flex-col w-56 min-h-screen fixed left-0 top-0 ${T.card} border-r ${T.border}`}>
      <div className={`flex items-center gap-2 px-4 py-5 border-b ${T.border}`}>
        <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center text-white font-bold text-sm">?</div>
        <span className="font-bold text-base">DevQuiz</span>
      </div>

      <nav className="flex-1 py-4">
        {nav.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-[13px] transition-colors
              ${screen === item.id
                ? 'bg-[#6C63FF]/10 border-r-2 border-[#6C63FF] text-[#6C63FF] font-medium'
                : `${T.sub} ${T.cardHover}`}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={`border-t ${T.border} p-4`}>
        <p className={`text-xs ${T.sub} mb-2 truncate`}>👋 {userName}</p>
        <button onClick={onLogout} className={`text-xs ${T.sub} hover:text-red-400 transition-colors`}>
          Выйти
        </button>
      </div>
    </aside>
  )
}
