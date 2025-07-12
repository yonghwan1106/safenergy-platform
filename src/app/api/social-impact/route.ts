import { NextRequest, NextResponse } from 'next/server'
import { SocialImpactMetrics, RegionalComparison } from '@/types'
// import { prisma } from '@/lib/prisma' // 나중에 DB 스키마 업데이트 후 사용

// 지역별 기준 데이터
const regionBaselines = {
  '고리': { 
    population: 150000, 
    economicActivity: 'high', 
    tourismBase: 2000000,
    nuclearHistory: 50, // 운영 년수
    mediaExposure: 'high'
  },
  '한빛': { 
    population: 50000, 
    economicActivity: 'medium', 
    tourismBase: 500000,
    nuclearHistory: 35,
    mediaExposure: 'medium'
  },
  '월성': { 
    population: 250000, 
    economicActivity: 'high', 
    tourismBase: 4000000,
    nuclearHistory: 45,
    mediaExposure: 'high'
  },
  '한울': { 
    population: 50000, 
    economicActivity: 'low', 
    tourismBase: 800000,
    nuclearHistory: 25,
    mediaExposure: 'low'
  },
  '새울': { 
    population: 70000, 
    economicActivity: 'medium', 
    tourismBase: 600000,
    nuclearHistory: 15,
    mediaExposure: 'medium'
  }
}

// 사회적 영향 지표 계산
function calculateSocialImpact(location: string): SocialImpactMetrics {
  const locationKey = location.replace('원자력본부', '') as keyof typeof regionBaselines
  const baseline = regionBaselines[locationKey] || regionBaselines['고리']
  
  // 지역 특성을 반영한 점수 계산
  const historyBonus = Math.min(20, baseline.nuclearHistory * 0.4) // 운영 경험 보너스
  const populationFactor = Math.log10(baseline.population / 10000) * 5 // 인구 규모 영향
  
  return {
    id: `social-impact-${location}-${Date.now()}`,
    location,
    calculatedTime: new Date(),
    
    // 공중 신뢰도 지표
    publicTrust: {
      nuclearAcceptance: Math.max(40, Math.min(95, 
        60 + historyBonus + populationFactor + (Math.random() * 15 - 7.5)
      )),
      transparencyRating: Math.max(50, Math.min(100,
        70 + historyBonus * 0.8 + (Math.random() * 20 - 10)
      )),
      communityEngagement: Math.max(45, Math.min(100,
        65 + (baseline.economicActivity === 'high' ? 15 : baseline.economicActivity === 'medium' ? 8 : 0) +
        (Math.random() * 20 - 10)
      )),
      mediaPerception: Math.max(35, Math.min(90,
        55 + (baseline.mediaExposure === 'high' ? 10 : baseline.mediaExposure === 'medium' ? 5 : 15) +
        (Math.random() * 25 - 12.5)
      ))
    },
    
    // 경제적 영향
    economicImpact: {
      jobCreation: Math.floor(
        100 + (baseline.population * 0.003) + (Math.random() * 200)
      ),
      localSpending: Math.round(
        50 + (baseline.population * 0.0008) + (baseline.tourismBase * 0.00005) + (Math.random() * 150)
      ),
      propertyValueImpact: Math.max(-5, Math.min(20,
        3 + historyBonus * 0.3 + (Math.random() * 8 - 4)
      )),
      tourismRevenue: Math.round(
        baseline.tourismBase * 0.00012 + (Math.random() * 100)
      )
    },
    
    // 환경적 편익
    environmentalBenefit: {
      carbonReduction: Math.floor(
        8000 + (baseline.population * 0.15) + (Math.random() * 5000)
      ),
      airQualityImprovement: Math.max(5, Math.min(40,
        12 + historyBonus * 0.4 + (Math.random() * 15 - 7.5)
      )),
      biodiversityIndex: Math.max(55, Math.min(100,
        70 + (baseline.economicActivity === 'low' ? 10 : 0) + (Math.random() * 20 - 10)
      )),
      renewableEnergyContribution: Math.max(75, Math.min(98,
        85 + historyBonus * 0.2 + (Math.random() * 10 - 5)
      ))
    },
    
    // 교육 및 소통
    educationalOutreach: {
      schoolPrograms: Math.floor(
        15 + (baseline.population * 0.0002) + (Math.random() * 25)
      ),
      publicWorkshops: Math.floor(
        20 + (baseline.population * 0.0003) + (Math.random() * 40)
      ),
      onlineEngagement: Math.floor(
        2000 + (baseline.population * 0.08) + (baseline.tourismBase * 0.002) + (Math.random() * 8000)
      ),
      knowledgeLevel: Math.max(45, Math.min(95,
        60 + historyBonus * 0.6 + (Math.random() * 20 - 10)
      ))
    },
    
    // 건강 및 안전
    healthSafety: {
      publicHealthIndex: Math.max(70, Math.min(100,
        80 + historyBonus * 0.4 + (Math.random() * 15 - 7.5)
      )),
      emergencyPreparedness: Math.max(65, Math.min(100,
        75 + historyBonus * 0.5 + (Math.random() * 20 - 10)
      )),
      radiationAwareness: Math.max(60, Math.min(100,
        70 + historyBonus * 0.6 + (Math.random() * 20 - 10)
      )),
      safetyTraining: Math.max(50, Math.min(100,
        65 + (baseline.economicActivity === 'high' ? 15 : baseline.economicActivity === 'medium' ? 8 : 0) +
        (Math.random() * 20 - 10)
      ))
    }
  }
}

