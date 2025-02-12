import SearchBar from '@/components/SearchBar'
import PopularConverters from '@/components/PopularConverters'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Unit Converter</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Convert between different units of measurement quickly and easily
        </p>
      </section>

      <SearchBar />
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Conversions</h2>
        <PopularConverters />
      </section>
    </div>
  )
} 