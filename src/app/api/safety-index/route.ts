import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateSafetyIndex } from '@/utils/safety-calculator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    
    // 최신 데이터 조회
    const latestRadiation = await prisma.radiationData.findFirst({
      orderBy: { createdAt: 'desc' },
      where: location ? { plantName: location } : undefined
    })
    
    const latestWeather = await prisma.weatherData.findFirst({
      orderBy: { createdAt: 'desc' },
      where: location ? { plantName: location } : undefined
    })
    
    const latestAirQuality = await prisma.airQualityData.findFirst({
      orderBy: { createdAt: 'desc' },
      where: location ? { location: location } : undefined
    })
    
    if (!latestRadiation || !latestWeather || !latestAirQuality) {
      return NextResponse.json(
        { error: 'Insufficient data for safety index calculation' },
        { status: 400 }
      )
    }
    
    // 안전 지수 계산
    const safetyIndex = calculateSafetyIndex(
      latestRadiation,
      latestWeather,
      latestAirQuality,
      location || '전체'
    )
    
    // 데이터베이스에 저장
    const savedSafetyIndex = await prisma.safetyIndex.create({
      data: safetyIndex
    })
    
    return NextResponse.json(savedSafetyIndex)
  } catch (error) {
    console.error('Safety index API error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate safety index' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const data = await prisma.safetyIndex.create({
      data: body
    })
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Safety index creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create safety index' },
      { status: 500 }
    )
  }
}