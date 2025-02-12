interface ConversionFactors {
  [key: string]: {
    [key: string]: number | ((value: number) => number);
  };
}

export const conversionFactors: ConversionFactors = {
  length: {
    meters_to_feet: 3.28084,
    kilometers_to_miles: 0.621371,
    centimeters_to_inches: 0.393701,
    meters_to_yards: 1.09361,
    millimeters_to_inches: 0.0393701,
  },
  mass: {
    kilograms_to_pounds: 2.20462,
    grams_to_ounces: 0.035274,
    milligrams_to_grains: 0.0154324,
    metric_tons_to_short_tons: 1.10231,
    kilograms_to_stones: 0.157473,
  },
  volume: {
    liters_to_gallons: 0.264172,
    milliliters_to_fluid_ounces: 0.033814,
    cubic_meters_to_cubic_feet: 35.3147,
    liters_to_quarts: 1.05669,
    milliliters_to_cups: 0.00422675,
  },
  temperature: {
    celsius_to_fahrenheit: (c: number) => (c * 9/5) + 32,
    fahrenheit_to_celsius: (f: number) => (f - 32) * 5/9,
    celsius_to_kelvin: (c: number) => c + 273.15,
    kelvin_to_celsius: (k: number) => k - 273.15,
  },
  time: {
    seconds_to_minutes: 1/60,
    minutes_to_hours: 1/60,
    hours_to_days: 1/24,
    days_to_weeks: 1/7,
    weeks_to_months: 1/4.34524,
  },
}

export function convert(value: number, from: string, to: string, category: string): number {
  const factors = conversionFactors[category]
  if (!factors) throw new Error(`Category ${category} not found`)

  const key = `${from}_to_${to}`
  const factor = factors[key]
  
  if (typeof factor === 'function') {
    return factor(value)
  }
  
  if (typeof factor === 'number') {
    return value * factor
  }

  throw new Error(`Conversion from ${from} to ${to} not supported`)
} 