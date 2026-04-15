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
  const letters = ['A', 'B', 'C', 'D']
  const timerColor = timeLeft <= 3 ? 'text-red-400 animate-bounce' : timeLeft <= 5 ? 'text-orange-400' : T.sub
  const barColor = timeLeft <= 3 ? 'bg-red-500 animate-pulse' : timeLeft <= 5 ? 'bg-orange-500' : 'bg-[#6C63FF]'

  // Мобильный вид
  const MobileView = () => (
    <div className="max-w-2xl mx-auto p-4 pt-6">
      {comboMsg && <div className="text-center text-xl font-bold mb-3 animate-bounce text-yellow-400">{comboMsg}</div>}
      <div className="flex justify-between text-sm mb-2">
        <span className={T.sub}>Вопрос {current + 1} / {questions.length}</span>
        <span className={timerColor}>⏱ {timeLeft}с</span>
      </div>
      <div className={`w-full rounded-full h-2 mb-4 ${T.card}`}>
        <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>
      <h2 className="text-base font-semibold mb-5 leading-snug">{q.question}</h2>
      <div className="grid grid-cols-1 gap-3">
        {q.answers.map((ans, i) => {
          let style = `${T.card} ${T.cardHover} cursor-pointer border ${T.border}`
          if (selected !== null) {
            if (ans === q.correct) style = 'bg-green-600 text-white border-green-600'
            else if (ans === selected) style = 'bg-red-600 text-white border-red-600'
            else style = `${T.card} opacity-50 border ${T.border}`
          }
          return (
            <button key={ans} onClick={() => selected === null && handleAnswer(ans)}
              className={`${style} p-3 rounded-lg text-left text-sm transition-all`}>
              <span className="font-bold mr-2">{letters[i]}.</span>{ans}
            </button>
          )
        })}
      </div>
    </div>
  )

  // Десктопный вид
  const DesktopView = () => (
    <div className="flex h-[calc(100vh-53px)]">
      {/* Левый сайдбар с вопросами */}
      <div className="w-64 bg-white border-r border-[#ebe8ff] flex flex-col p-4 overflow-y-auto">
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#2d2b55]">{config.category === 18 ? '💻 Computer Science' : config.category === 17 ? '🔬 Science & Nature' : '🌍 General Knowledge'}</p>
          <p className="text-xs text-[#9990c8] mt-1">{current} из {questions.length} вопросов</p>
        </div>
        <div className="flex flex-col gap-2">
          {questions.map((_, i) => {
            const isPast = i < current
            const isCurrent = i === current
            return (
              <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors
                ${isCurrent ? 'bg-[#f0eeff] border border-[#c9c3f5] text-[#5348b5] font-medium' :
                  isPast ? 'text-green-500' : 'text-[#9990c8]'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                  ${isCurrent ? 'bg-[#6C63FF] text-white' :
                    isPast ? 'bg-green-100 text-green-600' : 'bg-[#f0eeff] text-[#9990c8]'}`}>
                  {isPast ? '✓' : i + 1}
                </div>
                <span className="truncate">Вопрос {i + 1}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Правая часть */}
      <div className="flex-1 flex flex-col bg-[#f8f7ff] overflow-y-auto">
        {/* Топбар */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-[#ebe8ff]">
          <span className="text-sm text-[#2d2b55]">Вопрос {current + 1} из {questions.length}</span>
          <div className={`flex items-center gap-2 px-3 py-1.5 bg-[#f0eeff] rounded-lg ${timerColor}`}>
            <span>⏱</span>
            <span className="text-sm font-medium">{timeLeft}с</span>
          </div>
        </div>

        {/* Прогресс */}
        <div className="h-1 bg-[#ede9ff]">
          <div className={`${barColor} h-1 transition-all`} style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>

        {/* Вопрос */}
        <div className="flex-1 p-6">
          {comboMsg && <div className="text-center text-2xl font-bold mb-4 animate-bounce text-yellow-400">{comboMsg}</div>}

          <div className="bg-white border border-[#ebe8ff] rounded-xl p-5 mb-5">
            <p className="text-xs text-[#9990c8] mb-3">Вопрос {current + 1} · {config.difficulty}</p>
            <p className="text-base font-medium text-[#2d2b55] leading-relaxed">{q.question}</p>
          </div>

          {/* Ответы 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            {q.answers.map((ans, i) => {
              let style = 'bg-white border-[1.5px] border-[#ebe8ff] hover:border-[#6C63FF] hover:bg-[#f5f3ff] cursor-pointer'
              if (selected !== null) {
                if (ans === q.correct) style = 'border-[1.5px] border-[#1d9e75] bg-[#edfaf5]'
                else if (ans === selected) style = 'border-[1.5px] border-[#e24b4a] bg-[#fdeaea]'
                else style = 'bg-white border-[1.5px] border-[#ebe8ff] opacity-50'
              }
              return (
                <button key={ans} onClick={() => selected === null && handleAnswer(ans)}
                  className={`${style} p-4 rounded-xl text-left transition-all flex items-center gap-3`}>
                  <div className="w-7 h-7 rounded-full bg-[#f0eeff] text-[#6C63FF] flex items-center justify-center text-xs font-bold shrink-0">
                    {letters[i]}
                  </div>
                  <span className="text-sm text-[#2d2b55]">{ans}</span>
                </button>
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
