'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { RadiationData, WeatherData, AirQualityData } from '@/types'
import { TrendingUp, Activity, Wind } from 'lucide-react'

interface RadiationChartProps {
  data: RadiationData[]
}

interface WeatherChartProps {
  data: WeatherData[]
}

interface AirQualityChartProps {
  data: AirQualityData[]
}

export function RadiationChart({ data }: RadiationChartProps) {
  const chartData = data.map(item => ({
    time: new Date(item.measurementTime).toLocaleTimeString(),
    radiation: item.radiationLevel,
    plant: item.plantName
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span>방사선량 추이</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value?.toFixed(3) || 'N/A'} μSv/h`, '방사선량']}
              labelFormatter={(label) => `시간: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="radiation" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function WeatherChart({ data }: WeatherChartProps) {
  const chartData = data.map(item => ({
    time: new Date(item.measurementTime).toLocaleTimeString(),
    temperature: item.temperature,
    humidity: item.humidity,
    windSpeed: item.windSpeed,
    plant: item.plantName
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wind className="w-5 h-5 text-green-600" />
          <span>기상 데이터 추이</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'temperature') return [`${value}°C`, '온도']
                if (name === 'humidity') return [`${value}%`, '습도']
                if (name === 'windSpeed') return [`${value}m/s`, '풍속']
                return [value, name]
              }}
              labelFormatter={(label) => `시간: ${label}`}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="temperature" 
              stroke="#dc2626" 
              strokeWidth={2}
              name="temperature"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="humidity" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="humidity"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="windSpeed" 
              stroke="#16a34a" 
              strokeWidth={2}
              name="windSpeed"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function AirQualityChart({ data }: AirQualityChartProps) {
  const chartData = data.map(item => ({
    time: new Date(item.measurementTime).toLocaleTimeString(),
    pm25: item.pm25 || 0,
    pm10: item.pm10 || 0,
    location: item.location
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span>대기질 추이</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'pm25') return [`${value} μg/m³`, 'PM2.5']
                if (name === 'pm10') return [`${value} μg/m³`, 'PM10']
                return [value, name]
              }}
              labelFormatter={(label) => `시간: ${label}`}
            />
            <Bar dataKey="pm25" fill="#8b5cf6" name="pm25" />
            <Bar dataKey="pm10" fill="#a855f7" name="pm10" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}