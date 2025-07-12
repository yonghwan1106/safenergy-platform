'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SocialImpactMetrics } from '@/types'
import { 
  Heart, 
  Users, 
  TreePine, 
  GraduationCap,
  Shield,
  TrendingUp,
  RefreshCw,
  Award,
  Target,
  MapPin,
  Building,
  Lightbulb,
  BarChart3
} from 'lucide-react'

interface SocialImpactCardProps {
  location: string
}

export function SocialImpactCard({ location }: SocialImpactCardProps) {
  const [socialData, setSocialData] = useState<SocialImpactMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'trust' | 'economic' | 'environment' | 'education'>('overview')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchSocialData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/social-impact?location=${location}`)
      const data = await response.json()
      setSocialData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch social impact data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [location])

  useEffect(() => {
    fetchSocialData()
  }, [fetchSocialData])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    if (score >= 40) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  const calculateOverallScore = (data: SocialImpactMetrics) => {
    const publicTrustAvg = Object.values(data.publicTrust).reduce((a, b) => a + b, 0) / 4
    const economicScore = (data.economicImpact.jobCreation / 10 + data.economicImpact.localSpending / 5) / 2
    const environmentalAvg = Object.values(data.environmentalBenefit).reduce((a, b) => a + b, 0) / 4
    const educationAvg = Object.values(data.educationalOutreach).reduce((a, b) => a + b, 0) / 4
    const healthAvg = Object.values(data.healthSafety).reduce((a, b) => a + b, 0) / 4
    
    return Math.round((publicTrustAvg + economicScore + environmentalAvg + educationAvg + healthAvg) / 5)
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-pink-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-sm opacity-20"></div>
              <Heart className="w-6 h-6 text-pink-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              사회적 영향 분석
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-pink-600" />
              <span className="text-gray-600">사회적 영향을 분석하는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!socialData) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-red-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">데이터 오류</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">사회적 영향 데이터를 불러올 수 없습니다.</p>
          <Button onClick={fetchSocialData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  const overallScore = calculateOverallScore(socialData)

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-pink-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-sm opacity-20"></div>
              <Heart className="w-6 h-6 text-pink-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              사회적 영향 분석
            </span>
          </CardTitle>
          <Button onClick={fetchSocialData} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          <span className="text-gray-400">|</span>
          <span>종합 영향도: </span>
          <Badge className={`${getScoreBackground(overallScore)} ${getScoreColor(overallScore)}`}>
            {overallScore}점
          </Badge>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'overview', label: '개요', icon: BarChart3 },
            { id: 'trust', label: '신뢰도', icon: Users },
            { id: 'economic', label: '경제', icon: Building },
            { id: 'environment', label: '환경', icon: TreePine },
            { id: 'education', label: '교육', icon: GraduationCap }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ].map(({ id, label, icon: Icon }: any) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "outline"}
              size="sm"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(id as any)}
              className="flex items-center space-x-1"
            >
              <Icon className="w-3 h-3" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 핵심 지표 요약 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">공중신뢰</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(
                  Object.values(socialData.publicTrust).reduce((a, b) => a + b, 0) / 4
                )}`}>
                  {Math.round(Object.values(socialData.publicTrust).reduce((a, b) => a + b, 0) / 4)}점
                </div>
                <div className="text-xs text-gray-600 mt-1">평균 신뢰도</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">일자리</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {socialData.economicImpact.jobCreation.toLocaleString()}개
                </div>
                <div className="text-xs text-gray-600 mt-1">창출 일자리</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TreePine className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">탄소절감</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {(socialData.environmentalBenefit.carbonReduction / 1000).toFixed(1)}만톤
                </div>
                <div className="text-xs text-gray-600 mt-1">연간 CO₂</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">교육참여</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {socialData.educationalOutreach.onlineEngagement.toLocaleString()}명
                </div>
                <div className="text-xs text-gray-600 mt-1">온라인 참여</div>
              </div>
            </div>

            {/* 영향 범주별 점수 */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Award className="w-4 h-4 text-pink-600" />
                <span>영향 범주별 평가</span>
              </h4>
              
              {[
                { 
                  name: '공중 신뢰도', 
                  score: Math.round(Object.values(socialData.publicTrust).reduce((a, b) => a + b, 0) / 4),
                  icon: Users,
                  description: '원전 수용성, 투명성, 소통 정도'
                },
                { 
                  name: '경제적 기여', 
                  score: Math.min(100, Math.round(socialData.economicImpact.jobCreation / 5 + socialData.economicImpact.localSpending / 10)),
                  icon: Building,
                  description: '일자리 창출, 지역경제 활성화'
                },
                { 
                  name: '환경적 편익', 
                  score: Math.round((
                    Math.min(100, socialData.environmentalBenefit.carbonReduction / 100) +
                    socialData.environmentalBenefit.airQualityImprovement +
                    socialData.environmentalBenefit.biodiversityIndex +
                    socialData.environmentalBenefit.renewableEnergyContribution
                  ) / 4),
                  icon: TreePine,
                  description: '탄소절감, 대기질 개선, 청정에너지'
                },
                { 
                  name: '교육 및 소통', 
                  score: Math.round((socialData.educationalOutreach.knowledgeLevel + 
                    Math.min(100, socialData.educationalOutreach.onlineEngagement / 100)) / 2),
                  icon: GraduationCap,
                  description: '교육 프로그램, 지식 수준 향상'
                },
                { 
                  name: '건강 및 안전', 
                  score: Math.round(Object.values(socialData.healthSafety).reduce((a, b) => a + b, 0) / 4),
                  icon: Shield,
                  description: '공중보건, 비상대응, 안전교육'
                }
              ].map((category, index) => (
                <div key={index} className={`rounded-lg p-4 border ${getScoreBackground(category.score)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <category.icon className={`w-5 h-5 ${getScoreColor(category.score)}`} />
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                      {category.score}점
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{category.description}</div>
                  
                  {/* 진행률 바 */}
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          category.score >= 80 ? 'bg-green-500' :
                          category.score >= 60 ? 'bg-yellow-500' :
                          category.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 신뢰도 탭 */}
        {activeTab === 'trust' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">공중 신뢰도 지표</span>
              </div>
              <div className="text-sm text-blue-700">
                지역사회와의 소통과 투명성을 통한 신뢰 구축 현황
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(socialData.publicTrust).map(([key, value], index) => {
                const labels: Record<string, string> = {
                  nuclearAcceptance: '원전 수용성',
                  transparencyRating: '투명성 평가',
                  communityEngagement: '지역사회 참여',
                  mediaPerception: '언론 인식도'
                }
                
                return (
                  <div key={index} className={`rounded-lg p-4 border ${getScoreBackground(value)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-800">{labels[key]}</span>
                      <div className={`text-xl font-bold ${getScoreColor(value)}`}>
                        {Math.round(value)}점
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          value >= 80 ? 'bg-green-500' :
                          value >= 60 ? 'bg-yellow-500' :
                          value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      {value >= 80 ? '매우 우수' : 
                       value >= 60 ? '우수' : 
                       value >= 40 ? '보통' : '개선 필요'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 신뢰도 개선 방안 */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>신뢰도 제고 방안</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">단기 개선 과제</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 정기적인 안전 정보 공개</li>
                    <li>• 주민 참여형 소통 채널 확대</li>
                    <li>• 언론과의 건설적 대화 강화</li>
                    <li>• 투명한 운영 프로세스 공개</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">장기 신뢰 구축</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 지역사회 상생 프로그램 운영</li>
                    <li>• 청년층 대상 교육 확대</li>
                    <li>• 국제 협력 사례 공유</li>
                    <li>• 디지털 소통 플랫폼 구축</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 경제 탭 */}
        {activeTab === 'economic' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">경제적 영향 분석</span>
              </div>
              <div className="text-sm text-green-700">
                지역경제 발전과 일자리 창출을 통한 사회적 기여도
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(socialData.economicImpact).map(([key, value], index) => {
                const labels: Record<string, string> = {
                  jobCreation: '일자리 창출',
                  localSpending: '지역 경제 기여',
                  propertyValueImpact: '부동산 가치 영향',
                  tourismRevenue: '관광 수입'
                }
                
                const units: Record<string, string> = {
                  jobCreation: '개',
                  localSpending: '억원/년',
                  propertyValueImpact: '% 증가',
                  tourismRevenue: '억원/년'
                }

                const icons = [Building, TrendingUp, Target, Heart]
                const Icon = icons[index % icons.length]
                
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-800">{labels[key]}</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {typeof value === 'number' ? 
                        (key === 'jobCreation' ? value.toLocaleString() : 
                         key === 'propertyValueImpact' ? `+${value.toFixed(1)}` : 
                         Math.round(value).toLocaleString()) 
                        : value}
                      <span className="text-lg text-gray-600 ml-1">{units[key]}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'jobCreation' && '직간접 고용 효과 포함'}
                      {key === 'localSpending' && '연간 지역 내 소비 지출'}
                      {key === 'propertyValueImpact' && '주변 지역 부동산 가치'}
                      {key === 'tourismRevenue' && '안전 관광 브랜드 효과'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 경제적 기여 세부 분석 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>경제적 파급효과 분석</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">직접 효과</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 원전 운영 인력: {Math.round(socialData.economicImpact.jobCreation * 0.3)}명</li>
                    <li>• 지역 구매: {Math.round(socialData.economicImpact.localSpending * 0.4)}억원</li>
                    <li>• 세수 증대: {Math.round(socialData.economicImpact.localSpending * 0.1)}억원</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">간접 효과</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 관련 산업 고용: {Math.round(socialData.economicImpact.jobCreation * 0.4)}명</li>
                    <li>• 서비스업 성장: {Math.round(socialData.economicImpact.localSpending * 0.3)}억원</li>
                    <li>• 인프라 투자: {Math.round(socialData.economicImpact.localSpending * 0.2)}억원</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">유발 효과</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 소비 창출: {Math.round(socialData.economicImpact.jobCreation * 0.3)}명</li>
                    <li>• 관광 연계: {socialData.economicImpact.tourismRevenue}억원</li>
                    <li>• 지역 브랜드: +{socialData.economicImpact.propertyValueImpact.toFixed(1)}%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 환경 탭 */}
        {activeTab === 'environment' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TreePine className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">환경적 편익 분석</span>
              </div>
              <div className="text-sm text-green-700">
                청정에너지 기여와 환경 보전을 통한 지속가능한 발전
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(socialData.environmentalBenefit).map(([key, value], index) => {
                const labels: Record<string, string> = {
                  carbonReduction: '탄소 절감량',
                  airQualityImprovement: '대기질 개선',
                  biodiversityIndex: '생물다양성 지수',
                  renewableEnergyContribution: '청정에너지 기여'
                }
                
                const units: Record<string, string> = {
                  carbonReduction: '톤 CO₂/년',
                  airQualityImprovement: '% 개선',
                  biodiversityIndex: '점',
                  renewableEnergyContribution: '%'
                }

                const icons = [TreePine, Target, Heart, TrendingUp]
                const Icon = icons[index % icons.length]
                
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-800">{labels[key]}</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {typeof value === 'number' ? 
                        (key === 'carbonReduction' ? value.toLocaleString() : 
                         Math.round(value)) 
                        : value}
                      <span className="text-lg text-gray-600 ml-1">{units[key]}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'carbonReduction' && '화석연료 대비 CO₂ 감축'}
                      {key === 'airQualityImprovement' && '주변 지역 대기질 향상'}
                      {key === 'biodiversityIndex' && '생태계 보전 및 관리'}
                      {key === 'renewableEnergyContribution' && '청정에너지 믹스 기여'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 환경 보전 활동 */}
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-3 flex items-center space-x-2">
                <TreePine className="w-4 h-4" />
                <span>환경 보전 프로그램</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">진행 중인 활동</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 해양 생태계 모니터링</li>
                    <li>• 온배수 활용 양식장 운영</li>
                    <li>• 주변 산림 보전 사업</li>
                    <li>• 폐기물 제로 정책 추진</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">향후 계획</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 재생에너지 연계 확대</li>
                    <li>• 수소 생산 기술 도입</li>
                    <li>• 탄소중립 2050 기여</li>
                    <li>• 친환경 관광단지 조성</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 교육 탭 */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <GraduationCap className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">교육 및 소통 현황</span>
              </div>
              <div className="text-sm text-orange-700">
                지역사회 교육과 소통을 통한 원자력 안전 인식 제고
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(socialData.educationalOutreach).map(([key, value], index) => {
                const labels: Record<string, string> = {
                  schoolPrograms: '학교 교육 프로그램',
                  publicWorkshops: '공개 워크숍',
                  onlineEngagement: '온라인 참여자',
                  knowledgeLevel: '지역민 지식 수준'
                }
                
                const units: Record<string, string> = {
                  schoolPrograms: '개 프로그램',
                  publicWorkshops: '회 개최',
                  onlineEngagement: '명 참여',
                  knowledgeLevel: '점'
                }

                const icons = [GraduationCap, Users, Target, Award]
                const Icon = icons[index % icons.length]
                
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-800">{labels[key]}</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {typeof value === 'number' ? 
                        (key === 'onlineEngagement' ? value.toLocaleString() : 
                         Math.round(value)) 
                        : value}
                      <span className="text-lg text-gray-600 ml-1">{units[key]}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'schoolPrograms' && '초중고 대상 안전교육'}
                      {key === 'publicWorkshops' && '주민 대상 설명회'}
                      {key === 'onlineEngagement' && '디지털 플랫폼 참여'}
                      {key === 'knowledgeLevel' && '원자력 안전 이해도'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 교육 프로그램 상세 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>교육 프로그램 세부 내용</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">학교 교육</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 방사선 과학 교실</li>
                    <li>• 원자력 견학 프로그램</li>
                    <li>• 에너지 환경 체험관</li>
                    <li>• 진로 탐색 프로그램</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">주민 소통</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 정기 설명회 개최</li>
                    <li>• 원전 투어 프로그램</li>
                    <li>• 주민 간담회 운영</li>
                    <li>• 전문가 초청 강연</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">온라인 교육</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 웹 기반 교육 콘텐츠</li>
                    <li>• VR 안전 체험</li>
                    <li>• 실시간 Q&A</li>
                    <li>• 모바일 앱 서비스</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 건강 및 안전 지표 */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>건강 및 안전 지표</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(socialData.healthSafety).map(([key, value], index) => {
                  const labels: Record<string, string> = {
                    publicHealthIndex: '공중보건 지수',
                    emergencyPreparedness: '비상대응 준비도',
                    radiationAwareness: '방사선 인식도',
                    safetyTraining: '안전교육 참여율'
                  }
                  
                  return (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{labels[key]}</span>
                        <div className={`text-lg font-bold ${getScoreColor(value)}`}>
                          {Math.round(value)}{key === 'safetyTraining' ? '%' : '점'}
                        </div>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            value >= 80 ? 'bg-green-500' :
                            value >= 60 ? 'bg-yellow-500' :
                            value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* 업데이트 정보 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            사회적 영향 분석 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}