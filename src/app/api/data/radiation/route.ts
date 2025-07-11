import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 모의 방사선 데이터 생성 함수
function generateMockRadiationData() {
  const powerPlants = [
    { name: '고리원자력본부', lat: 35.2736, lng: 129.2902 },
    { name: '한빛원자력본부', lat: 35.4089, lng: 126.4178 },
    { name: '월성원자력본부', lat: 35.7175, lng: 129.4844 },
    { name: '한울원자력본부', lat: 36.7628, lng: 129.4097 },
    { name: '새울원자력본부', lat: 36.3392, lng: 129.2981 }
  ]
  
  return powerPlants.map(plant => ({
    plantName: plant.name,
    measurementTime: new Date(),
    radiationLevel: Math.random() * 0.05 + 0.05, // 0.05-0.1 μSv/h
    unit: 'μSv/h',
    status: '정상',
    latitude: plant.lat,
    longitude: plant.lng
  }))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const plant = searchParams.get('plant')
    
    // 실제 환경에서는 한수원 API 호출
    // 현재는 모의 데이터 사용
    const mockData = generateMockRadiationData()
    
    if (plant) {
      const plantData = mockData.find(d => d.plantName === plant)
      if (!plantData) {
        return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
      }
      
      // 데이터베이스에 저장
      const savedData = await prisma.radiationData.create({
        data: plantData
      })
      
      return NextResponse.json(savedData)
    }
    
    // 모든 발전소 데이터 저장 및 반환
    const savedData = await Promise.all(
      mockData.map(data => prisma.radiationData.create({ data }))
    )
    
    return NextResponse.json(savedData)
  } catch (error) {
    console.error('Radiation data API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch radiation data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const data = await prisma.radiationData.create({
      data: body
    })
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Radiation data creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create radiation data' },
      { status: 500 }
    )
  }
}