import { NextResponse } from 'next/server';
import { cacheConversion, getCachedConversion, checkRateLimit } from '@/lib/redis';
import { conversionFactors } from '@/lib/conversion-factors';

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0] || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { values, to, category } = await request.json();
    
    // Generate cache key
    const cacheKey = `conversion:${JSON.stringify(values)}:${to}`;
    
    // Check cache
    const cached = await getCachedConversion(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Convert each value to the base unit of its category
    let totalInBaseUnit = 0;

    for (const { value, unit } of values) {
      const conversionKey = `${unit}_to_${to}`;
      const conversion = conversionFactors[category][conversionKey];

      if (!conversion) {
        // If direct conversion not available, try through base unit
        const toBaseKey = `${unit}_to_base`;
        const fromBaseKey = `base_to_${to}`;
        const toBase = conversionFactors[category][toBaseKey];
        const fromBase = conversionFactors[category][fromBaseKey];

        if (!toBase || !fromBase) {
          return NextResponse.json(
            { error: `Conversion from ${unit} to ${to} not supported` },
            { status: 400 }
          );
        }

        const baseValue = typeof toBase === 'function' ? toBase(value) : value * toBase;
        totalInBaseUnit += baseValue;
      } else {
        const converted = typeof conversion === 'function' ? conversion(value) : value * conversion;
        totalInBaseUnit += converted;
      }
    }

    const response = {
      result: totalInBaseUnit,
      values,
      to,
      category,
    };

    // Cache the result
    await cacheConversion(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
} 