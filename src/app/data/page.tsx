'use client'

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
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function DataPage() {
  const dataSources = [
    {
      category: "원자력 안전 데이터",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      provider: "한국수력원자력(KHNP)",
      description: "전국 원자력발전소의 실시간 방사선량 측정 데이터",
      datasets: [
        {
          name: "실시간 방사선량 측정 데이터",
          description: "원자력발전소 주변 환경방사선량 실시간 측정값",
          updateFreq: "실시간 (1분 간격)",
          format: "JSON API",
          coverage: "전국 5개 원자력발전소",
          status: "활용중"
        },
        {
          name: "원자력발전소 기본정보",
          description: "발전소 위치, 규모, 운영현황 등 기본 정보",
          updateFreq: "수시",
          format: "JSON API",
          coverage: "전국 5개 원자력발전소",
          status: "활용중"
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
      datasets: [
        {
          name: "실시간 대기오염정보",
          description: "PM2.5, PM10, O3, NO2, SO2, CO 등 대기오염물질 농도",
          updateFreq: "실시간 (1시간 간격)",
          format: "JSON API",
          coverage: "전국 300여개 측정소",
          status: "활용중"
        },
        {
          name: "통합대기환경지수",
          description: "대기질 종합 평가 지수 (좋음, 보통, 나쁨, 매우나쁨)",
          updateFreq: "실시간 (1시간 간격)",
          format: "JSON API",
          coverage: "전국 주요 도시",
          status: "활용중"
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
      datasets: [
        {
          name: "실시간 기상관측정보",
          description: "온도, 습도, 풍속, 풍향, 강수량 등 기상요소",
          updateFreq: "실시간 (10분 간격)",
          format: "JSON API",
          coverage: "전국 600여개 관측소",
          status: "활용중"
        },
        {
          name: "기상특보 정보",
          description: "태풍, 호우, 강풍 등 기상특보 발령 정보",
          updateFreq: "수시",
          format: "JSON API",
          coverage: "전국",
          status: "계획중"
        }
      ],
      website: "https://www.kma.go.kr",
      dataPortal: "https://www.data.go.kr"
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
                    활용 공공데이터
                  </h1>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <p className="text-xs text-amber-600 font-medium">한국수력원자력 공공데이터 활용 아이디어 공모전 출품작</p>
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
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 소개 섹션 */}
        <div className="mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-20"></div>
                  <Globe className="w-6 h-6 text-green-600 relative z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  SafeNergy 플랫폼에서 활용하는 공공데이터
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
        </div>

        {/* 데이터 소스 섹션 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Database className="w-6 h-6 text-blue-600" />
            <span>활용 데이터 소스</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {dataSources.map((source, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20"></div>
                      <div className="relative z-10">{source.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{source.category}</h3>
                      <p className="text-sm text-gray-600">{source.provider}</p>
                    </div>
                    <div className="flex items-center space-x-2">
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
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">{source.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {source.datasets.map((dataset, dataIndex) => (
                      <div key={dataIndex} className="bg-white/50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{dataset.name}</h4>
                          <Badge className={dataset.status === '활용중' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {dataset.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">업데이트 주기: {dataset.updateFreq}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Database className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">데이터 형식: {dataset.format}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">범위: {dataset.coverage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* API 활용 방식 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Globe className="w-6 h-6 text-green-600" />
            <span>API 활용 방식</span>
          </h2>
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