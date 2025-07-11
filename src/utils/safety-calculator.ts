import { RadiationData, WeatherData, AirQualityData, SafetyIndex } from '@/types'

// 방사선량 점수 계산 (0-100)
function calculateRadiationScore(radiationLevel: number): number {
  if (radiationLevel <= 0.1) return 100
  if (radiationLevel <= 0.3) return 80
  if (radiationLevel <= 1.0) return 60
  if (radiationLevel <= 2.0) return 40
  return 20
}

// 대기질 점수 계산 (0-100)
function calculateAirQualityScore(airQuality: AirQualityData): number {
  if (!airQuality.pm25 && !airQuality.pm10) return 100
  
  let score = 100
  
  // PM2.5 기준
  if (airQuality.pm25) {
    if (airQuality.pm25 <= 15) score = Math.min(score, 100)
    else if (airQuality.pm25 <= 35) score = Math.min(score, 80)
    else if (airQuality.pm25 <= 75) score = Math.min(score, 60)
    else score = Math.min(score, 40)
  }
  
  // PM10 기준
  if (airQuality.pm10) {
    if (airQuality.pm10 <= 30) score = Math.min(score, 100)
    else if (airQuality.pm10 <= 80) score = Math.min(score, 80)
    else if (airQuality.pm10 <= 150) score = Math.min(score, 60)
    else score = Math.min(score, 40)
  }
  
  return score
}

// 기상 점수 계산 (0-100)
function calculateWeatherScore(weather: WeatherData): number {
  let score = 100
  
  // 강풍 체크
  if (weather.windSpeed >= 14) score = Math.min(score, 60)
  else if (weather.windSpeed >= 10) score = Math.min(score, 80)
  
  // 강우 체크
  if (weather.rainfall >= 20) score = Math.min(score, 60)
  else if (weather.rainfall >= 10) score = Math.min(score, 80)
  
  // 극한 온도 체크
  if (weather.temperature >= 35 || weather.temperature <= -10) {
    score = Math.min(score, 70)
  }
  
  return score
}

// 통합 안전 지수 계산
export function calculateSafetyIndex(
  radiation: RadiationData,
  weather: WeatherData,
  airQuality: AirQualityData,
  location: string
): SafetyIndex {
  const radiationScore = calculateRadiationScore(radiation.radiationLevel)
  const airQualityScore = calculateAirQualityScore(airQuality)
  const weatherScore = calculateWeatherScore(weather)
  
  // 가중치 적용: 방사선량 40%, 대기질 35%, 기상 25%
  const overallScore = Math.round(
    radiationScore * 0.4 + 
    airQualityScore * 0.35 + 
    weatherScore * 0.25
  )
  
  // 안전 등급 결정
  let safetyGrade: '안전' | '주의' | '경고' | '위험'
  if (overallScore >= 80) safetyGrade = '안전'
  else if (overallScore >= 60) safetyGrade = '주의'
  else if (overallScore >= 40) safetyGrade = '경고'
  else safetyGrade = '위험'
  
  return {
    id: '', // 실제 저장 시 생성
    location,
    calculatedTime: new Date(),
    radiationScore,
    airQualityScore,
    weatherScore,
    overallScore,
    safetyGrade
  }
}

// 안전 등급별 색상 반환
export function getSafetyGradeColor(grade: string): string {
  switch (grade) {
    case '안전': return 'text-green-600 bg-green-100'
    case '주의': return 'text-yellow-600 bg-yellow-100'
    case '경고': return 'text-orange-600 bg-orange-100'
    case '위험': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}