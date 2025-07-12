'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Database, 
  Globe, 
  Award,
  ExternalLink,
  Zap,
  Cloud,
  Eye,
  Shield,
  Building2,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Activity,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Download,
  Code,
  Play,
  Monitor,
  LineChart,
  Target,
  Layers,
  Search,
  Filter,
  Clock,
  Info,
  AlertCircle,
  Wifi
} from 'lucide-react'
import Link from 'next/link'

export default function DataPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'apis' | 'analytics' | 'docs'>('overview')
  const [dataStats, setDataStats] = useState({
    totalApiCalls: 0,
    activeEndpoints: 0,
    dataFreshness: 0,
    uptime: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 실시간 데이터 통계 업데이트
  const updateDataStats = useCallback(() => {
    setDataStats({
      totalApiCalls: Math.floor(Math.random() * 10000) + 50000,
      activeEndpoints: 12,
      dataFreshness: Math.floor(Math.random() * 30) + 90, // 90-100%
      uptime: 99.8 + Math.random() * 0.19 // 99.8-99.99%
    })
  }, [])

  useEffect(() => {
    updateDataStats()
    const interval = setInterval(updateDataStats, 30000) // 30초마다 업데이트
    return () => clearInterval(interval)
  }, [updateDataStats])
  const dataSources = [
    {
      category: "원자력 안전 데이터",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      provider: "한국수력원자력(KHNP)",
      description: "전국 원자력발전소의 실시간 방사선량 측정 데이터",
      dataVolume: "일 평균 2.4GB",
      lastUpdate: "2분전",
      reliability: 99.9,
      datasets: [
        {
          name: "실시간 방사선량 측정 데이터",
          description: "원자력발전소 주변 환경방사선량 실시간 측정값",
          updateFreq: "실시간 (1분 간격)",
          format: "JSON API",
          coverage: "전국 5개 원자력발전소",
          status: "활용중",
          apiCalls: "12,543/시간",
          sampleData: {
            "location": "고리원자력본부",
            "radiation_level": 0.08,
            "unit": "μSv/h",
            "timestamp": "2025-01-12T10:30:00Z"
          }
        },
        {
          name: "원자력발전소 기본정보",
          description: "발전소 위치, 규모, 운영현황 등 기본 정보",
          updateFreq: "수시",
          format: "JSON API",
          coverage: "전국 5개 원자력발전소",
          status: "활용중",
          apiCalls: "1,234/시간"
        },
        {
          name: "원전 운영 통계",
          description: "발전량, 가동률, 안전성 지표 등 운영 통계",
          updateFreq: "일 1회",
          format: "JSON API",
          coverage: "전국 5개 원자력발전소",
          status: "활용중",
          apiCalls: "567/시간"
        }
      ],
      website: "https://www.khnp.co.kr",
      dataPortal: "https://www.data.go.kr"
    },
    {
      category: "대기환경 데이터",
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      provider: "환경부 에어코리아",
      description: "전국 대기오염 측정소의 실시간 대기질 데이터",
      dataVolume: "일 평균 1.8GB",
      lastUpdate: "5분전",
      reliability: 99.7,
      datasets: [
        {
          name: "실시간 대기오염정보",
          description: "PM2.5, PM10, O3, NO2, SO2, CO 등 대기오염물질 농도",
          updateFreq: "실시간 (1시간 간격)",
          format: "JSON API",
          coverage: "전국 300여개 측정소",
          status: "활용중",
          apiCalls: "8,765/시간",
          sampleData: {
            "station": "부산 기장",
            "pm25": 15,
            "pm10": 28,
            "grade": "좋음"
          }
        },
        {
          name: "통합대기환경지수",
          description: "대기질 종합 평가 지수 (좋음, 보통, 나쁨, 매우나쁨)",
          updateFreq: "실시간 (1시간 간격)",
          format: "JSON API",
          coverage: "전국 주요 도시",
          status: "활용중",
          apiCalls: "4,321/시간"
        },
        {
          name: "대기질 예보정보",
          description: "내일·모레 대기질 예보 및 주의보 정보",
          updateFreq: "일 2회",
          format: "JSON API",
          coverage: "전국 시도별",
          status: "활용중",
          apiCalls: "2,108/시간"
        }
      ],
      website: "https://www.airkorea.or.kr",
      dataPortal: "https://www.data.go.kr"
    },
    {
      category: "기상 데이터",
      icon: <Cloud className="w-8 h-8 text-blue-600" />,
      provider: "기상청",
      description: "전국 기상관측소의 실시간 기상 관측 데이터",
      dataVolume: "일 평균 3.2GB",
      lastUpdate: "1분전",
      reliability: 99.95,
      datasets: [
        {
          name: "실시간 기상관측정보",
          description: "온도, 습도, 풍속, 풍향, 강수량 등 기상요소",
          updateFreq: "실시간 (10분 간격)",
          format: "JSON API",
          coverage: "전국 600여개 관측소",
          status: "활용중",
          apiCalls: "15,432/시간",
          sampleData: {
            "station": "부산",
            "temperature": 12.5,
            "humidity": 65,
            "wind_speed": 2.3
          }
        },
        {
          name: "기상특보 정보",
          description: "태풍, 호우, 강풍 등 기상특보 발령 정보",
          updateFreq: "수시",
          format: "JSON API",
          coverage: "전국",
          status: "활용중",
          apiCalls: "1,876/시간"
        },
        {
          name: "기상 예보정보",
          description: "단기·중기 기상예보 및 생활기상지수",
          updateFreq: "일 4회",
          format: "JSON API",
          coverage: "전국",
          status: "활용중",
          apiCalls: "3,567/시간"
        }
      ],
      website: "https://www.kma.go.kr",
      dataPortal: "https://www.data.go.kr"
    },
    {
      category: "관광 및 지역경제 데이터",
      icon: <Building2 className="w-8 h-8 text-orange-600" />,
      provider: "한국관광공사, 통계청",
      description: "관광객 현황 및 지역경제 영향 분석 데이터",
      dataVolume: "일 평균 800MB",
      lastUpdate: "30분전",
      reliability: 99.5,
      datasets: [
        {
          name: "지역별 관광객 현황",
          description: "원전 지역 방문객 수, 체류기간, 만족도 등",
          updateFreq: "주 1회",
          format: "JSON API",
          coverage: "원전 소재 5개 지역",
          status: "활용중",
          apiCalls: "2,345/시간"
        },
        {
          name: "지역경제 지표",
          description: "고용률, 지역내총생산, 소상공인 현황 등",
          updateFreq: "월 1회",
          format: "JSON API",
          coverage: "원전 소재 5개 지역",
          status: "활용중",
          apiCalls: "1,234/시간"
        }
      ],
      website: "https://www.visitkorea.or.kr",
      dataPortal: "https://www.data.go.kr"
    }
  ]

  const apiEndpoints = [
    {
      name: "SafeNergy Safety Index API",
      endpoint: "/api/safety-index",
      method: "GET",
      description: "종합 안전지수 계산 및 조회",
      parameters: ["location", "date_range"],
      responseTime: "120ms",
      uptime: "99.9%",
      rateLimits: "1000 req/hour"
    },
    {
      name: "Real-time Radiation API",
      endpoint: "/api/data/radiation",
      method: "GET",
      description: "실시간 방사선량 데이터 조회",
      parameters: ["plant", "time_range"],
      responseTime: "85ms",
      uptime: "99.95%",
      rateLimits: "5000 req/hour"
    },
    {
      name: "Air Quality API",
      endpoint: "/api/data/air-quality",
      method: "GET",
      description: "대기질 정보 조회",
      parameters: ["location", "pollutant"],
      responseTime: "95ms",
      uptime: "99.8%",
      rateLimits: "3000 req/hour"
    },
    {
      name: "Weather Data API",
      endpoint: "/api/data/weather",
      method: "GET",
      description: "기상정보 조회",
      parameters: ["plant", "forecast"],
      responseTime: "110ms",
      uptime: "99.85%",
      rateLimits: "2000 req/hour"
    },
    {
      name: "Business Metrics API",
      endpoint: "/api/business-metrics",
      method: "GET",
      description: "B2G/B2B 비즈니스 지표 조회",
      parameters: ["location", "type"],
      responseTime: "200ms",
      uptime: "99.7%",
      rateLimits: "500 req/hour"
    },
    {
      name: "Social Impact API",
      endpoint: "/api/social-impact",
      method: "GET",
      description: "사회적 영향 지표 조회",
      parameters: ["location", "category"],
      responseTime: "180ms",
      uptime: "99.6%",
      rateLimits: "500 req/hour"
    }
  ]

  const analyticsData = [
    {
      title: "API 사용량 트렌드",
      value: "↗ 34%",
      change: "지난달 대비",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      color: "green"
    },
    {
      title: "데이터 정확도",
      value: "99.2%",
      change: "실시간 검증",
      icon: <Target className="w-6 h-6 text-blue-600" />,
      color: "blue"
    },
    {
      title: "응답 속도",
      value: "127ms",
      change: "평균 응답시간",
      icon: <Activity className="w-6 h-6 text-purple-600" />,
      color: "purple"
    },
    {
      title: "활성 사용자",
      value: "2,847",
      change: "월간 순사용자",
      icon: <Users className="w-6 h-6 text-orange-600" />,
      color: "orange"
    }
  ]

  const apiUsage = [
    {
      name: "공공데이터포털 API",
      description: "정부 공공데이터 통합 제공 플랫폼",
      keyFeatures: ["실시간 API 제공", "다양한 데이터 포맷 지원", "인증키 기반 접근"],
      usage: "전체 데이터의 80% 활용"
    },
    {
      name: "기관별 직접 API",
      description: "각 기관에서 직접 제공하는 전용 API",
      keyFeatures: ["실시간 업데이트", "상세 메타데이터", "전문적 데이터"],
      usage: "전체 데이터의 20% 활용"
    }
  ]

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "안전성 강화",
      description: "실시간 모니터링을 통한 에너지 안전 관리 체계 구축"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "데이터 통합",
      description: "분산된 공공데이터를 통합하여 종합적 안전 지수 제공"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "국민 편의",
      description: "복잡한 데이터를 직관적으로 시각화하여 국민 접근성 향상"
    },
    {
      icon: <Building2 className="w-6 h-6 text-orange-600" />,
      title: "정책 지원",
      description: "데이터 기반 정책 수립 및 의사결정 지원"
    }
  ]

  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || source.category.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

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
                  <Database className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    데이터 & API 센터
                  </h1>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <p className="text-xs text-amber-600 font-medium">SafeNergy 통합 데이터 플랫폼</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                  대시보드
                </Button>
              </Link>
              <Link href="/regions">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" size="sm">
                  지역정보
                </Button>
              </Link>
              <Button 
                onClick={updateDataStats} 
                size="sm" 
                variant="outline" 
                className="border-green-200 hover:bg-green-50"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg">
          {[
            { id: 'overview', label: '개요', icon: BarChart3 },
            { id: 'sources', label: '데이터 소스', icon: Database },
            { id: 'apis', label: 'API 엔드포인트', icon: Code },
            { id: 'analytics', label: '사용 통계', icon: LineChart },
            { id: 'docs', label: '문서', icon: Info }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => setActiveTab(id as 'overview' | 'sources' | 'apis' | 'analytics' | 'docs')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === id 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg' 
                  : 'hover:bg-blue-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 실시간 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">총 API 호출</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {dataStats.totalApiCalls.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">↗ 실시간</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-green-100 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">활성 엔드포인트</p>
                      <p className="text-2xl font-bold text-green-600">
                        {dataStats.activeEndpoints}
                      </p>
                      <p className="text-xs text-green-600">100% 가용</p>
                    </div>
                    <Wifi className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-purple-100 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">데이터 신선도</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {dataStats.dataFreshness}%
                      </p>
                      <p className="text-xs text-purple-600">최신 상태</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-orange-100 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">시스템 가동률</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {dataStats.uptime.toFixed(2)}%
                      </p>
                      <p className="text-xs text-orange-600">안정 운영</p>
                    </div>
                    <Monitor className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 플랫폼 소개 */}
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-20"></div>
                    <Globe className="w-6 h-6 text-green-600 relative z-10" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    SafeNergy 통합 데이터 플랫폼
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  SafeNergy는 대한민국의 주요 공공기관에서 제공하는 실시간 데이터를 통합하여 
                  에너지 안전 모니터링 서비스를 제공합니다. 한국수력원자력, 환경부, 기상청의 
                  공공데이터를 활용하여 국민들에게 신뢰할 수 있는 안전 정보를 제공합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="flex justify-center mb-2">
                        {benefit.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 주요 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.map((item, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-gray-100 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {item.value}
                    </div>
                    <p className="text-sm text-gray-600">{item.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 데이터 소스 탭 */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            {/* 검색 및 필터 */}
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="데이터 소스 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">모든 카테고리</option>
                      <option value="원자력">원자력 데이터</option>
                      <option value="대기환경">대기환경 데이터</option>
                      <option value="기상">기상 데이터</option>
                      <option value="관광">관광/경제 데이터</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 데이터 소스 목록 */}
            <div className="grid grid-cols-1 gap-6">
              {filteredDataSources.map((source, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20"></div>
                          <div className="relative z-10">{source.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{source.category}</h3>
                          <p className="text-sm text-gray-600">{source.provider}</p>
                        </div>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500">데이터량</p>
                          <p className="font-semibold text-blue-600">{source.dataVolume}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">마지막 업데이트</p>
                          <p className="font-semibold text-green-600">{source.lastUpdate}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">신뢰도</p>
                          <p className="font-semibold text-purple-600">{source.reliability}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Link href={source.website} target="_blank">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          기관 사이트
                        </Button>
                      </Link>
                      <Link href={source.dataPortal} target="_blank">
                        <Button variant="outline" size="sm">
                          <Globe className="w-4 h-4 mr-1" />
                          공공데이터포털
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        샘플 데이터
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{source.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {source.datasets.map((dataset, dataIndex) => (
                        <div key={dataIndex} className="bg-white/50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 text-sm">{dataset.name}</h4>
                            <Badge className={dataset.status === '활용중' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {dataset.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{dataset.description}</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{dataset.updateFreq}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Database className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{dataset.format}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{dataset.coverage}</span>
                            </div>
                            {dataset.apiCalls && (
                              <div className="flex items-center space-x-2">
                                <Activity className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-600">{dataset.apiCalls}</span>
                              </div>
                            )}
                          </div>
                          {dataset.sampleData && (
                            <details className="mt-3">
                              <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                                샘플 데이터 보기
                              </summary>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                                {JSON.stringify(dataset.sampleData, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* API 엔드포인트 탭 */}
        {activeTab === 'apis' && (
          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-blue-600" />
                  <span>SafeNergy API 엔드포인트</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  SafeNergy 플랫폼에서 제공하는 모든 API 엔드포인트 목록입니다. 
                  각 API는 RESTful 설계 원칙을 따르며, JSON 형태로 데이터를 반환합니다.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {apiEndpoints.map((api, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{api.name}</h4>
                            <Badge className="bg-blue-100 text-blue-700">{api.method}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{api.description}</p>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {api.endpoint}
                          </code>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3 mr-1" />
                            테스트
                          </Button>
                          <Button size="sm" variant="outline">
                            <Code className="w-3 h-3 mr-1" />
                            예제
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">파라미터</p>
                          <p className="font-medium text-gray-700">
                            {api.parameters.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">응답시간</p>
                          <p className="font-medium text-green-600">{api.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">가동률</p>
                          <p className="font-medium text-blue-600">{api.uptime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">요청 한도</p>
                          <p className="font-medium text-purple-600">{api.rateLimits}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API 활용 가이드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apiUsage.map((api, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-green-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">{api.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{api.description}</p>
                    <div className="space-y-2 mb-4">
                      {api.keyFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">{api.usage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 사용 통계 탭 */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* 실시간 사용량 */}
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <span>실시간 API 사용 통계</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">인기 엔드포인트</h4>
                    {[
                      { name: 'Safety Index API', calls: 12543, percentage: 45 },
                      { name: 'Radiation API', calls: 8765, percentage: 32 },
                      { name: 'Air Quality API', calls: 4321, percentage: 15 },
                      { name: 'Weather API', calls: 2108, percentage: 8 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.calls.toLocaleString()} 호출</p>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">지역별 사용량</h4>
                    {[
                      { region: '고리', usage: 28 },
                      { region: '월성', usage: 24 },
                      { region: '한빛', usage: 22 },
                      { region: '한울', usage: 16 },
                      { region: '새울', usage: 10 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">{item.region}원자력본부</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${item.usage * 3}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 w-8">{item.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">사용자 유형</h4>
                    {[
                      { type: '연구기관', count: 45, color: 'bg-blue-600' },
                      { type: '정부기관', count: 32, color: 'bg-green-600' },
                      { type: '민간기업', count: 28, color: 'bg-purple-600' },
                      { type: '개인개발자', count: 23, color: 'bg-orange-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <p className="text-sm font-medium text-gray-700 flex-1">{item.type}</p>
                        <span className="text-sm text-gray-600">{item.count}개</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 성능 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.map((item, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-gray-100 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {item.value}
                    </div>
                    <p className="text-sm text-gray-600">{item.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 문서 탭 */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Info className="w-6 h-6 text-blue-600" />
                  <span>API 문서 및 가이드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "시작 가이드",
                      description: "SafeNergy API 사용을 위한 기본 설정 및 인증 방법",
                      icon: <Play className="w-6 h-6 text-green-600" />,
                      sections: ["API 키 발급", "인증 방법", "기본 요청 형식"]
                    },
                    {
                      title: "API 참조",
                      description: "모든 엔드포인트의 상세 스펙 및 파라미터 설명",
                      icon: <Code className="w-6 h-6 text-blue-600" />,
                      sections: ["엔드포인트 목록", "요청/응답 형식", "에러 코드"]
                    },
                    {
                      title: "데이터 모델",
                      description: "API에서 사용하는 데이터 구조 및 스키마 정의",
                      icon: <Layers className="w-6 h-6 text-purple-600" />,
                      sections: ["안전지수 모델", "환경 데이터", "비즈니스 지표"]
                    },
                    {
                      title: "사용 예제",
                      description: "실제 사용 사례와 코드 예제 모음",
                      icon: <Download className="w-6 h-6 text-orange-600" />,
                      sections: ["JavaScript", "Python", "cURL"]
                    },
                    {
                      title: "정책 & 제한",
                      description: "API 사용 정책, 요청 한도 및 이용약관",
                      icon: <Shield className="w-6 h-6 text-red-600" />,
                      sections: ["사용 정책", "요청 한도", "데이터 라이선스"]
                    },
                    {
                      title: "FAQ & 지원",
                      description: "자주 묻는 질문과 기술 지원 정보",
                      icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
                      sections: ["FAQ", "문제 해결", "연락처"]
                    }
                  ].map((doc, index) => (
                    <Card key={index} className="bg-white/50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          {doc.icon}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{doc.title}</h4>
                            <p className="text-sm text-gray-600">{doc.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {doc.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-gray-700">{section}</span>
                            </div>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-4">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          문서 보기
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 데이터 정책 및 라이선스 */}
        <Card className="bg-white/60 backdrop-blur-sm border-yellow-100 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-sm opacity-20"></div>
                <Shield className="w-6 h-6 text-yellow-600 relative z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                데이터 정책 및 이용약관
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">공공데이터 이용원칙</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>공공데이터의 개방·공유·활용 촉진에 관한 법률 준수</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>개인정보보호법 및 정보보안 관련 법령 준수</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>데이터 제공기관의 이용약관 및 API 정책 준수</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>비영리적 목적의 공익적 활용</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">데이터 출처 표기</h4>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <p className="text-gray-700 leading-relaxed">
                    본 서비스에서 활용하는 모든 데이터는 해당 제공기관의 공식 API를 통해 수집되며, 
                    데이터의 저작권은 원 제공기관에 있습니다. 
                    <br /><br />
                    <strong>데이터 제공:</strong><br />
                    • 한국수력원자력(주)<br />
                    • 환경부 에어코리아<br />
                    • 기상청<br />
                    • 한국관광공사<br />
                    • 통계청<br />
                    • 공공데이터포털(data.go.kr)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 푸터 */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-blue-200 text-sm">
              © 2025 SafeNergy. 한국수력원자력 공공데이터 활용 아이디어 공모전 출품작
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}