// 지역별 사회적 영향 비교 분석
function generateSocialImpactComparison(): RegionalComparison {
  const regions = ['고리원자력본부', '한빛원자력본부', '월성원자력본부', '한울원자력본부', '새울원자력본부']
  
  const socialMetrics = regions.map(region => ({
    region,
    impact: calculateSocialImpact(region)
  }))
  
  // 종합 점수 계산 (각 카테고리 평균)
  const metricsWithScores = socialMetrics.map(({ region, impact }) => {
    const publicTrustAvg = Object.values(impact.publicTrust).reduce((a, b) => a + b, 0) / 4
    const economicScore = (
      (impact.economicImpact.jobCreation / 10) + 
      (impact.economicImpact.localSpending / 5) + 
      (impact.economicImpact.propertyValueImpact * 5) + 
      (impact.economicImpact.tourismRevenue / 10)
    ) / 4
    const environmentalAvg = Object.values(impact.environmentalBenefit).reduce((a, b) => a + b, 0) / 4
    const educationAvg = (
      (impact.educationalOutreach.schoolPrograms * 2) +
      (impact.educationalOutreach.publicWorkshops * 1.5) +
      (impact.educationalOutreach.onlineEngagement / 100) +
      impact.educationalOutreach.knowledgeLevel
    ) / 4
    const healthAvg = Object.values(impact.healthSafety).reduce((a, b) => a + b, 0) / 4
    
    const overallScore = (publicTrustAvg + economicScore + environmentalAvg + educationAvg + healthAvg) / 5
    
    return {
      region,
      overallScore: Math.round(overallScore),
      impact
    }
  })
  
  // 순위 매기기
  const sorted = metricsWithScores.sort((a, b) => b.overallScore - a.overallScore)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metrics: any = {}
  sorted.forEach((item, index) => {
    metrics[item.region] = {
      overallScore: item.overallScore,
      ranking: index + 1,
      strengths: getSocialStrengths(item.impact),
      improvements: getSocialImprovements(item.impact)
    }
  })
  
  return {
    id: `social-comparison-${Date.now()}`,
    generatedTime: new Date(),
    regions,
    comparisonType: 'social_impact',
    metrics,
    recommendations: [
      '지역별 맞춤형 소통 전략 개발',
      '우수 지역 사회적 영향 모델 확산',
      '교육 프로그램 표준화 및 품질 개선',
      '투명성 강화를 위한 정보 공개 확대',
      '지역사회 참여형 안전 거버넌스 구축'
    ]
  }
}

// 강점 분석
function getSocialStrengths(impact: SocialImpactMetrics): string[] {
  const strengths: string[] = []
  
  if (impact.publicTrust.nuclearAcceptance > 75) strengths.push('높은 원전 수용성')
  if (impact.publicTrust.transparencyRating > 80) strengths.push('우수한 투명성')
  if (impact.economicImpact.jobCreation > 300) strengths.push('활발한 일자리 창출')
  if (impact.environmentalBenefit.carbonReduction > 15000) strengths.push('탄소감축 기여도 우수')
  if (impact.educationalOutreach.knowledgeLevel > 75) strengths.push('지역민 지식수준 높음')
  if (impact.healthSafety.emergencyPreparedness > 85) strengths.push('비상대응 체계 우수')
  
  return strengths.slice(0, 3) // 최대 3개
}

// 개선점 분석
function getSocialImprovements(impact: SocialImpactMetrics): string[] {
  const improvements: string[] = []
  
  if (impact.publicTrust.mediaPerception < 65) improvements.push('언론 인식 개선 필요')
  if (impact.publicTrust.communityEngagement < 70) improvements.push('지역사회 참여 확대')
  if (impact.economicImpact.propertyValueImpact < 5) improvements.push('부동산 가치 영향 개선')
  if (impact.educationalOutreach.schoolPrograms < 25) improvements.push('교육 프로그램 확대')
  if (impact.healthSafety.radiationAwareness < 75) improvements.push('방사선 인식 개선')
  
  return improvements.slice(0, 2) // 최대 2개
}

