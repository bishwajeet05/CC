import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ConverterProps {
  category: string
  fromUnit: string
  toUnit: string
}

export default function Converter({ category, fromUnit, toUnit }: ConverterProps) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConvert = async () => {
    if (!value) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: Number(value),
          from: fromUnit,
          to: toUnit,
          category,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed')
      }

      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {fromUnit}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter value"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {toUnit}
          </label>
          <input
            type="text"
            value={result !== null ? result.toString() : ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-white"
            placeholder="Result"
          />
        </div>
      </div>

      <button
        onClick={handleConvert}
        disabled={loading || !value}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <LoadingSpinner /> : 'Convert'}
      </button>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
} 