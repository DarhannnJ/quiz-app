export default function Results({ result, onRestart, onHistory, T }) {
  const percent = Math.round((result.score / result.total) * 100)
  const emoji = percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '😅'
  const times = result.timePerQuestion || []
  const avgTime = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : null
  const minTime = times.length ? Math.min(...times).toFixed(1) : null
  const maxTime = times.length ? Math.max(...times).toFixed(1) : null

  const share = () => {
    const text = `Я прошёл Quiz на ${percent}%! Серия: ${result.maxStreak || 0} подряд. Попробуй побить!`
    navigator.clipboard.writeText(text).then(() => alert('Скопировано!'))
  }

  return (
    <div className="max-w-md mx-auto pt-8 p-4 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold mb-1">Результат</h2>
      <p className="text-5xl font-bold text-blue-400 mb-1">{result.score}/{result.total}</p>
      <p className={`${T.sub} mb-1`}>{percent}% правильных</p>
      <p className="text-xl font-bold mb-2">
        {percent >= 80 ? '🎉 Отлично!' : percent >= 50 ? '👍 Неплохо!' : '📚 Можно лучше!'}
      </p>
      {result.totalTime && (
        <p className={`${T.sub} text-sm mb-3`}>⏱ Время прохождения: {result.totalTime}с</p>
      )}
      {result.maxStreak > 0 && (
        <p className="text-yellow-400 font-medium mb-4">🔥 Макс. серия: {result.maxStreak} подряд</p>
      )}

      {avgTime && (
        <div className={`${T.card} rounded-xl p-4 mb-4 grid grid-cols-3 gap-3 text-center`}>
          <div>
            <div className="text-xl font-bold text-blue-400">{avgTime}с</div>
            <div className={`text-xs ${T.sub} mt-1`}>среднее</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-400">{minTime}с</div>
            <div className={`text-xs ${T.sub} mt-1`}>быстрый</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-400">{maxTime}с</div>
            <div className={`text-xs ${T.sub} mt-1`}>медленный</div>
          </div>
        </div>
      )}

      {times.length > 0 && (
        <div className={`${T.card} rounded-xl p-4 mb-4`}>
          <p className={`text-xs ${T.sub} mb-3 text-left`}>Время по вопросам:</p>
          <div className="flex items-end gap-1 h-12">
            {times.map((t, i) => (
              <div key={i} className="flex-1 bg-blue-500 rounded-sm"
                style={{ height: `${Math.min((t / 15) * 100, 100)}%` }} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <button onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors text-sm">
          Заново
        </button>
        <button onClick={onHistory}
          className={`${T.card} ${T.cardHover} p-3 rounded-lg font-medium transition-colors text-sm border ${T.border}`}>
          История
        </button>
      </div>
      <button onClick={share}
        className="w-full bg-green-700 hover:bg-green-600 text-white p-3 rounded-lg font-medium transition-colors text-sm">
        📤 Поделиться
      </button>
    </div>
  )
}
