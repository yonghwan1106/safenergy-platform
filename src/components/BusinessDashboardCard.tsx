'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BusinessDashboardData } from '@/types'
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users,
  Award,
  RefreshCw,
  Target,
  Briefcase,
  Globe,
  BarChart3,
  PieChart,
  Lightbulb
} from 'lucide-react'

interface BusinessDashboardCardProps {
  location: string
}

export function BusinessDashboardCard({ location }: BusinessDashboardCardProps) {
  const [businessData, setBusinessData] = useState<BusinessDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'b2g' | 'b2b' | 'growth'>('overview')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchBusinessData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/business-metrics?location=${location}`)
      const data = await response.json()
      setBusinessData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch business data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [location])

  useEffect(() => {
    fetchBusinessData()
  }, [fetchBusinessData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200'
      case 'implementation': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pilot': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'proposal': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'contracted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'trial': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'prospect': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'operational': '운영중',
      'implementation': '구현중',
      'pilot': '파일럿',
      'proposal': '제안',
      'active': '활성',
      'contracted': '계약체결',
      'trial': '체험중',
      'prospect': '잠재고객',
      'renewal': '갱신'
    }
    return labels[status] || status
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20"></div>
              <Briefcase className="w-6 h-6 text-blue-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              비즈니스 모델 대시보드
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">비즈니스 데이터를 분석하는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!businessData) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-red-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Briefcase className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">데이터 오류</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">비즈니스 데이터를 불러올 수 없습니다.</p>
          <Button onClick={fetchBusinessData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20"></div>
              <Briefcase className="w-6 h-6 text-blue-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              비즈니스 모델 대시보드
            </span>
          </CardTitle>
          <Button onClick={fetchBusinessData} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="flex space-x-2 mt-4">
          {[
            { id: 'overview', label: '개요', icon: BarChart3 },
            { id: 'b2g', label: 'B2G', icon: Building2 },
            { id: 'b2b', label: 'B2B', icon: Globe },
            { id: 'growth', label: '성장', icon: TrendingUp }
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
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 주요 지표 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">총 매출</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {businessData.totalRevenue.toLocaleString()}억원
                </div>
                <div className="text-xs text-gray-600 mt-1">연간 계약 규모</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">성장률</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  +{Math.round(businessData.growthRate)}%
                </div>
                <div className="text-xs text-gray-600 mt-1">전년 대비</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">시장점유율</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(businessData.marketShare)}%
                </div>
                <div className="text-xs text-gray-600 mt-1">안전모니터링 시장</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">지속가능성</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(businessData.sustainabilityScore)}점
                </div>
                <div className="text-xs text-gray-600 mt-1">ESG 평가</div>
              </div>
            </div>

            {/* 서비스 분포 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>B2G 서비스 ({businessData.b2gServices.length}개)</span>
                </h4>
                <div className="space-y-2">
                  {businessData.b2gServices.slice(0, 3).map((service, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{service.serviceName}</span>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                  ))}
                  {businessData.b2gServices.length > 3 && (
                    <div className="text-xs text-blue-600 text-center pt-2">
                      +{businessData.b2gServices.length - 3}개 더보기
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>B2B 서비스 ({businessData.b2bServices.length}개)</span>
                </h4>
                <div className="space-y-2">
                  {businessData.b2bServices.slice(0, 3).map((service, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{service.serviceName}</span>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                  ))}
                  {businessData.b2bServices.length > 3 && (
                    <div className="text-xs text-purple-600 text-center pt-2">
                      +{businessData.b2bServices.length - 3}개 더보기
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* B2G 탭 */}
        {activeTab === 'b2g' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">정부 및 공공기관 대상 서비스</span>
              </div>
              <div className="text-sm text-blue-700">
                투명성과 신뢰성을 바탕으로 한 공공 안전 서비스 플랫폼
              </div>
            </div>

            <div className="space-y-4">
              {businessData.b2gServices.map((service, index) => (
                <div key={index} className="border border-blue-100 rounded-lg p-4 bg-white/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-gray-800">{service.serviceName}</h5>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {service.contractValue.toLocaleString()}억원
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">대상기관:</span>
                      <div className="font-medium">{service.targetAgency}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">비용절감:</span>
                      <div className="font-medium text-green-600">
                        {service.governmentValue.costSaving.toLocaleString()}억원
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">효율성 증대:</span>
                      <div className="font-medium text-blue-600">
                        +{Math.round(service.governmentValue.efficiencyGain)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">갱신 확률:</span>
                      <div className="font-medium text-purple-600">
                        {Math.round(service.renewalProbability)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* B2B 탭 */}
        {activeTab === 'b2b' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">기업 대상 솔루션 서비스</span>
              </div>
              <div className="text-sm text-purple-700">
                데이터 기반 의사결정과 리스크 관리를 위한 B2B 플랫폼
              </div>
            </div>

            <div className="space-y-4">
              {businessData.b2bServices.map((service, index) => (
                <div key={index} className="border border-purple-100 rounded-lg p-4 bg-white/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-gray-800">{service.serviceName}</h5>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      {service.contractValue.toLocaleString()}억원
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">업종:</span>
                      <div className="font-medium">{service.clientIndustry}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">활성 사용자:</span>
                      <div className="font-medium text-green-600">
                        {service.usageMetrics.activeUsers.toLocaleString()}명
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">만족도:</span>
                      <div className="font-medium text-blue-600">
                        {Math.round(service.usageMetrics.userSatisfaction)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">이탈 위험:</span>
                      <div className={`font-medium ${service.churnRisk < 15 ? 'text-green-600' : 
                        service.churnRisk < 25 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {Math.round(service.churnRisk)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 성장 탭 */}
        {activeTab === 'growth' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">성장 동력 분석</span>
              </div>
              <div className="text-sm text-green-700">
                지속가능한 성장을 위한 핵심 지표 및 전략적 방향
              </div>
            </div>

            {/* 성장 지표 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="flex items-center space-x-2 mb-3">
                  <PieChart className="w-4 h-4 text-green-600" />
                  <span className="font-medium">수익 구조</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>B2G 매출:</span>
                    <span className="font-medium">
                      {Math.round(businessData.b2gServices.reduce((sum, s) => sum + s.contractValue, 0))}억원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>B2B 매출:</span>
                    <span className="font-medium">
                      {Math.round(businessData.b2bServices.reduce((sum, s) => sum + s.contractValue, 0))}억원
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>총 매출:</span>
                    <span className="text-green-600">{businessData.totalRevenue.toLocaleString()}억원</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">고객 현황</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>B2G 고객:</span>
                    <span className="font-medium">{businessData.b2gServices.length}개 기관</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B2B 고객:</span>
                    <span className="font-medium">{businessData.b2bServices.length}개 기업</span>
                  </div>
                  <div className="flex justify-between">
                    <span>활성 사용자:</span>
                    <span className="font-medium text-blue-600">
                      {businessData.b2bServices.reduce((sum, s) => sum + s.usageMetrics.activeUsers, 0).toLocaleString()}명
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">혁신 지표</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>API 호출:</span>
                    <span className="font-medium">
                      {businessData.b2gServices.reduce((sum, s) => sum + s.technicalMetrics.apiCalls, 0).toLocaleString()}/월
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>데이터 정확도:</span>
                    <span className="font-medium">
                      {Math.round(businessData.b2gServices.reduce((sum, s) => sum + s.technicalMetrics.dataAccuracy, 0) / businessData.b2gServices.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>시스템 가동률:</span>
                    <span className="font-medium text-purple-600">
                      {(businessData.b2gServices.reduce((sum, s) => sum + s.technicalMetrics.uptime, 0) / businessData.b2gServices.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 성장 전략 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>핵심 성장 전략</span>
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">단기 목표 (6개월)</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• B2G 신규 계약 3건 확보</li>
                    <li>• B2B 고객 만족도 95% 달성</li>
                    <li>• API 성능 20% 개선</li>
                    <li>• 신규 산업군 진출 (2개 업종)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">중장기 비전 (2년)</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 전국 원전 지역 100% 커버리지</li>
                    <li>• 국제 시장 진출 (동남아 3개국)</li>
                    <li>• AI 예측 정확도 98% 달성</li>
                    <li>• 연매출 1000억원 돌파</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 업데이트 정보 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            비즈니스 대시보드 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}