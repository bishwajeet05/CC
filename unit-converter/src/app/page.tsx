'use client';

import PopularConverters from '@/components/PopularConverters';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Modern Unit Converter</span>
            <span className="block text-purple-600 dark:text-purple-400">Fast & Easy Conversions</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Convert between different units of measurement quickly and accurately. Support for length, weight, temperature, and more.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar />
        </div>

        <PopularConverters />
      </div>
    </div>
  );
}
