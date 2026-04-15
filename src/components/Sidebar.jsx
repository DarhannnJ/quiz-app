export default function Sidebar({ screen, setScreen, onLogout, userName }) {
  const nav = [
    { id: 'home', label: 'Главная', icon: '🏠' },
    { id: 'history', label: 'История', icon: '📊' },
    { id: 'profile', label: 'Профиль', icon: '👤' },
  ]

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen fixed left-0 top-0 bg-white border-r border-[#ebe8ff]">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#ebe8ff]">
        <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center text-white font-bold text-sm">?</div>
        <span className="font-bold text-base text-[#2d2b55]">DevQuiz</span>
      </div>

      <nav className="flex-1 py-4">
        {nav.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-[13px] transition-colors
              ${screen === item.id
                ? 'bg-[#f0eeff] border-r-2 border-[#6C63FF] text-[#5348b5] font-medium'
                : 'text-[#8882b5] hover:bg-[#f8f7ff]'}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-[#ebe8ff] p-4">
        <p className="text-xs text-[#9990c8] mb-2 truncate">👋 {userName}</p>
        <button onClick={onLogout} className="text-xs text-[#9990c8] hover:text-red-400 transition-colors">
          Выйти
        </button>
      </div>
    </aside>
  )
}
