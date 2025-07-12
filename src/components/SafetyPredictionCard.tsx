'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SafetyPrediction } from '@/types'
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Lightbulb
} from 'lucide-react'

interface SafetyPredictionCardProps {
  location: string
}

export function SafetyPredictionCard({ location }: SafetyPredictionCardProps) {
  const [prediction, setPrediction] = useState<SafetyPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchPrediction = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/safety-prediction?location=${location}`)
      const data = await response.json()
      setPrediction(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch safety prediction:', error)
    } finally {
      setIsLoading(false)
    }
  }, [location])

  useEffect(() => {
    fetchPrediction()
  }, [location, fetchPrediction])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '안전': return 'bg-green-100 text-green-800 border-green-200'
      case '주의': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case '경고': return 'bg-orange-100 text-orange-800 border-orange-200'
      case '위험': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case '안전': return <CheckCircle className="w-4 h-4 text-green-600" />
      case '주의': return <Clock className="w-4 h-4 text-yellow-600" />
      case '경고': return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case '위험': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-purple-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-20"></div>
              <Brain className="w-6 h-6 text-purple-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI 안전도 예측
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
              <span className="text-gray-600">AI 모델이 예측을 계산하는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!prediction) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-red-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold text-red-600">예측 데이터 오류</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">AI 예측 데이터를 불러올 수 없습니다.</p>
          <Button onClick={fetchPrediction} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  const targetTime = new Date(prediction.targetTime)
  const timeUntilTarget = Math.round((targetTime.getTime() - Date.now()) / (1000 * 60 * 60))

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-20"></div>
              <Brain className="w-6 h-6 text-purple-600 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI 안전도 예측
            </span>
          </CardTitle>
          <Button onClick={fetchPrediction} size="sm" variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{timeUntilTarget}시간 후 예측</span>
          <span className="text-gray-400">|</span>
          <span>신뢰도: </span>
          <span className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}>
            {prediction.confidence}%
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 예측 결과 */}
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {prediction.predictedSafetyScore}점
            </div>
            <Badge className={`text-lg px-4 py-2 ${getGradeColor(prediction.predictedGrade)}`}>
              <div className="flex items-center space-x-2">
                {getGradeIcon(prediction.predictedGrade)}
                <span className="font-semibold">{prediction.predictedGrade}</span>
              </div>
            </Badge>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-sm text-gray-600 mb-1">예측 시점</div>
            <div className="font-medium text-gray-800">
              {targetTime.toLocaleString('ko-KR', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* 영향 요인 */}
        {prediction.factors && prediction.factors.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>주요 영향 요인</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {prediction.factors.map((factor, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {factor === 'radiation' && '방사선량'}
                  {factor === 'air_quality' && '대기질'}
                  {factor === 'weather' && '기상조건'}
                  {factor === 'traffic' && '교통상황'}
                  {factor === 'tourism' && '관광활동'}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* AI 추천사항 */}
        {prediction.recommendations && prediction.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              <span>AI 추천사항</span>
            </h4>
            <div className="space-y-2">
              {prediction.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 업데이트 정보 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            AI 모델 마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}