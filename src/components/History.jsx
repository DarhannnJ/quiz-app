export default function History({ onBack }) {
  const history = JSON.parse(localStorage.getItem('quiz_history_' + (localStorage.getItem('userName') || 'guest')) || '[]')

  return (
    <div className="max-w-md mx-auto pt-12 p-6">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 block">← Назад</button>
      <h2 className="text-2xl font-bold mb-6">История</h2>

      {history.length === 0 && <p className="text-gray-500">Пока нет результатов</p>}

      <div className="grid gap-3">
        {history.map((r, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg flex justify-between">
            <span className="capitalize text-gray-400">{r.config?.difficulty}</span>
            <span className="font-bold">{r.score}/{r.total}</span>
            <span className="text-gray-500 text-sm">{new Date(r.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
