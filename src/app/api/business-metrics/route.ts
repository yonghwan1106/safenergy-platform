import { NextRequest, NextResponse } from 'next/server'
import { B2GService, B2BService, BusinessDashboardData } from '@/types'
// import { prisma } from '@/lib/prisma' // 나중에 DB 스키마 업데이트 후 사용

// B2G 서비스 모의 데이터 생성
function generateB2GServices(location: string): B2GService[] {
  const agencies = [
    '한국수력원자력', '원자력안전위원회', '한국원자력연구원', 
    '지방자치단체', '환경부', '국토교통부'
  ]
  
  const services = [
    '실시간 안전 모니터링 시스템',
    '지역주민 안전 정보 서비스',
    '원전 운영 투명성 플랫폼',
    '비상대응 통합 관리 시스템',
    '환경영향 실시간 분석',
    '공공데이터 개방 플랫폼'
  ]

  return services.map((service, index) => {
    const baseValue = 50 + Math.random() * 100 // 50-150억원
    
    return {
      id: `b2g-${location}-${index}`,
      serviceName: service,
      targetAgency: agencies[index % agencies.length],
      location,
      implementationDate: new Date(2024, index % 12, 1),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: ['proposal', 'pilot', 'implementation', 'operational'][Math.floor(Math.random() * 4)] as any,
      governmentValue: {
        costSaving: Math.round(baseValue * 0.3), // 30% 비용 절감
        efficiencyGain: 25 + Math.random() * 40, // 25-65% 효율성 증대
        policyCompliance: 80 + Math.random() * 20, // 80-100점
        publicSafety: 85 + Math.random() * 15 // 85-100점
      },
      technicalMetrics: {
        apiCalls: Math.floor(10000 + Math.random() * 50000), // API 호출 수
        dataAccuracy: 95 + Math.random() * 5, // 95-100% 정확도
        responseTime: 50 + Math.random() * 100, // 50-150ms
        uptime: 99.5 + Math.random() * 0.5 // 99.5-100% 가동률
      },
      contractValue: baseValue,
      renewalProbability: 70 + Math.random() * 25 // 70-95% 갱신 확률
    }
  })
}

// B2B 서비스 모의 데이터 생성
function generateB2BServices(location: string): B2BService[] {
  const industries = [
    '관광산업', '건설업', '부동산', '물류업', 
    '제조업', '에너지기업', 'IT서비스업', '금융업'
  ]
  
  const services = [
    '안전지수 API 서비스',
    '위치기반 위험도 분석',
    '환경 모니터링 솔루션',
    '예측 분석 플랫폼',
    '컴플라이언스 관리 시스템',
    '리스크 평가 도구',
    '데이터 인텔리전스 서비스',
    '통합 대시보드 솔루션'
  ]

  return services.map((service, index) => {
    const contractValue = 10 + Math.random() * 50 // 10-60억원
    
    return {
      id: `b2b-${location}-${index}`,
      serviceName: service,
      clientIndustry: industries[index % industries.length],
      location,
      contractDate: new Date(2024, index % 12, 15),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: ['prospect', 'trial', 'contracted', 'active', 'renewal'][Math.floor(Math.random() * 5)] as any,
      businessValue: {
        revenueGrowth: 15 + Math.random() * 25, // 15-40% 매출 증가
        operationalEfficiency: 20 + Math.random() * 30, // 20-50% 운영 효율성
        riskReduction: 30 + Math.random() * 40, // 30-70% 리스크 감소
        complianceImprovement: 25 + Math.random() * 35 // 25-60% 컴플라이언스 개선
      },
      usageMetrics: {
        activeUsers: Math.floor(10 + Math.random() * 100), // 10-110명
        dataConsumption: Math.floor(1000 + Math.random() * 5000), // 1000-6000 API calls/month
        integrationLevel: 60 + Math.random() * 40, // 60-100% 통합 수준
        userSatisfaction: 75 + Math.random() * 25 // 75-100% 만족도
      },
      contractValue,
      churnRisk: Math.random() * 30 // 0-30% 이탈 위험
    }
  })
}

// 종합 비즈니스 대시보드 데이터 계산
function calculateBusinessDashboard(location: string): BusinessDashboardData {
  const b2gServices = generateB2GServices(location)
  const b2bServices = generateB2BServices(location)
  
  const totalRevenue = [
    ...b2gServices.map(s => s.contractValue),
    ...b2bServices.map(s => s.contractValue)
  ].reduce((sum, val) => sum + val, 0)
  
  return {
    b2gServices,
    b2bServices,
    socialImpact: generateSocialImpact(location),
    regionalComparison: generateRegionalComparison(),
    totalRevenue: Math.round(totalRevenue),
    growthRate: 35 + Math.random() * 25, // 35-60% 성장률
    marketShare: 15 + Math.random() * 20, // 15-35% 시장 점유율
    sustainabilityScore: 80 + Math.random() * 20 // 80-100점 지속가능성 점수
  }
}

