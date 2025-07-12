'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadiationChart, WeatherChart, AirQualityChart } from '@/components/DataChart'
import { SafetyIndexCard } from '@/components/SafetyIndexCard'
import { RadiationData, WeatherData, AirQualityData, SafetyIndex } from '@/types'
import { BarChart3, RefreshCw, ArrowLeft, MapPin, Award, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlant, setSelectedPlant] = useState('고리원자력본부')
  const [radiationData, setRadiationData] = useState<RadiationData[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [airQualityData, setAirQualityData] = useState<AirQualityData[]>([])
  const [safetyIndex, setSafetyIndex] = useState<SafetyIndex | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const powerPlants = [
    '고리원자력본부',
    '한빛원자력본부', 
    '월성원자력본부',
    '한울원자력본부',
    '새울원자력본부'
  ]

  const fetchHistoricalData = useCallback(async () => {
    setIsLoading(true)
    try {
      // 실제 환경에서는 히스토리 API를 호출하지만, 
      // 현재는 현재 데이터를 기반으로 시간대별 모의 데이터 생성
      const now = new Date()
      const mockRadiationData: RadiationData[] = []
      const mockWeatherData: WeatherData[] = []
      const mockAirQualityData: AirQualityData[] = []

      // 24시간 데이터 생성
      for (let i = 23; i >= 0; i--) {
        const timePoint = new Date(now.getTime() - i * 60 * 60 * 1000)
        
        // 방사선 데이터
        mockRadiationData.push({
          id: `radiation-${i}`,
          plantName: selectedPlant,
          measurementTime: timePoint,
          radiationLevel: 0.05 + Math.random() * 0.03,
          unit: 'μSv/h',
          status: '정상',
          latitude: 35.2736,
          longitude: 129.2902
        })

        // 기상 데이터
        mockWeatherData.push({
          id: `weather-${i}`,
          plantName: selectedPlant,
          measurementTime: timePoint,
          temperature: 20 + Math.random() * 10,
          humidity: 50 + Math.random() * 30,
          windSpeed: 2 + Math.random() * 8,
          windDirection: ['북풍', '남풍', '동풍', '서풍'][Math.floor(Math.random() * 4)],
          rainfall: Math.random() * 5,
          unitTemp: '°C',
          unitWind: 'm/s',
          unitRain: 'mm'
        })

        // 대기질 데이터
        mockAirQualityData.push({
          id: `air-${i}`,
          location: selectedPlant.replace('원자력본부', ''),
          measurementTime: timePoint,
          pm25: 15 + Math.random() * 20,
          pm10: 30 + Math.random() * 40,
          o3: Math.random() * 0.1,
          no2: Math.random() * 0.05,
          so2: Math.random() * 0.02,
          co: 1 + Math.random() * 4,
          overallIndex: 50 + Math.random() * 30,
          grade: ['좋음', '보통', '나쁨'][Math.floor(Math.random() * 3)]
        })
      }

      setRadiationData(mockRadiationData)
      setWeatherData(mockWeatherData)
      setAirQualityData(mockAirQualityData)

      // 현재 안전 지수 가져오기
      const safetyRes = await fetch(`/api/safety-index?location=${selectedPlant}`)
      const safetyIndexData = await safetyRes.json()
      setSafetyIndex(safetyIndexData)

    } catch (error) {
      console.error('대시보드 데이터 가져오기 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedPlant])

  useEffect(() => {
    fetchHistoricalData()
  }, [fetchHistoricalData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <BarChart3 className="w-16 h-16 text-blue-600 mx-auto relative z-10" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            상세 대시보드
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">대시보드 데이터를 불러오는 중...</p>
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <p className="text-sm text-amber-600">한국수력원자력 공공데이터 활용 아이디어 공모전 출품작</p>
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
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-20"></div>
                  <BarChart3 className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    상세 대시보드
                  </h1>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <p className="text-xs text-amber-600 font-medium">한국수력원자력 공공데이터 활용 아이디어 공모전 출품작</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* 모바일 메뉴 버튼 */}
              <div className="flex md:hidden">
                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  size="sm"
                  variant="outline"
                  className="flex items-center border-blue-200 hover:bg-blue-50"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
              
              {/* 데스크톱 및 새로고침 버튼 */}
              <Button
                onClick={fetchHistoricalData}
                size="sm"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">새로고침</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* 모바일 메뉴 슬라이드 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
                  홈
                </Button>
              </Link>
              <Link href="/regions" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
                  지역별 정보
                </Button>
              </Link>
              <Link href="/data" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" variant="outline" className="w-full border-purple-200 hover:bg-purple-50">
                  활용 공공데이터
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 발전소 선택 */}
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

        {/* 현재 안전 지수 */}
        {safetyIndex && (
          <div className="mb-8">
            <SafetyIndexCard safetyIndex={safetyIndex} />
          </div>
        )}

        {/* 차트 그리드 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RadiationChart data={radiationData} />
          <WeatherChart data={weatherData} />
        </div>

        <div className="mt-6">
          <AirQualityChart data={airQualityData} />
        </div>

        {/* 데이터 요약 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>24시간 데이터 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {radiationData.length > 0 ? 
                    `${Math.max(...radiationData.map(d => d.radiationLevel || 0)).toFixed(3)}` : 
                    'N/A'
                  }
                </div>
                <div className="text-sm text-gray-500">최고 방사선량 (μSv/h)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {weatherData.length > 0 ? 
                    `${Math.max(...weatherData.map(d => d.temperature || 0)).toFixed(1)}°C` : 
                    'N/A'
                  }
                </div>
                <div className="text-sm text-gray-500">최고 기온</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {airQualityData.length > 0 ? 
                    `${Math.max(...airQualityData.map(d => d.pm25 || 0)).toFixed(0)}` : 
                    'N/A'
                  }
                </div>
                <div className="text-sm text-gray-500">최고 PM2.5 (μg/m³)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}