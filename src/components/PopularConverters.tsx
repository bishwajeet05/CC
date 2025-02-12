import Link from 'next/link'

const popularConversions = [
  { from: 'kilometers', to: 'miles', category: 'length' },
  { from: 'kilograms', to: 'pounds', category: 'mass' },
  { from: 'celsius', to: 'fahrenheit', category: 'temperature' },
  { from: 'meters', to: 'feet', category: 'length' },
  { from: 'liters', to: 'gallons', category: 'volume' },
  { from: 'hours', to: 'minutes', category: 'time' },
]

export default function PopularConverters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {popularConversions.map(({ from, to, category }) => (
        <Link
          key={`${from}-${to}`}
          href={`/convert/${category}/${from}-to-${to}`}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {from} to {to}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {category}
          </p>
        </Link>
      ))}
    </div>
  )
} 