// 사회적 영향 지표 생성 (임시 함수, 별도 API에서도 사용)
function generateSocialImpact(location: string) {
  return {
    id: `social-impact-${location}-${Date.now()}`,
    location,
    calculatedTime: new Date(),
    publicTrust: {
      nuclearAcceptance: 65 + Math.random() * 25, // 65-90%
      transparencyRating: 75 + Math.random() * 20, // 75-95%
      communityEngagement: 70 + Math.random() * 25, // 70-95%
      mediaPerception: 60 + Math.random() * 30 // 60-90%
    },
    economicImpact: {
      jobCreation: Math.floor(200 + Math.random() * 500), // 200-700개
      localSpending: Math.round(100 + Math.random() * 300), // 100-400억원
      propertyValueImpact: 5 + Math.random() * 10, // 5-15% 증가
      tourismRevenue: Math.round(50 + Math.random() * 200) // 50-250억원
    },
    environmentalBenefit: {
      carbonReduction: Math.floor(10000 + Math.random() * 20000), // 10000-30000톤
      airQualityImprovement: 15 + Math.random() * 20, // 15-35%
      biodiversityIndex: 70 + Math.random() * 25, // 70-95점
      renewableEnergyContribution: 85 + Math.random() * 10 // 85-95%
    },
    educationalOutreach: {
      schoolPrograms: Math.floor(20 + Math.random() * 50), // 20-70개
      publicWorkshops: Math.floor(30 + Math.random() * 80), // 30-110개
      onlineEngagement: Math.floor(5000 + Math.random() * 15000), // 5000-20000명
      knowledgeLevel: 60 + Math.random() * 30 // 60-90점
    },
    healthSafety: {
      publicHealthIndex: 85 + Math.random() * 15, // 85-100점
      emergencyPreparedness: 80 + Math.random() * 20, // 80-100점
      radiationAwareness: 75 + Math.random() * 20, // 75-95점
      safetyTraining: 70 + Math.random() * 25 // 70-95%
    }
  }
}

// 지역별 비교 분석 생성
function generateRegionalComparison() {
  const regions = ['고리원자력본부', '한빛원자력본부', '월성원자력본부', '한울원자력본부', '새울원자력본부']
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metrics: any = {}
  regions.forEach((region, index) => {
    metrics[region] = {
      overallScore: 70 + Math.random() * 25,
      ranking: index + 1,
      strengths: [
        '우수한 안전 관리',
        '활발한 지역사회 소통',
        '높은 기술 혁신도'
      ].slice(0, 2 + Math.floor(Math.random() * 2)),
      improvements: [
        '관광 연계 강화',
        '대외 홍보 확대',
        '청년층 인식 개선'
      ].slice(0, 1 + Math.floor(Math.random() * 2))
    }
  })
  
  return {
    id: `regional-comparison-${Date.now()}`,
    generatedTime: new Date(),
    regions,
    comparisonType: 'overall' as const,
    metrics,
    recommendations: [
      '전 지역 통합 브랜딩 전략 수립',
      '우수 사례 지역간 공유 체계 구축',
      '지역 특성을 반영한 맞춤형 서비스 개발',
      '지역간 연계 관광 상품 개발'
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || '고리원자력본부'
    const type = searchParams.get('type') // 'b2g' | 'b2b' | 'dashboard'
    
    if (type === 'b2g') {
      const b2gServices = generateB2GServices(location)
      return NextResponse.json({
        services: b2gServices,
        totalValue: b2gServices.reduce((sum, s) => sum + s.contractValue, 0),
        averageRenewalProbability: b2gServices.reduce((sum, s) => sum + s.renewalProbability, 0) / b2gServices.length
      })
    }
    
    if (type === 'b2b') {
      const b2bServices = generateB2BServices(location)
      return NextResponse.json({
        services: b2bServices,
        totalValue: b2bServices.reduce((sum, s) => sum + s.contractValue, 0),
        averageChurnRisk: b2bServices.reduce((sum, s) => sum + s.churnRisk, 0) / b2bServices.length
      })
    }
    
    // 전체 대시보드 데이터 반환 (기본값)
    const businessDashboard = calculateBusinessDashboard(location)
    
    return NextResponse.json(businessDashboard)
    
  } catch (error) {
    console.error('Business metrics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch business metrics' },
      { status: 500 }
    )
  }
}

// 비즈니스 모델 성과 분석 및 예측
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { analysisType, timeframe, regions } = body
    
    if (analysisType === 'forecast') {
      // 미래 성과 예측
      const forecastData = regions.map((region: string) => {
        const currentDashboard = calculateBusinessDashboard(region)
        
        return {
          region,
          currentRevenue: currentDashboard.totalRevenue,
          projectedRevenue: Math.round(currentDashboard.totalRevenue * (1 + currentDashboard.growthRate / 100)),
          riskFactors: [
            '규제 변화 리스크',
            '기술 혁신 압박',
            '경쟁사 진입',
            '고객 요구사항 변화'
          ],
          opportunities: [
            '신규 정부 정책 활용',
            '디지털 전환 가속화',
            '국제 시장 진출',
            '플랫폼 확장 서비스'
          ]
        }
      })
      
      return NextResponse.json({
        analysisType: 'forecast',
        timeframe,
        generatedAt: new Date(),
        forecastData,
        industryTrends: {
          overallGrowthRate: 42, // 산업 전체 42% 성장 예상
          keyDrivers: [
            '정부 디지털 뉴딜 정책',
            'ESG 경영 확산',
            '안전 규제 강화',
            '데이터 기반 의사결정 증가'
          ],
          challenges: [
            '데이터 보안 요구사항 증가',
            '전문 인력 확보 경쟁',
            '기술 표준화 필요성'
          ]
        }
      })
    }
    
    // 기본 비교 분석
    const comparisonData = regions.map((region: string) => ({
      region,
      metrics: calculateBusinessDashboard(region)
    }))
    
    return NextResponse.json({
      analysisType: 'comparison',
      generatedAt: new Date(),
      comparisonData,
      summary: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        totalMarketSize: comparisonData.reduce((sum: number, item: any) => sum + item.metrics.totalRevenue, 0),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        averageGrowthRate: comparisonData.reduce((sum: number, item: any) => sum + item.metrics.growthRate, 0) / regions.length,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        topPerformingRegion: comparisonData.sort((a: any, b: any) => b.metrics.totalRevenue - a.metrics.totalRevenue)[0].region
      }
    })
    
  } catch (error) {
    console.error('Business analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to perform business analysis' },
      { status: 500 }
    )
  }
}