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
    <div className="max-w-md mx-auto pt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Quiz App</h1>
      <p className="text-gray-400 mb-3 text-sm">{lang === 'ru' ? 'Категория:' : 'Category:'}</p>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-gray-800 rounded-xl p-3">
            <p className="text-sm font-medium mb-2 text-gray-300">{cat.name}</p>
            <div className="grid grid-cols-3 gap-2">
              {difficulties.map(diff => (
                <button key={diff.val} onClick={() => onStart({ category: cat.id, difficulty: diff.val })}
                  className="bg-gray-700 hover:bg-blue-600 active:bg-blue-700 transition-colors p-2 rounded-lg text-sm font-medium">
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
