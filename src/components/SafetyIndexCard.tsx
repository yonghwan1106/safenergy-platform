'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SafetyIndex } from '@/types'
import { getSafetyGradeColor } from '@/utils/safety-calculator'
import { Shield, AlertTriangle, TrendingUp, Clock } from 'lucide-react'

interface SafetyIndexCardProps {
  safetyIndex: SafetyIndex
}

export function SafetyIndexCard({ safetyIndex }: SafetyIndexCardProps) {
  const gradeColor = getSafetyGradeColor(safetyIndex.safetyGrade)
  
  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case '안전':
        return <Shield className="w-8 h-8 text-green-600" />
      case '주의':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />
      case '경고':
        return <AlertTriangle className="w-8 h-8 text-orange-600" />
      case '위험':
        return <AlertTriangle className="w-8 h-8 text-red-600" />
      default:
        return <Shield className="w-8 h-8 text-gray-600" />
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">통합 안전 지수</span>
          <Badge className={gradeColor}>
            {safetyIndex.safetyGrade}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {getGradeIcon(safetyIndex.safetyGrade)}
            <div>
              <div className="text-3xl font-bold">
                {safetyIndex.overallScore}
              </div>
              <div className="text-sm text-gray-500">점</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(safetyIndex.calculatedTime).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              📍 {safetyIndex.location}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">종합 안전도</span>
            <span className="text-sm text-gray-600">{safetyIndex.overallScore}/100</span>
          </div>
          <Progress value={safetyIndex.overallScore} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">
                {safetyIndex.radiationScore}
              </div>
              <div className="text-xs text-gray-500">방사선량</div>
              <div className="text-xs text-gray-400">40% 가중치</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">
                {safetyIndex.airQualityScore}
              </div>
              <div className="text-xs text-gray-500">대기질</div>
              <div className="text-xs text-gray-400">35% 가중치</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-purple-600">
                {safetyIndex.weatherScore}
              </div>
              <div className="text-xs text-gray-500">기상</div>
              <div className="text-xs text-gray-400">25% 가중치</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}