// 시계열 트렌드 데이터 생성
function generateTimeSeriesTrend(location: string, months: number = 12) {
  const trend = []
  const baseImpact = calculateSocialImpact(location)
  
  for (let i = 0; i < months; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - (months - 1 - i))
    
    // 월별 변동성 적용
    const variation = (Math.random() - 0.5) * 10 // ±5점 변동
    
    trend.push({
      month: date.toISOString().slice(0, 7), // YYYY-MM 형식
      publicTrustScore: Math.round(
        Object.values(baseImpact.publicTrust).reduce((a, b) => a + b, 0) / 4 + variation
      ),
      economicImpactScore: Math.round(
        (baseImpact.economicImpact.jobCreation / 10 + 
         baseImpact.economicImpact.localSpending / 5) / 2 + variation
      ),
      environmentalScore: Math.round(
        Object.values(baseImpact.environmentalBenefit).reduce((a, b) => a + b, 0) / 4 + variation
      ),
      educationScore: Math.round(baseImpact.educationalOutreach.knowledgeLevel + variation),
      safetyScore: Math.round(
        Object.values(baseImpact.healthSafety).reduce((a, b) => a + b, 0) / 4 + variation
      )
    })
  }
  
  return trend
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || '고리원자력본부'
    const type = searchParams.get('type') // 'metrics' | 'comparison' | 'trend'
    const timeframe = searchParams.get('timeframe') || '12' // 개월 수
    
    if (type === 'comparison') {
      const comparison = generateSocialImpactComparison()
      return NextResponse.json(comparison)
    }
    
    if (type === 'trend') {
      const trend = generateTimeSeriesTrend(location, parseInt(timeframe))
      return NextResponse.json({
        location,
        timeframe: `${timeframe}개월`,
        trend,
        generatedAt: new Date()
      })
    }
    
    // 기본값: 특정 지역 사회적 영향 지표
    const socialImpact = calculateSocialImpact(location)
    
    return NextResponse.json(socialImpact)
    
  } catch (error) {
    console.error('Social impact API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social impact metrics' },
      { status: 500 }
    )
  }
}

// 사회적 영향 개선 계획 및 시뮬레이션
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { simulationType, interventions, location, timeframe } = body
    
    if (simulationType === 'intervention') {
      // 개입 효과 시뮬레이션
      const baseImpact = calculateSocialImpact(location)
      const improvedImpact = { ...baseImpact }
      
      // 개입별 효과 적용
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      interventions.forEach((intervention: any) => {
        switch (intervention.type) {
          case 'transparency_increase':
            improvedImpact.publicTrust.transparencyRating += intervention.magnitude
            improvedImpact.publicTrust.nuclearAcceptance += intervention.magnitude * 0.6
            break
          case 'education_program':
            improvedImpact.educationalOutreach.knowledgeLevel += intervention.magnitude
            improvedImpact.healthSafety.radiationAwareness += intervention.magnitude * 0.8
            break
          case 'community_engagement':
            improvedImpact.publicTrust.communityEngagement += intervention.magnitude
            improvedImpact.economicImpact.localSpending += intervention.magnitude * 5
            break
          case 'media_campaign':
            improvedImpact.publicTrust.mediaPerception += intervention.magnitude
            break
        }
      })
      
      return NextResponse.json({
        simulationType: 'intervention',
        location,
        timeframe,
        baselineImpact: baseImpact,
        projectedImpact: improvedImpact,
        improvementAreas: {
          publicTrust: Object.keys(improvedImpact.publicTrust).map(key => ({
            metric: key,
            baseline: baseImpact.publicTrust[key as keyof typeof baseImpact.publicTrust],
            projected: improvedImpact.publicTrust[key as keyof typeof improvedImpact.publicTrust],
            improvement: improvedImpact.publicTrust[key as keyof typeof improvedImpact.publicTrust] - 
                        baseImpact.publicTrust[key as keyof typeof baseImpact.publicTrust]
          }))
        },
        recommendedActions: [
          '정기적인 투명성 보고서 발간',
          '지역사회 자문위원회 구성',
          '학교 방문 교육 프로그램 확대',
          '온라인 소통 채널 다양화',
          '언론과의 건설적 소통 강화'
        ]
      })
    }
    
    // 기본 분석 반환
    const impactAnalysis = calculateSocialImpact(location)
    
    return NextResponse.json({
      analysisType: 'current_state',
      location,
      impact: impactAnalysis,
      keyInsights: [
        `공중 신뢰도: ${Math.round(Object.values(impactAnalysis.publicTrust).reduce((a, b) => a + b, 0) / 4)}점`,
        `경제적 기여: 연간 ${impactAnalysis.economicImpact.localSpending}억원`,
        `일자리 창출: ${impactAnalysis.economicImpact.jobCreation}개`,
        `교육 참여: ${impactAnalysis.educationalOutreach.onlineEngagement}명`
      ],
      priorityActions: [
        '투명성 강화를 통한 신뢰도 제고',
        '지역경제 연계 프로그램 확대',
        '교육 및 소통 채널 다양화'
      ]
    })
    
  } catch (error) {
    console.error('Social impact analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to perform social impact analysis' },
      { status: 500 }
    )
  }
}