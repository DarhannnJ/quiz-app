import { useState, useEffect, useRef } from 'react'
import { decodeHTML, shuffleArray } from '../utils/helpers'
import { questionsRU } from '../utils/questionsRU'

export function useQuiz(config, onFinish) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [comboMsg, setComboMsg] = useState('')
  const [timePerQuestion, setTimePerQuestion] = useState([])
  const questionStartTime = useRef(Date.now())
  const timerRef = useRef(null)
  const startTime = useRef(Date.now())
  
  useEffect(() => {
    if (config.lang === 'ru') {
      const key = `${config.category}_${config.difficulty}`
      const ruQuestions = questionsRU[key]
      if (ruQuestions) {
        setQuestions(ruQuestions.map(q => ({ ...q, answers: shuffleArray(q.answers) })))
        setLoading(false)
      } else {
        setError('Вопросы для этой категории не найдены')
      }
      return
    }

    const fetchWithRetry = (retries = 3) => {
      const url = `https://opentdb.com/api.php?amount=10&category=${config.category}&difficulty=${config.difficulty}&type=multiple`
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (data.response_code === 5) {
            if (retries > 0) setTimeout(() => fetchWithRetry(retries - 1), 5000)
            else setError('Слишком много запросов. Подожди немного.')
            return
          }
          if (data.response_code !== 0) throw new Error('API error: ' + data.response_code)
          const parsed = data.results.map(q => ({
            question: decodeHTML(q.question),
            correct: decodeHTML(q.correct_answer),
            answers: shuffleArray([q.correct_answer, ...q.incorrect_answers].map(decodeHTML))
          }))
          setQuestions(parsed)
          setLoading(false)
        })
        .catch(err => setError('Ошибка: ' + err.message))
    }
    fetchWithRetry()
  }, [])

  useEffect(() => {
    if (!loading) questionStartTime.current = Date.now()
  }, [current, loading])

  useEffect(() => {
    if (loading || selected !== null) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleAnswer(null); return 15 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [current, loading, selected])

  const handleAnswer = (answer) => {
    clearInterval(timerRef.current)
    setSelected(answer)

    const elapsed = (Date.now() - questionStartTime.current) / 1000
    setTimePerQuestion(prev => [...prev, elapsed])

    const isCorrect = answer === questions[current]?.correct

    if (isCorrect) {
      setScore(s => s + 1)
      setStreak(s => {
        const newStreak = s + 1
        setMaxStreak(m => Math.max(m, newStreak))
        if (newStreak === 3) setComboMsg('🔥 Combo x3!')
        else if (newStreak === 5) setComboMsg('⚡ UNSTOPPABLE!')
        else if (newStreak >= 10) setComboMsg('💎 PERFECT STREAK!')
        else setComboMsg('')
        return newStreak
      })
    } else {
      setStreak(0)
      setComboMsg('')
    }

    setTimeout(() => {
      setComboMsg('')
      if (current + 1 >= questions.length) {
        onFinish({
  	  score: score + (isCorrect ? 1 : 0),
  	  total: questions.length,
  	  config,
  	  maxStreak: Math.max(maxStreak, isCorrect ? streak + 1 : 0),
  	  timePerQuestion: [...timePerQuestion, elapsed],
  	  totalTime: Math.round((Date.now() - startTime.current) / 1000)
	})
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
        setTimeLeft(15)
      }
    }, 1000)
  }

  return { questions, current, score, selected, timeLeft, loading, error, streak, comboMsg, handleAnswer }
}
