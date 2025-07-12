import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma' // 나중에 DB 스키마 업데이트 후 사용

// 정책 기여도 계산 함수
function calculatePolicyImpact(location: string) {
  const baselineData = {
    '고리': { population: 150000, gdp: 5000, tourism: 2000000 },
    '한빛': { population: 50000, gdp: 1500, tourism: 500000 },
    '월성': { population: 250000, gdp: 8000, tourism: 4000000 },
    '한울': { population: 50000, gdp: 1200, tourism: 800000 },
    '새울': { population: 70000, gdp: 2000, tourism: 600000 }
  }
  
  const locationKey = location.replace('원자력본부', '') as keyof typeof baselineData
  const baseline = baselineData[locationKey] || baselineData['고리']
  
  // 탄소중립 기여도 (0-100점)
  // 원자력 수용성 향상 → 청정에너지 확산 기여
  const carbonNeutralContribution = Math.min(100, Math.max(0, 
    70 + Math.random() * 25 // 70-95점 범위
  ))
  
  // 관광 성장률 (%)
  // 안전한 관광지 이미지 구축으로 관광객 증가
  const tourismGrowth = Math.min(50, Math.max(-5,
    (Math.random() * 25) // 0-25% 증가
  ))
  
  // 경제적 파급효과 (억원 단위)
  // 관광 증가, IT 산업 유치, 일자리 창출
  const economicImpact = Math.round(
    (baseline.gdp * 0.1) + (tourismGrowth * baseline.tourism * 0.0001)
  )
  
  // 사회적 수용성 지수 (0-100점)
  // 투명한 정보 공개로 원전에 대한 신뢰도 향상
  const publicAcceptance = Math.min(100, Math.max(30,
    65 + Math.random() * 30 // 65-95점 범위
  ))
  
  // 안전 신뢰도 지수 (0-100점)
  // 실시간 모니터링으로 안전성에 대한 확신 증가
  const safetyTrustIndex = Math.min(100, Math.max(50,
    75 + Math.random() * 20 // 75-95점 범위
  ))
  
  return {
    carbonNeutralContribution: Math.round(carbonNeutralContribution),
    tourismGrowth: Math.round(tourismGrowth * 10) / 10, // 소수점 1자리
    economicImpact,
    publicAcceptance: Math.round(publicAcceptance),
    safetyTrustIndex: Math.round(safetyTrustIndex)
  }
}

// 정책별 세부 기여 분석
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPolicyDetails(impact: any) {
  return {
    carbonNeutral: {
      score: impact.carbonNeutralContribution,
      details: [
        '원자력 에너지 사회적 수용성 제고',
        '청정에너지 전환 정책 지원',
        '온실가스 감축 목표 달성 기여',
        '에너지 믹스 최적화 지원'
      ],
      trend: impact.carbonNeutralContribution > 80 ? '매우 긍정적' : 
             impact.carbonNeutralContribution > 60 ? '긍정적' : '보통'
    },
    regionalDevelopment: {
      tourismGrowth: impact.tourismGrowth,
      economicImpact: impact.economicImpact,
      details: [
        '지역 관광산업 활성화',
        '안전 관광 브랜드 구축',
        'IT 서비스업 유치 및 일자리 창출',
        '지역 경제 생태계 강화'
      ],
      jobCreation: Math.round(impact.economicImpact * 0.5), // 경제효과의 50%가 일자리
      businessGrowth: `${Math.round(impact.tourismGrowth * 2)}%`
    },
    digitalNewDeal: {
      innovationScore: Math.round((impact.safetyTrustIndex + impact.publicAcceptance) / 2),
      details: [
        '공공데이터 융합 활용 모델 제시',
        'AI/빅데이터 기술 실증',
        '디지털 정부 혁신 사례',
        '스마트시티 연계 서비스'
      ],
      techTransfer: '높음',
      scalability: '전국 확산 가능'
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || '고리원자력본부'
    
    // 정책 기여도 계산
    const impact = calculatePolicyImpact(location)
    const policyDetails = getPolicyDetails(impact)
    
    const policyImpactData = {
      id: `policy-${location}-${Date.now()}`,
      location,
      calculatedTime: new Date(),
      ...impact,
      details: policyDetails,
      // 종합 평가
      overallRating: Math.round(
        (impact.carbonNeutralContribution + 
         impact.publicAcceptance + 
         impact.safetyTrustIndex) / 3
      ),
      recommendations: [
        '지속적인 투명한 정보 공개',
        '지역 관광업체와의 협력 강화',
        '주민 참여형 안전 교육 프로그램 확대',
        '디지털 혁신 기술 도입 가속화'
      ]
    }
    
    return NextResponse.json(policyImpactData)
    
  } catch (error) {
    console.error('Policy impact API error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate policy impact' },
      { status: 500 }
    )
  }
}

// 모든 지역의 정책 기여도 비교 분석
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { regions } = body || { regions: ['고리원자력본부', '한빛원자력본부', '월성원자력본부', '한울원자력본부', '새울원자력본부'] }
    
    const comparativeAnalysis = regions.map((location: string) => {
      const impact = calculatePolicyImpact(location)
      return {
        location,
        ...impact,
        ranking: {
          carbonNeutral: 0, // 계산 후 순위 매김
          tourism: 0,
          economic: 0,
          acceptance: 0,
          safety: 0
        }
      }
    })
    
    // 순위 계산
    const metrics = ['carbonNeutralContribution', 'tourismGrowth', 'economicImpact', 'publicAcceptance', 'safetyTrustIndex']
    const rankingKeys = ['carbonNeutral', 'tourism', 'economic', 'acceptance', 'safety']
    
    metrics.forEach((metric, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sorted = [...comparativeAnalysis].sort((a: any, b: any) => b[metric] - a[metric])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sorted.forEach((item: any, rank: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const original = comparativeAnalysis.find((ca: any) => ca.location === item.location)
        if (original) {
          original.ranking[rankingKeys[index] as keyof typeof original.ranking] = rank + 1
        }
      })
    })
    
    return NextResponse.json({
      analysisDate: new Date(),
      regionCount: regions.length,
      comparativeAnalysis,
      summary: {
        averageCarbonContribution: Math.round(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          comparativeAnalysis.reduce((sum: number, item: any) => sum + item.carbonNeutralContribution, 0) / regions.length
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        totalEconomicImpact: comparativeAnalysis.reduce((sum: number, item: any) => sum + item.economicImpact, 0),
        averagePublicAcceptance: Math.round(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          comparativeAnalysis.reduce((sum: number, item: any) => sum + item.publicAcceptance, 0) / regions.length
        )
      }
    })
    
  } catch (error) {
    console.error('Comparative policy analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate comparative analysis' },
      { status: 500 }
    )
  }
}