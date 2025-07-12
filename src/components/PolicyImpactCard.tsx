'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// import { PolicyImpact } from '@/types' // 타입은 any로 임시 처리
import { 
  Globe, 
  TrendingUp, 
  Building2, 
  Users, 
  Leaf,
  RefreshCw,
  Award,
  MapPin,
  BarChart3
} from 'lucide-react'

interface PolicyImpactCardProps {
  location: string
}

export function PolicyImpactCard({ location }: PolicyImpactCardProps) {
  const [policyData, setPolicyData] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchPolicyImpact = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/policy-impact?location=${location}`)
      const data = await response.json()
      setPolicyData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch policy impact:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPolicyImpact()
  }, [location, fetchPolicyImpact])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (score >= 40) return 'bg-orange-100 text-orange-800 border-orange-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    return <TrendingUp className="w-4 h-4 text-gray-600 transform rotate-180" />
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-green-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-20"></div>
              <Globe className="w-6 h-6 text-green-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              정책 기여도 분석
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-green-600" />
              <span className="text-gray-600">정책 영향도를 분석하는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!policyData) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-red-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">데이터 오류</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">정책 기여도 데이터를 불러올 수 없습니다.</p>
          <Button onClick={fetchPolicyImpact} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-green-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-20"></div>
              <Globe className="w-6 h-6 text-green-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              정책 기여도 분석
            </span>
          </CardTitle>
          <Button onClick={fetchPolicyImpact} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          <span className="text-gray-400">|</span>
          <span>종합 평가: </span>
          <Badge className={getScoreBadge(Number(policyData.overallRating) || 0)}>
            {Number(policyData.overallRating) || 0}점
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 주요 지표 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">탄소중립 기여</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(Number(policyData.carbonNeutralContribution) || 0)}`}>
              {Number(policyData.carbonNeutralContribution) || 0}점
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(policyData as any).details?.carbonNeutral?.trend || '긍정적'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">관광 성장</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="text-2xl font-bold text-orange-600">
                +{Number(policyData.tourismGrowth) || 0}%
              </div>
              {getTrendIcon(Number(policyData.tourismGrowth) || 0)}
            </div>
            <div className="text-xs text-gray-600 mt-1">연간 성장률</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">경제 효과</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {Number(policyData.economicImpact) || 0}억원
            </div>
            <div className="text-xs text-gray-600 mt-1">연간 파급효과</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">사회 수용성</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(Number(policyData.publicAcceptance) || 0)}`}>
              {Number(policyData.publicAcceptance) || 0}점
            </div>
            <div className="text-xs text-gray-600 mt-1">국민 신뢰도</div>
          </div>
        </div>

        {/* 정책별 세부 기여도 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Award className="w-4 h-4 text-green-600" />
            <span>정책별 기여 현황</span>
          </h4>
          <div className="space-y-3">
            {/* 탄소중립 2050 */}
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-green-800">탄소중립 2050</span>
                <Badge className="bg-green-100 text-green-800">
                  {Number(policyData.carbonNeutralContribution) || 0}점
                </Badge>
              </div>
              <div className="text-sm text-green-700">
                원자력 사회적 수용성 증진으로 청정에너지 전환 가속화
              </div>
            </div>

            {/* 지역균형발전 */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-800">지역균형발전</span>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    +{Number(policyData.tourismGrowth) || 0}%
                  </Badge>
                  <span className="text-sm text-blue-600">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(policyData as any).details?.regionalDevelopment?.jobCreation || 25}개 일자리
                  </span>
                </div>
              </div>
              <div className="text-sm text-blue-700">
                관광산업 활성화 및 지역 경제 생태계 강화
              </div>
            </div>

            {/* 디지털 뉴딜 */}
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-purple-800">디지털 뉴딜</span>
                <Badge className="bg-purple-100 text-purple-800">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(policyData as any).details?.digitalNewDeal?.innovationScore || 85}점
                </Badge>
              </div>
              <div className="text-sm text-purple-700">
                공공데이터 융합 활용 모델 및 AI 기술 실증
              </div>
            </div>
          </div>
        </div>

        {/* 개선 권장사항 */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(policyData as any).recommendations && (policyData as any).recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">정책 시너지 강화 방안</h4>
            <div className="space-y-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(policyData as any).recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 업데이트 정보 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            정책 영향도 분석 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}