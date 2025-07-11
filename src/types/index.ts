export interface RadiationData {
  id: string
  plantName: string
  measurementTime: Date
  radiationLevel: number
  unit: string
  status: string
  latitude: number
  longitude: number
}

export interface WeatherData {
  id: string
  plantName: string
  measurementTime: Date
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: string
  rainfall: number
  unitTemp: string
  unitWind: string
  unitRain: string
}

export interface AirQualityData {
  id: string
  location: string
  measurementTime: Date
  pm10?: number
  pm25?: number
  o3?: number
  no2?: number
  so2?: number
  co?: number
  overallIndex?: number
  grade?: string
}

export interface SafetyIndex {
  id: string
  location: string
  calculatedTime: Date
  radiationScore: number
  airQualityScore: number
  weatherScore: number
  overallScore: number
  safetyGrade: '안전' | '주의' | '경고' | '위험'
}

export interface PowerPlant {
  id: string
  name: string
  displayName: string
  type: string
  latitude: number
  longitude: number
  region: string
  address: string
  isActive: boolean
}

export interface Alert {
  id: string
  type: 'radiation' | 'air_quality' | 'weather'
  severity: 'warning' | 'alert' | 'critical'
  title: string
  message: string
  location: string
  isActive: boolean
  triggeredAt: Date
  resolvedAt?: Date
}

export interface DashboardData {
  safetyIndex: SafetyIndex
  radiationData: RadiationData
  weatherData: WeatherData
  airQualityData: AirQualityData
  alerts: Alert[]
}