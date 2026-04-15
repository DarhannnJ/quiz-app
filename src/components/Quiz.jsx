import { useQuiz } from '../hooks/useQuiz'
import { saveResult } from '../utils/helpers'

export default function Quiz({ config, onFinish }) {
  const handleFinish = (result) => {
    saveResult(result)
    onFinish(result)
  }

  const { questions, current, score, selected, timeLeft, loading, error, comboMsg, handleAnswer } = useQuiz(config, handleFinish)

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-3">
      <div className="animate-spin text-4xl">⚙️</div>
      <div className="text-xl">Загрузка вопросов...</div>
    </div>
  )
  if (error) return <div className="flex items-center justify-center h-[80vh] text-red-400">{error}</div>

  const q = questions[current]
  const timerColor = timeLeft <= 3 ? 'text-red-400 animate-bounce' : timeLeft <= 5 ? 'text-orange-400' : 'text-gray-400'
  const barColor = timeLeft <= 3 ? 'bg-red-500 animate-pulse' : timeLeft <= 5 ? 'bg-orange-500' : 'bg-blue-500'

  return (
    <div className="max-w-2xl mx-auto p-6 pt-8">
      {/* Комбо */}
      {comboMsg && (
        <div className="text-center text-2xl font-bold mb-4 animate-bounce text-yellow-400">
          {comboMsg}
        </div>
      )}

      {/* Прогресс */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Вопрос {current + 1} / {questions.length}</span>
        <span className={timerColor}>⏱ {timeLeft}с</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>

      {/* Счёт */}
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>✅ {score} правильных</span>
        <span>Таймер: {Math.round((timeLeft / 15) * 100)}%</span>
      </div>

      {/* Вопрос */}
      <h2 className="text-xl font-semibold mb-6">{q.question}</h2>

      {/* Ответы */}
      <div className="grid grid-cols-1 gap-3">
        {q.answers.map((ans) => {
          let style = 'bg-gray-800 hover:bg-gray-700 cursor-pointer'
          if (selected !== null) {
            if (ans === q.correct) style = 'bg-green-600'
            else if (ans === selected) style = 'bg-red-600'
            else style = 'bg-gray-800 opacity-50'
          }
          return (
            <button key={ans} onClick={() => selected === null && handleAnswer(ans)}
              className={`${style} p-4 rounded-lg text-left transition-all duration-300`}>
              {ans}
            </button>
          )
        })}
      </div>
    </div>
  )
}
