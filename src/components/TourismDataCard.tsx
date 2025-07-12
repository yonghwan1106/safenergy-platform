'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge' // 사용하지 않음
import { Button } from '@/components/ui/button'
// import { TourismData } from '@/types' // any로 임시 처리
import { 
  MapPin, 
  Users, 
  Star, 
  Calendar,
  Bed,
  TrendingUp,
  RefreshCw,
  Camera,
  Clock
} from 'lucide-react'

interface TourismDataCardProps {
  location: string
}

export function TourismDataCard({ location }: TourismDataCardProps) {
  const [tourismData, setTourismData] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTourismData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/data/tourism?location=${location}`)
      const data = await response.json()
      setTourismData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch tourism data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [location])

  useEffect(() => {
    fetchTourismData()
  }, [fetchTourismData])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case '증가': return 'text-green-600'
      case '감소': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case '증가': return <TrendingUp className="w-4 h-4 text-green-600" />
      case '감소': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
      default: return <TrendingUp className="w-4 h-4 text-gray-600" />
    }
  }

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return 'text-green-600'
    if (occupancy >= 60) return 'text-yellow-600'
    if (occupancy >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-orange-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-20"></div>
              <Camera className="w-6 h-6 text-orange-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              관광 현황 분석
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-orange-600" />
              <span className="text-gray-600">관광 데이터를 분석하는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!tourismData) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-red-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Camera className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">데이터 오류</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">관광 데이터를 불러올 수 없습니다.</p>
          <Button onClick={fetchTourismData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-orange-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-20"></div>
              <Camera className="w-6 h-6 text-orange-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              관광 현황 분석
            </span>
          </CardTitle>
          <Button onClick={fetchTourismData} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{String(tourismData.location) || location}</span>
          <span className="text-gray-400">|</span>
          <Clock className="w-4 h-4" />
          <span>실시간 업데이트</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 주요 지표 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">방문객 수</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {Number(tourismData.touristCount)?.toLocaleString() || '0'}명
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {getTrendIcon(String(tourismData.seasonalTrend) || '유지')}
              <span className={`text-xs ${getTrendColor(String(tourismData.seasonalTrend) || '유지')}`}>
                {String(tourismData.seasonalTrend) || '유지'}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">안전 평점</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-yellow-600">
                {Number(tourismData.safetyRating) || 0}/5
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {getRatingStars(Number(tourismData.safetyRating) || 0)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bed className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">숙박 점유율</span>
            </div>
            <div className={`text-2xl font-bold ${getOccupancyColor(Number(tourismData.accommodationOccupancy) || 0)}`}>
              {Number(tourismData.accommodationOccupancy) || 0}%
            </div>
            <div className="text-xs text-gray-600 mt-1">현재 예약률</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">평균 체류</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {Number(tourismData.averageStayDuration) || 0}일
            </div>
            <div className="text-xs text-gray-600 mt-1">관광객당</div>
          </div>
        </div>

        {/* 인기 관광지 */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(tourismData as any).popularAttractions && (tourismData as any).popularAttractions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>주요 관광 명소</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(tourismData as any).popularAttractions.map((attraction: string, index: number) => (
                <div key={index} className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-gray-800">{attraction}</span>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    안전 관광지 인증
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 안전 관광 브랜딩 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">SafeNergy 안전 관광 인증</span>
          </div>
          <div className="text-sm text-green-700 mb-2">
            실시간 안전 모니터링으로 검증된 안심 관광지입니다.
          </div>
          <div className="flex items-center space-x-4 text-xs text-green-600">
            <span>✓ 방사선량 실시간 모니터링</span>
            <span>✓ 대기질 상시 관리</span>
            <span>✓ 24시간 안전 보장</span>
          </div>
        </div>

        {/* 관광 경제 효과 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">지역 경제 기여도</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">
                {Math.round((Number(tourismData.touristCount) || 0) * 0.15)}억원
              </div>
              <div className="text-xs text-gray-600">월간 관광수입</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {Math.round((Number(tourismData.touristCount) || 0) * 0.002)}개
              </div>
              <div className="text-xs text-gray-600">창출 일자리</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {Math.round((Number(tourismData.accommodationOccupancy) || 0) * 1.2)}%
              </div>
              <div className="text-xs text-gray-600">지역상권 활성화</div>
            </div>
          </div>
        </div>

        {/* 업데이트 정보 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            문화체육관광부 · 한국관광공사 데이터 기반 | 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}