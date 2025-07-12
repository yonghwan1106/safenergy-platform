'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SafetyIndexCard } from '@/components/SafetyIndexCard'
import { RadiationCard, WeatherCard, AirQualityCard } from '@/components/DataCard'
import { DashboardData } from '@/types'
import { 
  MapPin, 
  ArrowLeft, 
  Building,
  Users,
  TreePine,
  Waves,
  Award,
  RefreshCw,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'

export default function RegionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState('고리원자력본부')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [nearbyFacilities, setNearbyFacilities] = useState<{ name: string; icon: string; distance: string; count: number }[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const regions = useMemo(() => [
    {
      name: '고리원자력본부',
      location: '부산광역시 기장군',
      coordinates: { lat: 35.2736, lng: 129.2902 },
      description: '한국 최초의 원자력발전소',
      nearbyTourism: ['해운대 해수욕장', '기장 죽성리 벚꽃', '일광 해수욕장'],
      population: '약 15만명 (기장군)'
    },
    {
      name: '한빛원자력본부',
      location: '전라남도 영광군',
      coordinates: { lat: 35.4089, lng: 126.4178 },
      description: '서남해안 최대 규모 원자력발전소',
      nearbyTourism: ['칠산 바다', '백수 해안도로', '불갑사'],
      population: '약 5만명 (영광군)'
    },
    {
      name: '월성원자력본부',
      location: '경상북도 경주시',
      coordinates: { lat: 35.7175, lng: 129.4844 },
      description: '경주 역사문화 도시 인근',
      nearbyTourism: ['불국사', '석굴암', '경주 역사유적지구'],
      population: '약 25만명 (경주시)'
    },
    {
      name: '한울원자력본부',
      location: '경상북도 울진군',
      coordinates: { lat: 36.7628, lng: 129.4097 },
      description: '동해안 최대 원자력발전소',
      nearbyTourism: ['망양 해수욕장', '울진 금강송 숲', '성류굴'],
      population: '약 5만명 (울진군)'
    },
    {
      name: '새울원자력본부',
      location: '강원도 삼척시',
      coordinates: { lat: 36.3392, lng: 129.2981 },
      description: '최신 원자력발전소 (건설 중)',
      nearbyTourism: ['삼척 해수욕장', '환선굴', '대금굴'],
      population: '약 7만명 (삼척시)'
    }
  ], [])

  const fetchRegionData = useCallback(async () => {
    setIsLoading(true)
    try {
      // 기본 데이터 가져오기
      const [radiationRes, weatherRes, airQualityRes] = await Promise.all([
        fetch(`/api/data/radiation?plant=${selectedRegion}`),
        fetch(`/api/data/weather?plant=${selectedRegion}`),
        fetch(`/api/data/air-quality?location=${selectedRegion.replace('원자력본부', '')}`),
      ])

      const radiationData = await radiationRes.json()
      const weatherData = await weatherRes.json()
      const airQualityData = await airQualityRes.json()

      const safetyRes = await fetch(`/api/safety-index?location=${selectedRegion}`)
      const safetyIndex = await safetyRes.json()

      setDashboardData({
        safetyIndex,
        radiationData,
        weatherData,
        airQualityData,
        alerts: []
      })

      // 인근 시설 정보 (모의 데이터)
      const selectedRegionData = regions.find(r => r.name === selectedRegion)
      if (selectedRegionData) {
        const facilities = [
          { name: '병원', icon: '🏥', distance: '3.2km', count: 5 },
          { name: '학교', icon: '🏫', distance: '5.1km', count: 12 },
          { name: '관광지', icon: '🏛️', distance: '8.7km', count: 3 },
          { name: '해수욕장', icon: '🏖️', distance: '12.3km', count: 2 }
        ]
        setNearbyFacilities(facilities)
      }

    } catch (error) {
      console.error('지역 데이터 가져오기 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedRegion, regions])

  useEffect(() => {
    fetchRegionData()
  }, [fetchRegionData])

  const selectedRegionData = regions.find(r => r.name === selectedRegion)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <MapPin className="w-16 h-16 text-blue-600 mx-auto relative z-10" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            지역별 정보
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">지역 정보를 불러오는 중...</p>
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
                  <MapPin className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    지역별 정보
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
              
              {/* 데스크톱 메뉴 */}
              <div className="hidden md:block">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" size="sm">
                    상세 대시보드
                  </Button>
                </Link>
              </div>
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
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                  상세 대시보드
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
        {/* 지역 선택 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">발전소 지역 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region) => (
              <Card 
                key={region.name}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRegion === region.name ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedRegion(region.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{region.name}</h3>
                    {selectedRegion === region.name && (
                      <Badge className="bg-blue-100 text-blue-800">선택됨</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{region.location}</p>
                  <p className="text-xs text-gray-500">{region.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedRegionData && (
          <>
            {/* 지역 정보 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span>지역 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">위치</div>
                      <div className="font-medium">{selectedRegionData.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">좌표</div>
                      <div className="font-medium">
                        {selectedRegionData.coordinates.lat.toFixed(4)}, {selectedRegionData.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">설명</div>
                      <div className="font-medium">{selectedRegionData.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>인구 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">인구 수</div>
                      <div className="font-medium text-lg">{selectedRegionData.population}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">인근 시설</div>
                      <div className="space-y-1">
                        {nearbyFacilities.map((facility, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{facility.icon} {facility.name}</span>
                            <span className="text-gray-500">{facility.count}개</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="w-5 h-5 text-purple-600" />
                    <span>주요 관광지</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedRegionData.nearbyTourism.map((place, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Waves className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">{place}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 안전 지수 및 데이터 */}
            {dashboardData && (
              <>
                <div className="mb-8">
                  <SafetyIndexCard safetyIndex={dashboardData.safetyIndex} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <RadiationCard data={dashboardData.radiationData} />
                  <WeatherCard data={dashboardData.weatherData} />
                  <AirQualityCard data={dashboardData.airQualityData} />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}