'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { parseUnitConversion } from '@/lib/unit-parser';
import LoadingSpinner from './LoadingSpinner';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ values: { value: number; unit: string }[]; result: number | null } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performConversion = async () => {
      if (!searchQuery) {
        setSearchResult(null);
        setError(null);
        return;
      }

      const parsed = parseUnitConversion(searchQuery);
      if (!parsed) {
        setSearchResult(null);
        setError('Try something like "5 kg to lbs" or "10 meters + 30 cm to feet"');
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
            values: parsed.values,
            to: parsed.to,
            category: parsed.category,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Conversion failed');
        }

        setSearchResult({
          values: parsed.values,
          result: data.result,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion failed');
        setSearchResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performConversion, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type a conversion (e.g., '5 kg to lbs' or '10 m + 30 cm to ft')"
          className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {(isLoading || searchResult || error) && (
        <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {isLoading && <LoadingSpinner />}
          {searchResult && (
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {searchResult.values.map((v, i) => (
                  <span key={i}>
                    {i > 0 && ' + '}
                    {v.value} {v.unit}
                  </span>
                ))} = {searchResult.result?.toLocaleString()}
              </p>
            </div>
          )}
          {error && (
            <p className="text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
      )}
    </div>
  );
} 