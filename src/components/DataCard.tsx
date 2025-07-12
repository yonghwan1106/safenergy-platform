'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadiationData, WeatherData, AirQualityData } from '@/types'
import { 
  Zap, 
  Cloud, 
  Wind, 
  Thermometer,
  Droplets,
  Eye
} from 'lucide-react'

interface RadiationCardProps {
  data: RadiationData
}

interface WeatherCardProps {
  data: WeatherData
}

interface AirQualityCardProps {
  data: AirQualityData
}

export function RadiationCard({ data }: RadiationCardProps) {
  const getStatusColor = (status: string) => {
    return status === '정상' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium">방사선량</span>
          </div>
          <Badge className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              {data.radiationLevel?.toFixed(3) || 'N/A'}
            </span>
            <span className="text-sm text-gray-500">{data.unit}</span>
          </div>
          <div className="text-sm text-gray-600">
            📍 {data.plantName}
          </div>
          <div className="text-xs text-gray-500">
            측정시간: {new Date(data.measurementTime).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Cloud className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">기상정보</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <div>
                <div className="text-lg font-semibold">
                  {data.temperature}{data.unitTemp}
                </div>
                <div className="text-xs text-gray-500">온도</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-lg font-semibold">
                  {data.humidity}%
                </div>
                <div className="text-xs text-gray-500">습도</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">
                  {data.windSpeed}{data.unitWind}
                </div>
                <div className="text-xs text-gray-500">{data.windDirection}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">
                  {data.rainfall}{data.unitRain}
                </div>
                <div className="text-xs text-gray-500">강수량</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 pt-2">
            📍 {data.plantName}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AirQualityCard({ data }: AirQualityCardProps) {
  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case '좋음': return 'text-green-600 bg-green-100'
      case '보통': return 'text-yellow-600 bg-yellow-100'
      case '나쁨': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">대기질</span>
          </div>
          {data.grade && (
            <Badge className={getGradeColor(data.grade)}>
              {data.grade}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">
                {data.pm25 || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">PM2.5</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">
                {data.pm10 || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">PM10</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-medium">
                {data.o3?.toFixed(3) || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">O3</div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {data.no2?.toFixed(3) || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">NO2</div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {data.so2?.toFixed(3) || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">SO2</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 pt-2">
            📍 {data.location}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}