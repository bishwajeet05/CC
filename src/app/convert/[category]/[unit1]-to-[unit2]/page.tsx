import { Metadata } from 'next'
import Converter from '@/components/Converter'

interface Props {
  params: {
    category: string
    unit1: string
    unit2: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, unit1, unit2 } = params
  const title = `Convert ${unit1} to ${unit2} | Unit Converter`
  const description = `Convert ${unit1} to ${unit2} with our easy to use unit converter. Get instant and accurate ${category} conversions.`

  return {
    title,
    description,
  }
}

export default function ConversionPage({ params }: Props) {
  const { category, unit1, unit2 } = params

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Convert {unit1} to {unit2}
      </h1>
      <Converter
        category={category}
        fromUnit={unit1}
        toUnit={unit2}
      />
    </div>
  )
} 