'use client';

import { useState, useEffect } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';

interface ConverterProps {
  from: string;
  to: string;
  category: string;
}

export default function Converter({ from, to, category }: ConverterProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const convertValue = async () => {
      if (!inputValue || isNaN(Number(inputValue))) {
        setResult(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [{ value: Number(inputValue), unit: from }],
            to,
            category,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Conversion failed');
        }

        setResult(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion failed');
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only trigger conversion if input value is not empty and is a valid number
    if (inputValue && !isNaN(Number(inputValue))) {
      const debounceTimer = setTimeout(convertValue, 300); // Reduced from 500ms to 300ms
      return () => clearTimeout(debounceTimer);
    }
  }, [inputValue, from, to, category]);

  const handleSwap = () => {
    // Implement swap functionality
    window.location.href = `/convert/${category}/${to.replace(/ /g, '-')}-to-${from.replace(/ /g, '-')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {from.charAt(0).toUpperCase() + from.slice(1)}
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder={`Enter ${from}`}
          />
        </div>

        <button
          onClick={handleSwap}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Swap units"
        >
          <ArrowsRightLeftIcon className="h-6 w-6 text-gray-500 hover:text-purple-500 dark:hover:text-purple-400" />
        </button>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {to.charAt(0).toUpperCase() + to.slice(1)}
          </label>
          <input
            type="number"
            value={result !== null ? result.toString() : ''}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Result"
          />
        </div>
      </div>

      <div className="mt-4">
        {isLoading && <LoadingSpinner />}
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
} 