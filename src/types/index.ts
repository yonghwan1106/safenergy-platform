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
  pm10?: number | null
  pm25?: number | null
  o3?: number | null
  no2?: number | null
  so2?: number | null
  co?: number | null
  overallIndex?: number | null
  grade?: string | null
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