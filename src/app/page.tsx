'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SafetyIndexCard } from '@/components/SafetyIndexCard'
import { RadiationCard, WeatherCard, AirQualityCard } from '@/components/DataCard'
import { DashboardData, SafetyIndex, RadiationData, WeatherData, AirQualityData } from '@/types'
import { Shield, RefreshCw, MapPin, Clock, AlertTriangle } from 'lucide-react'
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

  const fetchData = async () => {
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
  }

  useEffect(() => {
    fetchData()
  }, [selectedPlant])

  // 자동 새로고침 (5분마다)
  useEffect(() => {
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [selectedPlant])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SafeNergy</h1>
                <p className="text-xs text-gray-500">에너지 안전 통합 모니터링 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>최종 업데이트: {lastUpdated.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button size="sm" variant="outline">
                    상세 대시보드
                  </Button>
                </Link>
                <Link href="/regions">
                  <Button size="sm" variant="outline">
                    지역별 정보
                  </Button>
                </Link>
                <Button
                  onClick={fetchData}
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>새로고침</span>
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
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">발전소 선택</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {powerPlants.map((plant) => (
              <Button
                key={plant}
                variant={selectedPlant === plant ? "default" : "outline"}
                onClick={() => setSelectedPlant(plant)}
                className="text-sm"
              >
                {plant}
              </Button>
            ))}
          </div>
        </div>

        {dashboardData && (
          <>
            {/* 통합 안전 지수 */}
            <div className="mb-8">
              <SafetyIndexCard safetyIndex={dashboardData.safetyIndex} />
            </div>

            {/* 상세 데이터 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <RadiationCard data={dashboardData.radiationData} />
              <WeatherCard data={dashboardData.weatherData} />
              <AirQualityCard data={dashboardData.airQualityData} />
            </div>

            {/* 알림 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span>현재 알림</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>현재 활성화된 알림이 없습니다.</p>
                  <p className="text-sm mt-2">모든 지표가 정상 범위 내에 있습니다.</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 SafeNergy. 에너지 안전 통합 모니터링 플랫폼</p>
            <p className="mt-1">
              데이터 제공: 한국수력원자력, 환경부 에어코리아, 기상청
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}