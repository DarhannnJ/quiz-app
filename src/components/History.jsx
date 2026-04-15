export default function History({ onBack, T }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')

  const MobileView = () => (
    <div className="max-w-md mx-auto pt-8 p-4">
      <button onClick={onBack} className={`${T.sub} hover:text-blue-400 mb-6 block text-sm`}>← Назад</button>
      <h2 className="text-xl font-bold mb-6">История</h2>
      {history.length === 0 && <p className={`${T.sub} text-sm`}>Пока нет результатов</p>}
      <div className="flex flex-col gap-3">
        {history.map((r, i) => (
          <div key={i} className={`${T.card} p-4 rounded-xl flex justify-between items-center`}>
            <span className={`capitalize text-sm ${T.sub}`}>{r.config?.difficulty}</span>
            <span className="font-bold">{r.score}/{r.total}</span>
            <span className={`${T.sub} text-xs`}>{new Date(r.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const DesktopView = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-[#2d2b55] mb-6">История игр</h2>
      {history.length === 0 && <p className="text-[#9990c8] text-sm">Пока нет результатов</p>}
      <div className="bg-white border border-[#ebe8ff] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#ebe8ff] bg-[#f8f7ff]">
              {['Дата', 'Категория', 'Сложность', 'Результат', 'Серия'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs text-[#9990c8] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((r, i) => {
              const p = Math.round((r.score / r.total) * 100)
              const badge = p >= 80 ? 'bg-[#e7faf3] text-[#1d7d4a]' : p >= 50 ? 'bg-[#fff3d6] text-[#a07010]' : 'bg-[#fdeaea] text-[#a32d2d]'
              const catName = r.config?.category === 18 ? 'Computer Science' : r.config?.category === 17 ? 'Science' : 'General'
              return (
                <tr key={i} className={`border-b border-[#ebe8ff] ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f7ff]'}`}>
                  <td className="px-4 py-3 text-[#9990c8] text-xs">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-[#2d2b55] text-xs">{catName}</td>
                  <td className="px-4 py-3 text-[#9990c8] text-xs capitalize">{r.config?.difficulty}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge}`}>{r.score}/{r.total} ({p}%)</span>
                  </td>
                  <td className="px-4 py-3 text-[#9990c8] text-xs">{r.maxStreak || 0}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
