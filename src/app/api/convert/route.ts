import { NextResponse } from 'next/server'
import { convert } from '@/lib/conversion-factors'
import redis from '@/lib/redis'

export async function POST(request: Request) {
  try {
    const { value, from, to, category } = await request.json()

    // Validate input
    if (!value || !from || !to || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert value
    const result = convert(Number(value), from, to, category)

    // Cache the conversion
    const cacheKey = `conversion:${category}:${from}:${to}:${value}`
    await redis.setex(cacheKey, 3600, result.toString())

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    )
  }
} 