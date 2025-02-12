import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import Converter from '@/components/Converter';

const validConversions = {
  length: ['meters', 'feet', 'inches', 'centimeters', 'kilometers', 'miles', 'yards'],
  weight: ['kilograms', 'pounds', 'grams', 'ounces', 'metric-tons'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  volume: ['liters', 'gallons', 'milliliters', 'cubic-meters', 'cubic-feet'],
  speed: ['kph', 'mph', 'mps', 'knots'],
  time: ['minutes', 'seconds', 'hours', 'days'],
  area: ['square-meters', 'square-feet', 'acres', 'hectares'],
  pressure: ['pascal', 'bar', 'psi'],
  torque: ['newton-meter', 'pound-foot', 'pound-inch'],
  force: ['newton', 'dyne', 'pound-force'],
  energy: ['joules', 'kilowatt-hours', 'calories', 'btu'],
  power: ['watts', 'horsepower', 'kilowatts'],
  voltage: ['volt', 'millivolt', 'kilovolt'],
  current: ['ampere', 'milliampere', 'kiloampere'],
  resistance: ['ohm', 'kiloohm', 'megaohm'],
  capacitance: ['farad', 'microfarad', 'picofarad'],
  inductance: ['henry', 'millihenry', 'microhenry'],
  'data-storage': ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes'],
  'data-transfer': ['kbps', 'mbps', 'gbps'],
  cooking: ['cup', 'gram', 'tablespoon', 'milliliter'],
  'fuel-efficiency': ['mpg', 'kmpl', 'lper100km'],
  density: ['kg-per-cubic-meter', 'g-per-cubic-centimeter', 'pounds-per-cubic-foot'],
  angle: ['degrees', 'radians', 'gradians']
};

// Validate if the conversion is supported
const isValidConversion = (category: string, unit1: string, unit2: string): boolean => {
  // Check if category exists
  if (!(category in validConversions)) {
    return false;
  }

  const validUnits = validConversions[category as keyof typeof validConversions];
  
  // Check if both units are valid for this category
  return validUnits.includes(unit1) && validUnits.includes(unit2);
};

type PageProps = {
  params: {
    category: string;
    unit1: string;
    unit2: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, unit1, unit2 } = params;

  if (!category || !unit1 || !unit2 || !isValidConversion(category, unit1, unit2)) {
    return {
      title: 'Invalid Conversion | Modern Unit Converter',
      description: 'The requested conversion is not supported.',
    };
  }

  const from = unit1.replace(/-/g, ' ');
  const to = unit2.replace(/-/g, ' ');
  const title = `Convert ${from} to ${to} | Modern Unit Converter`;
  const description = `Quick and accurate ${category} conversion from ${from} to ${to}. Free online unit converter with instant results.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/convert/${category}/${unit1}-to-${unit2}`,
      images: [
        {
          url: `/api/og?category=${category}&from=${from}&to=${to}`,
          width: 1200,
          height: 630,
          alt: `Convert ${from} to ${to}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?category=${category}&from=${from}&to=${to}`],
    },
  };
}

export default function ConversionPage({ params }: PageProps) {
  const { category, unit1, unit2 } = params;

  // Validate parameters
  if (!category || !unit1 || !unit2 || !isValidConversion(category, unit1, unit2)) {
    notFound();
  }

  const from = unit1.replace(/-/g, ' ');
  const to = unit2.replace(/-/g, ' ');

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Convert {from} to {to}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Quick and accurate {category} conversion
        </p>
      </div>

      <Converter
        from={from}
        to={to}
        category={category}
      />

      <div className="mt-8 prose dark:prose-invert mx-auto">
        <h2>How to convert {from} to {to}</h2>
        <p>
          To convert from {from} to {to}, simply enter the value in the input field above.
          The converter will automatically calculate the result for you in real-time.
        </p>
        <h2>Common {category} conversions</h2>
        <ul>
          <li>{from} to {to}</li>
          <li>{to} to {from}</li>
        </ul>
      </div>
    </main>
  );
} 