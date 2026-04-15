import { useQuiz } from '../hooks/useQuiz'
import { saveResult } from '../utils/helpers'

export default function Quiz({ config, onFinish, T }) {
  const handleFinish = (result) => {
    saveResult(result)
    onFinish(result)
  }

  const { questions, current, score, selected, timeLeft, loading, error, comboMsg, handleAnswer } = useQuiz(config, handleFinish)

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-3 px-4">
      <div className="animate-spin text-4xl">⚙️</div>
      <div className="text-lg text-center">Загрузка вопросов...</div>
    </div>
  )
  if (error) return <div className="flex items-center justify-center h-[80vh] text-red-400 text-center px-4">{error}</div>

  const q = questions[current]
  const timerColor = timeLeft <= 3 ? 'text-red-400 animate-bounce' : timeLeft <= 5 ? 'text-orange-400' : T.sub
  const barColor = timeLeft <= 3 ? 'bg-red-500 animate-pulse' : timeLeft <= 5 ? 'bg-orange-500' : 'bg-blue-500'

  return (
    <div className="max-w-2xl mx-auto p-4 pt-6">
      {comboMsg && (
        <div className="text-center text-xl font-bold mb-3 animate-bounce text-yellow-400">
          {comboMsg}
        </div>
      )}
      <div className="flex justify-between text-sm mb-2">
        <span className={T.sub}>Вопрос {current + 1} / {questions.length}</span>
        <span className={timerColor}>⏱ {timeLeft}с</span>
      </div>
      <div className={`w-full rounded-full h-2 mb-4 ${T.card}`}>
        <div className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>
      <div className={`flex justify-between text-xs ${T.sub} mb-4`}>
        <span>✅ {score} правильных</span>
      </div>
      <h2 className="text-base font-semibold mb-5 leading-snug">{q.question}</h2>
      <div className="grid grid-cols-1 gap-3">
        {q.answers.map((ans) => {
          let style = `${T.card} ${T.cardHover} active:opacity-80 cursor-pointer`
          if (selected !== null) {
            if (ans === q.correct) style = 'bg-green-600 text-white'
            else if (ans === selected) style = 'bg-red-600 text-white'
            else style = `${T.card} opacity-50`
          }
          return (
            <button key={ans} onClick={() => selected === null && handleAnswer(ans)}
              className={`${style} p-3 rounded-lg text-left text-sm transition-all duration-300 leading-snug border ${T.border}`}>
              {ans}
            </button>
          )
        })}
      </div>
    </div>
  )
}
