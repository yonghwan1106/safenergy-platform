import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 모의 대기질 데이터 생성 함수
function generateMockAirQualityData() {
  const locations = [
    '부산광역시 기장군', '전라남도 영광군', '경상북도 경주시',
    '경상북도 울진군', '강원도 삼척시'
  ]
  
  return locations.map(location => ({
    location,
    measurementTime: new Date(),
    pm10: Math.floor(Math.random() * 50) + 10, // 10-60 μg/m³
    pm25: Math.floor(Math.random() * 30) + 5,  // 5-35 μg/m³
    o3: Math.floor(Math.random() * 0.1 * 100) / 100, // 0-0.1 ppm
    no2: Math.floor(Math.random() * 0.05 * 100) / 100, // 0-0.05 ppm
    so2: Math.floor(Math.random() * 0.02 * 100) / 100, // 0-0.02 ppm
    co: Math.floor(Math.random() * 5) + 1, // 1-6 ppm
    overallIndex: Math.floor(Math.random() * 100) + 1, // 1-100
    grade: ['좋음', '보통', '나쁨'][Math.floor(Math.random() * 3)]
  }))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    
    // 실제 환경에서는 에어코리아 API 호출
    // 현재는 모의 데이터 사용
    const mockData = generateMockAirQualityData()
    
    if (location) {
      const locationData = mockData.find(d => d.location === location)
      if (!locationData) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 })
      }
      
      // 데이터베이스에 저장
      const savedData = await prisma.airQualityData.create({
        data: locationData
      })
      
      return NextResponse.json(savedData)
    }
    
    // 모든 지역 데이터 저장 및 반환
    const savedData = await Promise.all(
      mockData.map(data => prisma.airQualityData.create({ data }))
    )
    
    return NextResponse.json(savedData)
  } catch (error) {
    console.error('Air quality data API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch air quality data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const data = await prisma.airQualityData.create({
      data: body
    })
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Air quality data creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create air quality data' },
      { status: 500 }
    )
  }
}