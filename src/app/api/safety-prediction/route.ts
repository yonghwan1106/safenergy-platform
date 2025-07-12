import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma' // 나중에 DB 스키마 업데이트 후 사용

// AI 기반 안전도 예측 알고리즘 (모의 구현)
function predictSafetyScore(currentData: {
  radiationLevel: number
  airQualityIndex: number
  weatherCondition: string
  historicalTrend: string
}) {
  const { radiationLevel, airQualityIndex, weatherCondition, historicalTrend } = currentData
  
  // 기본 점수 계산
  let baseScore = 80
  
  // 방사선량 영향 (40% 가중치)
  if (radiationLevel > 0.1) baseScore -= 30
  else if (radiationLevel > 0.08) baseScore -= 15
  else if (radiationLevel > 0.06) baseScore -= 5
  
  // 대기질 영향 (35% 가중치)
  if (airQualityIndex > 80) baseScore -= 25
  else if (airQualityIndex > 50) baseScore -= 10
  else if (airQualityIndex > 30) baseScore -= 5
  
  // 기상 조건 영향 (25% 가중치)
  const weatherFactors = {
    '맑음': 5,
    '흐림': 0,
    '비': -10,
    '강풍': -15,
    '태풍': -30
  }
  baseScore += weatherFactors[weatherCondition as keyof typeof weatherFactors] || 0
  
  // 히스토리컬 트렌드 반영
  const trendFactors = {
    '개선': 10,
    '유지': 0,
    '악화': -15
  }
  baseScore += trendFactors[historicalTrend as keyof typeof trendFactors] || 0
  
  // 점수 정규화 (0-100)
  return Math.max(0, Math.min(100, baseScore))
}

function getGradeFromScore(score: number): '안전' | '주의' | '경고' | '위험' {
  if (score >= 80) return '안전'
  if (score >= 60) return '주의'
  if (score >= 40) return '경고'
  return '위험'
}

function generateRecommendations(score: number, factors: string[]): string[] {
  const recommendations: string[] = []
  
  if (score < 60) {
    recommendations.push('실외 활동을 자제하시기 바랍니다.')
    recommendations.push('마스크 착용을 권장합니다.')
  }
  
  if (factors.includes('radiation')) {
    recommendations.push('방사선 모니터링을 지속 확인하세요.')
  }
  
  if (factors.includes('air_quality')) {
    recommendations.push('환기를 최소화하고 공기청정기를 사용하세요.')
  }
  
  if (factors.includes('weather')) {
    recommendations.push('기상특보를 주의깊게 확인하세요.')
  }
  
  if (score >= 80) {
    recommendations.push('야외 활동에 적합한 안전한 상태입니다.')
    recommendations.push('관광 및 레크리에이션 활동을 즐기시기 바랍니다.')
  }
  
  return recommendations
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || '고리원자력본부'
    const hours = parseInt(searchParams.get('hours') || '24')
    
    // 현재 데이터 모의 생성 (실제로는 최신 센서 데이터 사용)
    const currentData = {
      radiationLevel: 0.05 + Math.random() * 0.03,
      airQualityIndex: 30 + Math.random() * 40,
      weatherCondition: ['맑음', '흐림', '비'][Math.floor(Math.random() * 3)],
      historicalTrend: ['개선', '유지', '악화'][Math.floor(Math.random() * 3)]
    }
    
    // 예측 결과 생성
    const predictions = []
    
    for (let i = 1; i <= hours; i++) {
      // 시간별 변동성 추가
      const timeVariation = Math.random() * 0.1 - 0.05 // ±5% 변동
      const predictedScore = predictSafetyScore({
        ...currentData,
        radiationLevel: currentData.radiationLevel * (1 + timeVariation),
        airQualityIndex: currentData.airQualityIndex * (1 + timeVariation)
      })
      
      const factors = []
      if (currentData.radiationLevel > 0.08) factors.push('radiation')
      if (currentData.airQualityIndex > 50) factors.push('air_quality')
      if (currentData.weatherCondition !== '맑음') factors.push('weather')
      
      const prediction = {
        id: `prediction-${location}-${i}`,
        location,
        predictionTime: new Date(),
        targetTime: new Date(Date.now() + i * 60 * 60 * 1000), // i시간 후
        predictedSafetyScore: Math.round(predictedScore),
        predictedGrade: getGradeFromScore(predictedScore),
        confidence: Math.round((90 + Math.random() * 10)), // 90-100% 신뢰도
        factors,
        recommendations: generateRecommendations(predictedScore, factors)
      }
      
      predictions.push(prediction)
    }
    
    // 최근 예측 결과 반환 (실제로는 첫 번째 시간 예측)
    return NextResponse.json(predictions[0])
    
  } catch (error) {
    console.error('Safety prediction API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate safety prediction' },
      { status: 500 }
    )
  }
}

// 모든 시간대 예측 결과 반환
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { location, hours = 24 } = body
    
    // 현재 데이터 기반 예측 (실제로는 ML 모델 사용)
    const predictions = []
    
    for (let i = 1; i <= hours; i++) {
      const baseScore = 75 + Math.random() * 20 // 75-95점 기준
      const timeDecay = Math.max(0.7, 1 - (i * 0.02)) // 시간이 갈수록 신뢰도 감소
      
      const prediction = {
        id: `batch-prediction-${location}-${i}`,
        location,
        predictionTime: new Date(),
        targetTime: new Date(Date.now() + i * 60 * 60 * 1000),
        predictedSafetyScore: Math.round(baseScore * timeDecay),
        predictedGrade: getGradeFromScore(baseScore * timeDecay),
        confidence: Math.round(95 * timeDecay),
        factors: ['weather', 'air_quality'],
        recommendations: generateRecommendations(baseScore * timeDecay, ['weather'])
      }
      
      predictions.push(prediction)
    }
    
    return NextResponse.json({
      location,
      predictionCount: predictions.length,
      predictions,
      generatedAt: new Date()
    })
    
  } catch (error) {
    console.error('Batch prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to generate batch predictions' },
      { status: 500 }
    )
  }
}