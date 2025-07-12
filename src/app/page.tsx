'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SafetyIndexCard } from '@/components/SafetyIndexCard'
import { RadiationCard, WeatherCard, AirQualityCard } from '@/components/DataCard'
import { DashboardData } from '@/types'
import { Shield, RefreshCw, Clock, AlertTriangle, Zap, Award, Globe } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlant, setSelectedPlant] = useState('고리원자력본부')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const powerPlants = [
    '고리원자력본부',
    '한빛원자력본부', 
    '월성원자력본부',
    '한울원자력본부',
    '새울원자력본부'
  ]

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      // 병렬로 데이터 가져오기
      const [radiationRes, weatherRes, airQualityRes] = await Promise.all([
        fetch(`/api/data/radiation?plant=${selectedPlant}`),
        fetch(`/api/data/weather?plant=${selectedPlant}`),
        fetch(`/api/data/air-quality?location=${selectedPlant.replace('원자력본부', '')}`),
      ])

      const radiationData = await radiationRes.json()
      const weatherData = await weatherRes.json()
      const airQualityData = await airQualityRes.json()

      // 안전 지수 계산
      const safetyRes = await fetch(`/api/safety-index?location=${selectedPlant}`)
      const safetyIndex = await safetyRes.json()

      setDashboardData({
        safetyIndex,
        radiationData,
        weatherData,
        airQualityData,
        alerts: [] // 임시로 빈 배열
      })
      
      setLastUpdated(new Date())
    } catch (error) {
      console.error('데이터 가져오기 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedPlant])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // 자동 새로고침 (5분마다)
  useEffect(() => {
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <Shield className="w-16 h-16 text-blue-600 mx-auto relative z-10" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            SafeNergy
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">데이터를 불러오는 중...</p>
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <p className="text-sm text-amber-600">한국수력원자력 공공데이터 활용 아이디어 공모전 출품작</p>
          </div>
          <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-20"></div>
                <Shield className="w-10 h-10 text-blue-600 relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  SafeNergy
                </h1>
                <p className="text-sm text-gray-600 font-medium">에너지 안전 통합 모니터링 플랫폼</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  <p className="text-xs text-amber-600 font-medium">한국수력원자력 공공데이터 활용 아이디어 공모전 출품작</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4" />
                <span>최종 업데이트: {lastUpdated.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                    상세 대시보드
                  </Button>
                </Link>
                <Link href="/regions">
                  <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50">
                    지역별 정보
                  </Button>
                </Link>
                <Link href="/data">
                  <Button size="sm" variant="outline" className="border-purple-200 hover:bg-purple-50">
                    활용 공공데이터
                  </Button>
                </Link>
                <Button
                  onClick={fetchData}
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-2 border-green-200 hover:bg-green-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">새로고침</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 발전소 선택 탭 */}
        <div className="mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-20"></div>
                  <Zap className="w-6 h-6 text-green-600 relative z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  발전소 선택
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {powerPlants.map((plant) => (
                  <Button
                    key={plant}
                    variant={selectedPlant === plant ? "default" : "outline"}
                    onClick={() => setSelectedPlant(plant)}
                    className={`text-sm font-medium transition-all duration-200 ${
                      selectedPlant === plant 
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg transform scale-105' 
                        : 'border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {plant}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {dashboardData && (
          <>
            {/* 통합 안전 지수 */}
            <div className="mb-8">
              <SafetyIndexCard safetyIndex={dashboardData.safetyIndex} />
            </div>

            {/* 상세 데이터 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="transform hover:scale-105 transition-all duration-200">
                <RadiationCard data={dashboardData.radiationData} />
              </div>
              <div className="transform hover:scale-105 transition-all duration-200">
                <WeatherCard data={dashboardData.weatherData} />
              </div>
              <div className="transform hover:scale-105 transition-all duration-200">
                <AirQualityCard data={dashboardData.airQualityData} />
              </div>
            </div>

            {/* 알림 섹션 */}
            <Card className="bg-white/60 backdrop-blur-sm border-yellow-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-sm opacity-20"></div>
                    <AlertTriangle className="w-6 h-6 text-yellow-600 relative z-10" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    현재 알림
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium">현재 활성화된 알림이 없습니다.</p>
                  <p className="text-sm mt-2 text-gray-500">모든 지표가 정상 범위 내에 있습니다.</p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center space-x-2 bg-green-50 rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-700 font-medium">시스템 정상 작동 중</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-300" />
                <h3 className="text-xl font-bold">SafeNergy</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                한국의 에너지 안전을 위한<br />
                통합 모니터링 플랫폼
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-amber-100">공모전 출품작</h4>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                한국수력원자력<br />
                공공데이터 활용 아이디어 공모전
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-4">
                <Globe className="w-5 h-5 text-green-400" />
                <h4 className="text-lg font-semibold text-green-100">데이터 제공</h4>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                한국수력원자력<br />
                환경부 에어코리아<br />
                기상청
              </p>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-8 pt-6 text-center">
            <p className="text-blue-200 text-sm">
              © 2025 SafeNergy. All rights reserved. | 에너지 안전 통합 모니터링 플랫폼
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}