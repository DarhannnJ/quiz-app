export default function History({ onBack, T }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')

  return (
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
}
