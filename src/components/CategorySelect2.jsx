export default function CategorySelect({ onStart, lang }) {
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

  return (
    <div className="max-w-md mx-auto pt-20 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Quiz App</h1>
      <p className="text-gray-400 mb-3">{lang === 'ru' ? 'Категория:' : 'Category:'}</p>
      <div className="grid grid-cols-1 gap-3 mb-8">
        {categories.map(cat => (
          <div key={cat.id} className="grid grid-cols-3 gap-2">
            {difficulties.map(diff => (
              <button key={diff.val} onClick={() => onStart({ category: cat.id, difficulty: diff.val })}
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-sm">
                <div className="font-medium">{cat.name}</div>
                <div className="text-gray-400">{diff.label}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
