import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma' // 나중에 DB 스키마 업데이트 후 사용

// 모의 관광 데이터 생성 함수
function generateMockTourismData() {
  const locationMap = {
    '고리': '부산광역시 기장군',
    '한빛': '전라남도 영광군',
    '월성': '경상북도 경주시',
    '한울': '경상북도 울진군',
    '새울': '강원도 삼척시'
  }

  const attractionsMap = {
    '고리': ['해운대 해수욕장', '기장 죽성리 벚꽃', '일광 해수욕장', '장안사'],
    '한빛': ['칠산 바다', '백수 해안도로', '불갑사', '영광굴비거리'],
    '월성': ['불국사', '석굴암', '경주 역사유적지구', '첨성대'],
    '한울': ['망양 해수욕장', '울진 금강송 숲', '성류굴', '덕구온천'],
    '새울': ['삼척 해수욕장', '환선굴', '대금굴', '이사부광장']
  }

  return Object.entries(locationMap).map(([shortName, fullLocation]) => ({
    location: fullLocation,
    shortName,
    measurementTime: new Date(),
    touristCount: Math.floor(Math.random() * 10000) + 1000, // 1,000-11,000명
    popularAttractions: attractionsMap[shortName as keyof typeof attractionsMap] || [],
    safetyRating: Math.floor(Math.random() * 2) + 4, // 4-5점
    accommodationOccupancy: Math.floor(Math.random() * 40) + 60, // 60-100%
    averageStayDuration: Math.floor(Math.random() * 2) + 1, // 1-3일
    seasonalTrend: ['증가', '감소', '유지'][Math.floor(Math.random() * 3)]
  }))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    
    // 실제 환경에서는 문화체육관광부 API 호출
    // 현재는 모의 데이터 사용
    const mockData = generateMockTourismData()
    
    if (location) {
      // 위치별 관광 데이터 검색 - location 파라미터 정리
      const cleanLocation = decodeURIComponent(location).replace('원자력본부', '')
      const locationData = mockData.find(d => 
        d.location === location || 
        d.shortName === location ||
        d.shortName === cleanLocation ||
        d.location.includes(location) ||
        d.location.includes(cleanLocation)
      )
      
      if (!locationData) {
        // 기본 데이터 반환 (위치를 찾지 못했을 때)
        const defaultData = {
          location: location,
          shortName: cleanLocation,
          measurementTime: new Date(),
          touristCount: Math.floor(Math.random() * 5000) + 2000, // 2,000-7,000명
          popularAttractions: ['지역 명소 1', '지역 명소 2', '지역 명소 3'],
          safetyRating: 4,
          accommodationOccupancy: Math.floor(Math.random() * 30) + 70, // 70-100%
          averageStayDuration: 2,
          seasonalTrend: '유지'
        }
        
        return NextResponse.json({
          id: 'tourism-default-' + Date.now(),
          ...defaultData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      
      try {
        // 데이터베이스에 저장 시도 (Prisma 스키마가 업데이트되면 활성화)
        const { shortName, ...dataToSave } = locationData
        void shortName; // ESLint 경고 방지
        
        // 임시로 mock 데이터 반환 (데이터베이스 스키마 업데이트 후 실제 저장 구현)
        return NextResponse.json({
          id: 'tourism-' + Date.now(),
          ...dataToSave,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      } catch (dbError) {
        console.warn('Database save failed, returning mock data:', dbError)
        const { shortName, ...mockResponse } = locationData
        void shortName;
        return NextResponse.json({
          id: 'mock-tourism-' + Date.now(),
          ...mockResponse,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    
    // 모든 지역 관광 데이터 반환
    return NextResponse.json(mockData.map(data => ({
      id: 'tourism-' + Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })))
  } catch (error) {
    console.error('Tourism data API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tourism data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 실제 구현시 Prisma로 데이터 저장
    // const data = await prisma.tourismData.create({ data: body })
    
    // 임시 응답
    return NextResponse.json({
      id: 'tourism-' + Date.now(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { status: 201 })
  } catch (error) {
    console.error('Tourism data creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create tourism data' },
      { status: 500 }
    )
  }
}