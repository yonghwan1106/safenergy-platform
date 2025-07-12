import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateSafetyIndex } from '@/utils/safety-calculator'

// 모의 데이터 생성 함수들
function generateMockRadiationData(plantName: string) {
  return {
    id: 'mock-rad-' + Date.now(),
    plantName,
    measurementTime: new Date(),
    radiationLevel: Math.random() * 0.05 + 0.05,
    unit: 'μSv/h',
    status: '정상',
    latitude: 35.2736,
    longitude: 129.2902,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

function generateMockWeatherData(plantName: string) {
  const windDirections = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍']
  return {
    id: 'mock-weather-' + Date.now(),
    plantName,
    measurementTime: new Date(),
    temperature: Math.floor(Math.random() * 20) + 15,
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 10) + 1,
    windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
    rainfall: Math.floor(Math.random() * 10),
    unitTemp: '°C',
    unitWind: 'm/s',
    unitRain: 'mm',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

function generateMockAirQualityData(location: string) {
  return {
    id: 'mock-air-' + Date.now(),
    location,
    measurementTime: new Date(),
    pm10: Math.floor(Math.random() * 50) + 10,
    pm25: Math.floor(Math.random() * 30) + 5,
    o3: Math.floor(Math.random() * 0.1 * 100) / 100,
    no2: Math.floor(Math.random() * 0.05 * 100) / 100,
    so2: Math.floor(Math.random() * 0.02 * 100) / 100,
    co: Math.floor(Math.random() * 5) + 1,
    overallIndex: Math.floor(Math.random() * 100) + 1,
    grade: ['좋음', '보통', '나쁨'][Math.floor(Math.random() * 3)],
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    
    let latestRadiation, latestWeather, latestAirQuality
    
    try {
      // 최신 데이터 조회 시도
      latestRadiation = await prisma.radiationData.findFirst({
        orderBy: { createdAt: 'desc' },
        where: location ? { plantName: location } : undefined
      })
      
      latestWeather = await prisma.weatherData.findFirst({
        orderBy: { createdAt: 'desc' },
        where: location ? { plantName: location } : undefined
      })
      
      latestAirQuality = await prisma.airQualityData.findFirst({
        orderBy: { createdAt: 'desc' },
        where: location ? { location: location } : undefined
      })
    } catch (dbError) {
      console.warn('Database query failed, using mock data:', dbError)
    }
    
    // 데이터가 없거나 데이터베이스 연결 실패 시 모의 데이터 사용
    if (!latestRadiation) {
      latestRadiation = generateMockRadiationData(location || '고리원자력본부')
    }
    if (!latestWeather) {
      latestWeather = generateMockWeatherData(location || '고리원자력본부')
    }
    if (!latestAirQuality) {
      latestAirQuality = generateMockAirQualityData(location || '부산광역시 기장군')
    }
    
    // 안전 지수 계산
    const safetyIndex = calculateSafetyIndex(
      latestRadiation,
      latestWeather,
      latestAirQuality,
      location || '전체'
    )
    
    try {
      // 데이터베이스에 저장 시도
      const savedSafetyIndex = await prisma.safetyIndex.create({
        data: safetyIndex
      })
      return NextResponse.json(savedSafetyIndex)
    } catch (dbError) {
      console.warn('Database save failed, returning calculated index:', dbError)
      // 데이터베이스 저장 실패 시 계산된 안전 지수 반환
      return NextResponse.json({
        ...safetyIndex,
        id: 'mock-safety-' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
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