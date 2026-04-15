export default function Results({ result, onRestart, onHistory, T }) {
  const percent = Math.round((result.score / result.total) * 100)
  const times = result.timePerQuestion || []
  const avgTime = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : null
  const minTime = times.length ? Math.min(...times).toFixed(1) : null
  const maxTime = times.length ? Math.max(...times).toFixed(1) : null

  const share = () => {
    const text = `Я прошёл Quiz на ${percent}%! Серия: ${result.maxStreak || 0} подряд.`
    navigator.clipboard.writeText(text).then(() => alert('Скопировано!'))
  }

  const statusText = percent >= 80 ? 'Отличный результат!' : percent >= 50 ? 'Неплохо!' : 'Можно лучше!'

  const MobileView = () => (
    <div className="max-w-md mx-auto pt-8 p-4 text-center">
      <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '😅'}</div>
      <h2 className="text-2xl font-bold mb-1">Результат</h2>
      <p className="text-5xl font-bold text-blue-400 mb-1">{result.score}/{result.total}</p>
      <p className={`${T.sub} mb-1`}>{percent}% правильных</p>
      <p className="text-xl font-bold mb-2">{percent >= 80 ? '🎉 Отлично!' : percent >= 50 ? '👍 Неплохо!' : '📚 Можно лучше!'}</p>
      {result.totalTime && <p className={`${T.sub} text-sm mb-3`}>⏱ Время: {result.totalTime}с</p>}
      {result.maxStreak > 0 && <p className="text-yellow-400 font-medium mb-4">🔥 Макс. серия: {result.maxStreak} подряд</p>}
      {avgTime && (
        <div className={`${T.card} rounded-xl p-4 mb-4 grid grid-cols-3 gap-3 text-center`}>
          <div><div className="text-xl font-bold text-blue-400">{avgTime}с</div><div className={`text-xs ${T.sub} mt-1`}>среднее</div></div>
          <div><div className="text-xl font-bold text-green-400">{minTime}с</div><div className={`text-xs ${T.sub} mt-1`}>быстрый</div></div>
          <div><div className="text-xl font-bold text-red-400">{maxTime}с</div><div className={`text-xs ${T.sub} mt-1`}>медленный</div></div>
        </div>
      )}
      {times.length > 0 && (
        <div className={`${T.card} rounded-xl p-4 mb-4`}>
          <p className={`text-xs ${T.sub} mb-3 text-left`}>Время по вопросам:</p>
          <div className="flex items-end gap-1 h-12">
            {times.map((t, i) => <div key={i} className="flex-1 bg-blue-500 rounded-sm" style={{ height: `${Math.min((t / 15) * 100, 100)}%` }} />)}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium text-sm">Заново</button>
        <button onClick={onHistory} className={`${T.card} ${T.cardHover} p-3 rounded-lg font-medium text-sm border ${T.border}`}>История</button>
      </div>
      <button onClick={share} className="w-full bg-green-700 hover:bg-green-600 text-white p-3 rounded-lg font-medium text-sm">📤 Поделиться</button>
    </div>
  )

  const DesktopView = () => (
    <div className="flex h-[calc(100vh-53px)]">
      {/* Левая панель */}
      <div className="w-[300px] bg-[#fffaf0] border-r border-[#ebe8ff] flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 rounded-full bg-[#fff3d0] flex items-center justify-center text-4xl mb-4">
          {percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '😅'}
        </div>
        <p className="text-[#c07820] font-semibold mb-2">{statusText}</p>
        <p className="text-5xl font-medium text-[#d48a20] mb-1">{percent}%</p>
        <p className="text-xs text-[#b08040] mb-6">{result.score} из {result.total} правильных</p>

        <div className="w-full flex flex-col gap-2 mb-6">
          {[
            { label: 'Верных', val: result.score, color: 'text-green-600' },
            { label: 'Ошибок', val: result.total - result.score, color: 'text-red-500' },
            { label: 'Время', val: (result.totalTime || 0) + 'с', color: 'text-[#6C63FF]' },
            { label: 'Макс. серия', val: result.maxStreak || 0, color: 'text-orange-500' },
          ].map((s, i) => (
            <div key={i} className="flex justify-between items-center bg-[#fff8e8] rounded-lg px-3 py-2">
              <span className="text-xs text-[#b08040]">{s.label}</span>
              <span className={`text-sm font-semibold ${s.color}`}>{s.val}</span>
            </div>
          ))}
        </div>

        <button onClick={onHistory} className="w-full bg-[#6C63FF] hover:bg-[#5348b5] text-white py-2.5 rounded-xl text-sm font-medium mb-2 transition-colors">
          Попробовать снова
        </button>
        <button onClick={onRestart} className="w-full border border-[#ebe8ff] text-[#6C63FF] hover:bg-[#f0eeff] py-2.5 rounded-xl text-sm font-medium transition-colors">
          На главную
        </button>
      </div>

      {/* Правая панель — аналитика */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#f8f7ff]">
        <h3 className="text-base font-semibold text-[#2d2b55] mb-4">Аналитика</h3>

        {avgTime && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { val: avgTime + 'с', label: 'Среднее время', color: 'text-[#6C63FF]' },
              { val: minTime + 'с', label: 'Быстрый ответ', color: 'text-green-500' },
              { val: maxTime + 'с', label: 'Медленный ответ', color: 'text-red-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-[#ebe8ff] rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                <div className="text-xs text-[#9990c8] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {times.length > 0 && (
          <div className="bg-white border border-[#ebe8ff] rounded-xl p-5">
            <p className="text-xs text-[#9990c8] mb-4">Время по вопросам:</p>
            <div className="flex items-end gap-2 h-20">
              {times.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="bg-[#6C63FF] rounded-sm w-full transition-all" style={{ height: `${Math.min((t / 15) * 100, 100)}%` }} />
                  <span className="text-[10px] text-[#9990c8]">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={share} className="mt-4 w-full border border-[#ebe8ff] bg-white hover:bg-[#f0eeff] text-[#6C63FF] py-2.5 rounded-xl text-sm font-medium transition-colors">
          📤 Поделиться результатом
        </button>
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
