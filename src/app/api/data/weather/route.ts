import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 모의 기상 데이터 생성 함수
function generateMockWeatherData() {
  const powerPlants = [
    { name: '고리원자력본부', lat: 35.2736, lng: 129.2902 },
    { name: '한빛원자력본부', lat: 35.4089, lng: 126.4178 },
    { name: '월성원자력본부', lat: 35.7175, lng: 129.4844 },
    { name: '한울원자력본부', lat: 36.7628, lng: 129.4097 },
    { name: '새울원자력본부', lat: 36.3392, lng: 129.2981 }
  ]
  
  const windDirections = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍']
  
  return powerPlants.map(plant => ({
    plantName: plant.name,
    measurementTime: new Date(),
    temperature: Math.floor(Math.random() * 20) + 15, // 15-35°C
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 10) + 1, // 1-10 m/s
    windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
    rainfall: Math.floor(Math.random() * 10), // 0-10 mm
    unitTemp: '°C',
    unitWind: 'm/s',
    unitRain: 'mm'
  }))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const plant = searchParams.get('plant')
    
    // 실제 환경에서는 기상청 API 호출
    // 현재는 모의 데이터 사용
    const mockData = generateMockWeatherData()
    
    if (plant) {
      const plantData = mockData.find(d => d.plantName === plant)
      if (!plantData) {
        return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
      }
      
      try {
        // 데이터베이스에 저장 시도
        const savedData = await prisma.weatherData.create({
          data: plantData
        })
        return NextResponse.json(savedData)
      } catch (dbError) {
        console.warn('Database save failed, returning mock data:', dbError)
        // 데이터베이스 저장 실패 시 모의 데이터 반환
        return NextResponse.json({
          id: 'mock-' + Date.now(),
          ...plantData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    
    // 모든 발전소 데이터 저장 및 반환
    const savedData = await Promise.all(
      mockData.map(data => prisma.weatherData.create({ data }))
    )
    
    return NextResponse.json(savedData)
  } catch (error) {
    console.error('Weather data API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const data = await prisma.weatherData.create({
      data: body
    })
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Weather data creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create weather data' },
      { status: 500 }
    )
  }
}