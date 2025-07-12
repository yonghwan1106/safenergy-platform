import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 모의 대기질 데이터 생성 함수
function generateMockAirQualityData() {
  const locationMap = {
    '고리': '부산광역시 기장군',
    '한빛': '전라남도 영광군', 
    '월성': '경상북도 경주시',
    '한울': '경상북도 울진군',
    '새울': '강원도 삼척시'
  }
  
  return Object.entries(locationMap).map(([shortName, fullLocation]) => ({
    location: fullLocation,
    shortName,
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
      // 짧은 이름 또는 전체 위치명으로 검색
      const locationData = mockData.find(d => 
        d.location === location || 
        d.shortName === location ||
        d.location.includes(location)
      )
      if (!locationData) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 })
      }
      
      try {
        // 데이터베이스에 저장 시도
        const { shortName, ...dataToSave } = locationData
        void shortName; // ESLint 경고 방지
        const savedData = await prisma.airQualityData.create({
          data: dataToSave
        })
        return NextResponse.json(savedData)
      } catch (dbError) {
        console.warn('Database save failed, returning mock data:', dbError)
        // 데이터베이스 저장 실패 시 모의 데이터 반환
        const { shortName, ...mockResponse } = locationData
        void shortName; // ESLint 경고 방지
        return NextResponse.json({
          id: 'mock-' + Date.now(),
          ...mockResponse,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
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