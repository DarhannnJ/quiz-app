export default function CategorySelect({ onStart, lang, T, userName }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')
  const totalGames = history.length
  const avgScore = totalGames ? Math.round(history.reduce((a, r) => a + (r.score / r.total) * 100, 0) / totalGames) : 0
  const totalCorrect = history.reduce((a, r) => a + r.score, 0)
  const totalWrong = history.reduce((a, r) => a + (r.total - r.score), 0)

  const categories = lang === 'ru' ? [
    { id: 18, name: '💻 Компьютерные науки' },
    { id: 17, name: '🔬 Наука и природа' },
    { id: 9,  name: '🌍 Общие знания' },
  ] : [
    { id: 18, name: '💻 Computer Science' },
    { id: 17, name: '🔬 Science & Nature' },
    { id: 9,  name: '🌍 General Knowledge' },
  ]

  const difficulties = lang === 'ru'
    ? [{ val: 'easy', label: 'Легко' }, { val: 'medium', label: 'Средне' }, { val: 'hard', label: 'Сложно' }]
    : [{ val: 'easy', label: 'Easy' }, { val: 'medium', label: 'Medium' }, { val: 'hard', label: 'Hard' }]

  const getBadge = (score, total) => {
    const p = Math.round((score / total) * 100)
    if (p >= 80) return { bg: 'bg-[#e7faf3] text-[#1d7d4a]', label: p + '%' }
    if (p >= 50) return { bg: 'bg-[#fff3d6] text-[#a07010]', label: p + '%' }
    return { bg: 'bg-[#fdeaea] text-[#a32d2d]', label: p + '%' }
  }

  // Мобильный вид
  const MobileView = () => (
    <div className="max-w-md mx-auto pt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Quiz App</h1>
      <p className={`${T.sub} mb-3 text-sm`}>{lang === 'ru' ? 'Категория:' : 'Category:'}</p>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <div key={cat.id} className={`${T.card} rounded-xl p-3`}>
            <p className={`text-sm font-medium mb-2 ${T.sub}`}>{cat.name}</p>
            <div className="grid grid-cols-3 gap-2">
              {difficulties.map(diff => (
                <button key={diff.val} onClick={() => onStart({ category: cat.id, difficulty: diff.val })}
                  className={`${T.card} ${T.cardHover} transition-colors p-2 rounded-lg text-sm font-medium border ${T.border}`}>
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Десктопный вид
  const DesktopView = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-[#2d2b55] mb-6">
        Добро пожаловать, <span className="text-[#6C63FF]">{userName}</span>!
      </h2>

      {/* Статистика */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { val: totalGames, label: 'Квизов пройдено', color: 'text-[#6C63FF]' },
          { val: avgScore + '%', label: 'Средний балл', color: 'text-green-500' },
          { val: totalCorrect, label: 'Правильных', color: 'text-orange-400' },
          { val: totalWrong, label: 'Ошибок', color: 'text-red-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#ebe8ff] rounded-xl p-4">
            <div className={`text-[22px] font-medium ${s.color}`}>{s.val}</div>
            <div className="text-[11px] text-[#9990c8] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Контент */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Категории */}
        <div className="bg-white border border-[#ebe8ff] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#2d2b55] mb-4">Выбор категории</h3>
          <div className="flex flex-col gap-3">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-3">
                <span className="text-sm text-[#2d2b55] w-44">{cat.name}</span>
                <div className="flex gap-2">
                  {difficulties.map(diff => (
                    <button key={diff.val} onClick={() => onStart({ category: cat.id, difficulty: diff.val })}
                      className="border border-[#ebe8ff] hover:border-[#6C63FF] hover:text-[#6C63FF] text-[#9990c8] text-[13px] px-3 py-1.5 rounded-lg transition-colors">
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Последние попытки */}
        <div className="bg-white border border-[#ebe8ff] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#2d2b55] mb-4">Последние попытки</h3>
          {history.length === 0 && <p className="text-[#9990c8] text-sm">Пока нет игр</p>}
          <div className="flex flex-col gap-2">
            {history.slice(0, 5).map((r, i) => {
              const badge = getBadge(r.score, r.total)
              return (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-[#9990c8] capitalize text-xs">{r.config?.difficulty}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.bg}`}>{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="md:hidden"><MobileView /></div>
      <div className="hidden md:block"><DesktopView /></div>
    </>
  )
}
