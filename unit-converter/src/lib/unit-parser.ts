type UnitMatch = {
  values: { value: number; unit: string }[];
  to: string;
  category: string;
};

const unitPatterns = {
  length: {
    meters: ['m', 'meter', 'meters'],
    feet: ['ft', 'foot', 'feet'],
    inches: ['in', 'inch', 'inches'],
    centimeters: ['cm', 'centimeter', 'centimeters'],
    kilometers: ['km', 'kilometer', 'kilometers'],
    miles: ['mi', 'mile', 'miles'],
  },
  weight: {
    kilograms: ['kg', 'kilogram', 'kilograms'],
    pounds: ['lb', 'lbs', 'pound', 'pounds'],
    grams: ['g', 'gram', 'grams'],
    ounces: ['oz', 'ounce', 'ounces'],
  },
  temperature: {
    celsius: ['c', 'celsius', '°c'],
    fahrenheit: ['f', 'fahrenheit', '°f'],
    kelvin: ['k', 'kelvin'],
  },
  speed: {
    kph: ['kph', 'km/h', 'kilometers per hour'],
    mph: ['mph', 'mi/h', 'miles per hour'],
  },
};

export function parseUnitConversion(input: string): UnitMatch | null {
  // Remove extra spaces and convert to lowercase
  const normalized = input.toLowerCase().trim();
  
  // Match pattern: "number unit + number unit to unit" or "number unit + number unit -> unit"
  const multiPattern = /^((?:\d+(?:\.\d+)?\s*[a-z°/]+\s*(?:\+\s*)?)+)(?:to|->)\s*([a-z°/]+)$/;
  const multiMatch = normalized.match(multiPattern);

  if (!multiMatch) return null;

  const [, valuesStr, toUnit] = multiMatch;
  const valueMatches = valuesStr.match(/(\d+(?:\.\d+)?)\s*([a-z°/]+)/g);

  if (!valueMatches) return null;

  const values = valueMatches.map(match => {
    const [valueStr, unit] = match.trim().split(/\s+/);
    return {
      value: parseFloat(valueStr),
      unit,
    };
  });

  // Validate all values are numbers
  if (values.some(v => isNaN(v.value))) return null;

  // Find matching category and standardize units
  for (const [category, units] of Object.entries(unitPatterns)) {
    const standardizedValues = values.map(v => {
      for (const [standardUnit, patterns] of Object.entries(units)) {
        if (patterns.includes(v.unit)) {
          return { ...v, unit: standardUnit };
        }
      }
      return null;
    });

    let toMatch: string | null = null;
    for (const [standardUnit, patterns] of Object.entries(units)) {
      if (patterns.includes(toUnit)) {
        toMatch = standardUnit;
        break;
      }
    }

    // If all units (including target) are from the same category
    if (!standardizedValues.includes(null) && toMatch) {
      return {
        values: standardizedValues as { value: number; unit: string }[],
        to: toMatch,
        category,
      };
    }
  }

  return null;
} 