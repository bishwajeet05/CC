'use client';

interface TestCase {
  category: string;
  from: string;
  to: string;
  value: number;
  expectedResult: number;
  tolerance?: number;
}

const testCases: TestCase[] = [
  // Length conversions
  { category: 'length', from: 'meters', to: 'feet', value: 1, expectedResult: 3.28084, tolerance: 0.0001 },
  { category: 'length', from: 'kilometers', to: 'miles', value: 1, expectedResult: 0.621371, tolerance: 0.0001 },
  
  // Weight conversions
  { category: 'weight', from: 'kilograms', to: 'pounds', value: 1, expectedResult: 2.20462, tolerance: 0.0001 },
  { category: 'weight', from: 'grams', to: 'ounces', value: 100, expectedResult: 3.5274, tolerance: 0.0001 },
  
  // Temperature conversions
  { category: 'temperature', from: 'celsius', to: 'fahrenheit', value: 0, expectedResult: 32, tolerance: 0.1 },
  { category: 'temperature', from: 'celsius', to: 'kelvin', value: 0, expectedResult: 273.15, tolerance: 0.01 },
  
  // Speed conversions
  { category: 'speed', from: 'kph', to: 'mph', value: 100, expectedResult: 62.1371, tolerance: 0.0001 },
  { category: 'speed', from: 'mps', to: 'kph', value: 1, expectedResult: 3.6, tolerance: 0.0001 },
  
  // Volume conversions
  { category: 'volume', from: 'liters', to: 'gallons', value: 1, expectedResult: 0.264172, tolerance: 0.0001 },
  { category: 'volume', from: 'milliliters', to: 'ounces', value: 100, expectedResult: 3.3814, tolerance: 0.0001 },
  
  // Area conversions
  { category: 'area', from: 'square_meters', to: 'square_feet', value: 1, expectedResult: 10.7639, tolerance: 0.0001 },
  { category: 'area', from: 'hectares', to: 'acres', value: 1, expectedResult: 2.47105, tolerance: 0.0001 },
  
  // Pressure conversions
  { category: 'pressure', from: 'pascal', to: 'bar', value: 100000, expectedResult: 1, tolerance: 0.0001 },
  { category: 'pressure', from: 'bar', to: 'psi', value: 1, expectedResult: 14.5038, tolerance: 0.0001 },
  
  // Energy conversions
  { category: 'energy', from: 'joules', to: 'kilowatt_hours', value: 3600000, expectedResult: 1, tolerance: 0.0001 },
  { category: 'energy', from: 'calories', to: 'joules', value: 1, expectedResult: 4.184, tolerance: 0.0001 },
  
  // Power conversions
  { category: 'power', from: 'watts', to: 'horsepower', value: 745.7, expectedResult: 1, tolerance: 0.001 },
  { category: 'power', from: 'kilowatts', to: 'horsepower', value: 1, expectedResult: 1.34102, tolerance: 0.0001 },
  
  // Data storage conversions
  { category: 'data_storage', from: 'megabytes', to: 'gigabytes', value: 1024, expectedResult: 1, tolerance: 0.0001 },
  { category: 'data_storage', from: 'kilobytes', to: 'bytes', value: 1, expectedResult: 1024, tolerance: 0 },
  
  // Time conversions
  { category: 'time', from: 'minutes', to: 'seconds', value: 1, expectedResult: 60, tolerance: 0 },
  { category: 'time', from: 'hours', to: 'minutes', value: 1, expectedResult: 60, tolerance: 0 },
  
  // Angle conversions
  { category: 'angle', from: 'degrees', to: 'radians', value: 180, expectedResult: Math.PI, tolerance: 0.0001 },
  { category: 'angle', from: 'degrees', to: 'gradians', value: 90, expectedResult: 100, tolerance: 0.0001 },
  
  // Fuel efficiency conversions
  { category: 'fuel_efficiency', from: 'mpg', to: 'kmpl', value: 1, expectedResult: 0.425144, tolerance: 0.0001 },
  
  // Density conversions
  { category: 'density', from: 'kg_per_cubic_meter', to: 'g_per_cubic_centimeter', value: 1000, expectedResult: 1, tolerance: 0.0001 },
  
  // Torque conversions
  { category: 'torque', from: 'newton_meter', to: 'pound_foot', value: 1, expectedResult: 0.737562, tolerance: 0.0001 },
  
  // Force conversions
  { category: 'force', from: 'newton', to: 'dyne', value: 1, expectedResult: 100000, tolerance: 0.1 },
  
  // Electrical conversions
  { category: 'voltage', from: 'volt', to: 'millivolt', value: 1, expectedResult: 1000, tolerance: 0 },
  { category: 'current', from: 'ampere', to: 'milliampere', value: 1, expectedResult: 1000, tolerance: 0 },
  { category: 'resistance', from: 'ohm', to: 'kiloohm', value: 1000, expectedResult: 1, tolerance: 0.0001 },
  { category: 'capacitance', from: 'farad', to: 'microfarad', value: 1, expectedResult: 1000000, tolerance: 0.1 },
  { category: 'inductance', from: 'henry', to: 'millihenry', value: 1, expectedResult: 1000, tolerance: 0 },
  
  // Cooking conversions
  { category: 'cooking', from: 'cup', to: 'gram', value: 1, expectedResult: 236.588, tolerance: 0.001 },
];

export async function runConversionTests() {
  console.log('Starting conversion tests...\n');
  let passedTests = 0;
  let failedTests = 0;

  for (const test of testCases) {
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [{ value: test.value, unit: test.from }],
          to: test.to,
          category: test.category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }

      const result = data.result;
      const tolerance = test.tolerance || 0;
      const isWithinTolerance = Math.abs(result - test.expectedResult) <= tolerance;

      if (isWithinTolerance) {
        console.log(`✅ PASSED: ${test.value} ${test.from} to ${test.to}`);
        console.log(`   Expected: ${test.expectedResult}, Got: ${result}\n`);
        passedTests++;
      } else {
        console.log(`❌ FAILED: ${test.value} ${test.from} to ${test.to}`);
        console.log(`   Expected: ${test.expectedResult}, Got: ${result}`);
        console.log(`   Difference: ${Math.abs(result - test.expectedResult)}\n`);
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${test.value} ${test.from} to ${test.to}`);
      console.log(`   ${error}\n`);
      failedTests++;
    }
  }

  console.log('Test Summary:');
  console.log(`Total Tests: ${testCases.length}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  
  return {
    total: testCases.length,
    passed: passedTests,
    failed: failedTests,
  };
} 