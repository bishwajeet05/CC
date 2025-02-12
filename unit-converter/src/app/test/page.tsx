'use client';

import { useState } from 'react';
import { runConversionTests } from '@/lib/test-conversions';

export default function TestPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ total: number; passed: number; failed: number } | null>(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const testResults = await runConversionTests();
      setResults(testResults);
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Conversion Tests</h1>
        
        <div className="mb-8">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <h2 className="text-xl font-semibold mb-4">Test Results</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Tests</p>
                  <p className="text-2xl font-bold">{results.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{results.passed}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{results.failed}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <h2 className="text-xl font-semibold mb-2">Success Rate</h2>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${(results.passed / results.total) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {((results.passed / results.total) * 100).toFixed(1)}% Success Rate
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check the browser console for detailed test results.
          </p>
        </div>
      </div>
    </main>
  );
} 