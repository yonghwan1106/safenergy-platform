export interface RadiationData {
  id: string
  plantName: string
  measurementTime: Date
  radiationLevel: number
  unit: string
  status: string
  latitude: number
  longitude: number
}

export interface WeatherData {
  id: string
  plantName: string
  measurementTime: Date
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: string
  rainfall: number
  unitTemp: string
  unitWind: string
  unitRain: string
}

export interface AirQualityData {
  id: string
  location: string
  measurementTime: Date
  pm10?: number | null
  pm25?: number | null
  o3?: number | null
  no2?: number | null
  so2?: number | null
  co?: number | null
  overallIndex?: number | null
  grade?: string | null
}

export interface SafetyIndex {
  id: string
  location: string
  calculatedTime: Date
  radiationScore: number
  airQualityScore: number
  weatherScore: number
  overallScore: number
  safetyGrade: '안전' | '주의' | '경고' | '위험'
}

export interface PowerPlant {
  id: string
  name: string
  displayName: string
  type: string
  latitude: number
  longitude: number
  region: string
  address: string
  isActive: boolean
}

export interface Alert {
  id: string
  type: 'radiation' | 'air_quality' | 'weather'
  severity: 'warning' | 'alert' | 'critical'
  title: string
  message: string
  location: string
  isActive: boolean
  triggeredAt: Date
  resolvedAt?: Date
}

// 새로운 데이터 타입들 - PRD 요구사항 반영

export interface TourismData {
  id: string
  location: string
  measurementTime: Date
  touristCount: number
  popularAttractions: string[]
  safetyRating: number
  accommodationOccupancy: number
  averageStayDuration: number
  seasonalTrend: string
}

export interface TrafficData {
  id: string
  location: string
  measurementTime: Date
  trafficVolume: number
  congestionLevel: string
  averageSpeed: number
  evacuationRoutes: string[]
  publicTransportStatus: string
}

export interface EconomicData {
  id: string
  location: string
  measurementTime: Date
  populationDensity: number
  ageDistribution: Record<string, number>
  economicIndicators: {
    gdp: number
    tourismRevenue: number
    employmentRate: number
  }
  propertyValue: number
  businessCount: number
}

export interface SafetyPrediction {
  id: string
  location: string
  predictionTime: Date
  targetTime: Date
  predictedSafetyScore: number
  predictedGrade: '안전' | '주의' | '경고' | '위험'
  confidence: number
  factors: string[]
  recommendations: string[]
}

export interface PolicyImpact {
  id: string
  location: string
  calculatedTime: Date
  carbonNeutralContribution: number
  tourismGrowth: number
  economicImpact: number
  publicAcceptance: number
  safetyTrustIndex: number
}

// B2G/B2B 비즈니스 모델 인터페이스들
export interface B2GService {
  id: string
  serviceName: string
  targetAgency: string
  location: string
  implementationDate: Date
  status: 'proposal' | 'pilot' | 'implementation' | 'operational'
  governmentValue: {
    costSaving: number // 억원 단위
    efficiencyGain: number // 퍼센트
    policyCompliance: number // 점수 (0-100)
    publicSafety: number // 점수 (0-100)
  }
  technicalMetrics: {
    apiCalls: number
    dataAccuracy: number
    responseTime: number
    uptime: number
  }
  contractValue: number
  renewalProbability: number
}

export interface B2BService {
  id: string
  serviceName: string
  clientIndustry: string
  location: string
  contractDate: Date
  status: 'prospect' | 'trial' | 'contracted' | 'active' | 'renewal'
  businessValue: {
    revenueGrowth: number
    operationalEfficiency: number
    riskReduction: number
    complianceImprovement: number
  }
  usageMetrics: {
    activeUsers: number
    dataConsumption: number
    integrationLevel: number
    userSatisfaction: number
  }
  contractValue: number
  churnRisk: number
}

export interface BusinessMetrics {
  id: string
  metricType: 'B2G' | 'B2B' | 'B2C'
  location: string
  calculatedTime: Date
  users: number
  revenue: number
  customerSatisfaction: number
  marketPenetration: number
}

// 사회적 영향 지표 인터페이스들
export interface SocialImpactMetrics {
  id: string
  location: string
  calculatedTime: Date
  publicTrust: {
    nuclearAcceptance: number // 원전 수용성 (0-100)
    transparencyRating: number // 투명성 평가 (0-100)
    communityEngagement: number // 지역사회 참여도 (0-100)
    mediaPerception: number // 언론 인식도 (0-100)
  }
  economicImpact: {
    jobCreation: number // 창출 일자리 수
    localSpending: number // 지역 경제 기여도 (억원)
    propertyValueImpact: number // 부동산 가치 영향 (%)
    tourismRevenue: number // 관광 수입 (억원)
  }
  environmentalBenefit: {
    carbonReduction: number // 탄소 절감량 (톤 CO2)
    airQualityImprovement: number // 대기질 개선도 (%)
    biodiversityIndex: number // 생물 다양성 지수 (0-100)
    renewableEnergyContribution: number // 청정에너지 기여도 (%)
  }
  educationalOutreach: {
    schoolPrograms: number // 학교 교육 프로그램 수
    publicWorkshops: number // 공개 워크숍 수
    onlineEngagement: number // 온라인 참여자 수
    knowledgeLevel: number // 지역민 지식 수준 (0-100)
  }
  healthSafety: {
    publicHealthIndex: number // 공중보건 지수 (0-100)
    emergencyPreparedness: number // 비상 대응 준비도 (0-100)
    radiationAwareness: number // 방사선 인식도 (0-100)
    safetyTraining: number // 안전 교육 참여율 (%)
  }
}

// 지역별 비교 분석
export interface RegionalComparison {
  id: string
  generatedTime: Date
  regions: string[]
  comparisonType: 'business' | 'social_impact' | 'overall'
  metrics: {
    [region: string]: {
      overallScore: number
      ranking: number
      strengths: string[]
      improvements: string[]
    }
  }
  recommendations: string[]
}

// 통합 대시보드 데이터
export interface BusinessDashboardData {
  b2gServices: B2GService[]
  b2bServices: B2BService[]
  socialImpact: SocialImpactMetrics
  regionalComparison: RegionalComparison
  totalRevenue: number
  growthRate: number
  marketShare: number
  sustainabilityScore: number
}

export interface DashboardData {
  safetyIndex: SafetyIndex
  radiationData: RadiationData
  weatherData: WeatherData
  airQualityData: AirQualityData
  alerts: Alert[]
  // 새로운 데이터 추가
  tourismData?: TourismData
  trafficData?: TrafficData
  economicData?: EconomicData
  safetyPrediction?: SafetyPrediction
  policyImpact?: PolicyImpact
  businessMetrics?: BusinessMetrics[]
  // 비즈니스 및 사회적 영향 데이터 추가
  businessDashboard?: BusinessDashboardData
  socialImpact?: SocialImpactMetrics
}