"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Ruler, BarChart3 } from "lucide-react"
import {
  heightPercentiles,
  weightPercentiles,
  calculatePercentile,
  getPercentileColor,
  generateChartData,
  generateDistributionData,
} from "@/lib/growth-data"

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL params에서 데이터 가져오기
  const age = searchParams.get("age")
  const gender = searchParams.get("gender")
  const height = searchParams.get("height")
  const weight = searchParams.get("weight")

  // 유효성 검사
  if (!age || !gender || !height || !weight) {
    router.push("/")
    return null
  }

  const ageNum = Number.parseInt(age)
  const heightNum = Number.parseFloat(height)
  const weightNum = Number.parseFloat(weight)

  // 계산
  const heightData =
    heightPercentiles[gender as keyof typeof heightPercentiles][
      ageNum as keyof (typeof heightPercentiles)[keyof typeof heightPercentiles]
    ]
  const weightData =
    weightPercentiles[gender as keyof typeof weightPercentiles][
      ageNum as keyof (typeof weightPercentiles)[keyof typeof weightPercentiles]
    ]

  if (!heightData || !weightData) {
    router.push("/")
    return null
  }

  const heightPercentile = calculatePercentile(heightNum, heightData)
  const weightPercentile = calculatePercentile(weightNum, weightData)
  const bmi = weightNum / Math.pow(heightNum / 100, 2)
  const bmiPercentile = bmi < 18.5 ? "저체중" : bmi < 23 ? "정상" : bmi < 25 ? "과체중" : "비만"

  const results = {
    heightPercentile,
    weightPercentile,
    bmi: Math.round(bmi * 10) / 10,
    bmiPercentile,
    heightValue: heightNum,
    weightValue: weightNum,
    heightData,
    weightData,
  }

  const chartData = generateChartData(gender, "height")
  const weightChartData = generateChartData(gender, "weight")

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Results Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
              ← 뒤로
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-gray-900">성장 분석 결과</h1>
              <p className="text-sm text-gray-600">
                {gender === "male" ? "남자" : "여자"} {age}세 • {height}cm • {weight}kg
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Results Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              백분위수 결과
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Results */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="text-sm font-medium">키</span>
                    <div className="text-xs text-gray-600">{results.heightValue}cm</div>
                  </div>
                </div>
                <Badge className={`${getPercentileColor(results.heightPercentile)} text-sm px-3 py-1`}>
                  {results.heightPercentile}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="text-sm font-medium">몸무게</span>
                    <div className="text-xs text-gray-600">{results.weightValue}kg</div>
                  </div>
                </div>
                <Badge className={`${getPercentileColor(results.weightPercentile)} text-sm px-3 py-1`}>
                  {results.weightPercentile}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">BMI</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-700">{results.bmi}</div>
                  <Badge variant="outline" className="text-xs">
                    {results.bmiPercentile}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 분포도 그래프 */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">우리 아이 위치</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="height-dist" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="height-dist" className="text-sm">
                  키 분포
                </TabsTrigger>
                <TabsTrigger value="weight-dist" className="text-sm">
                  몸무게 분포
                </TabsTrigger>
              </TabsList>

              <TabsContent value="height-dist" className="mt-0">
                <div className="h-56 bg-gray-50 rounded-lg p-4">
                  <ChartContainer
                    config={{
                      density: { label: "분포", color: "#3b82f6" },
                      current: { label: "우리 아이", color: "#ef4444" },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateDistributionData(results.heightData, results.heightValue)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="value"
                          tick={{ fontSize: 10 }}
                          label={{ value: "키 (cm)", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="density"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                          fill="#3b82f6"
                          fillOpacity={0.1}
                        />
                        <ReferenceLine
                          x={results.heightValue}
                          stroke="#ef4444"
                          strokeWidth={3}
                          strokeDasharray="none"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-600">빨간 선: 우리 아이 ({results.heightValue}cm)</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="weight-dist" className="mt-0">
                <div className="h-56 bg-gray-50 rounded-lg p-4">
                  <ChartContainer
                    config={{
                      density: { label: "분포", color: "#22c55e" },
                      current: { label: "우리 아이", color: "#ef4444" },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateDistributionData(results.weightData, results.weightValue)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="value"
                          tick={{ fontSize: 10 }}
                          label={{ value: "몸무게 (kg)", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="density"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={false}
                          fill="#22c55e"
                          fillOpacity={0.1}
                        />
                        <ReferenceLine
                          x={results.weightValue}
                          stroke="#ef4444"
                          strokeWidth={3}
                          strokeDasharray="none"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-600">빨간 선: 우리 아이 ({results.weightValue}kg)</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">성장 곡선</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="height" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="height" className="text-sm">
                  키
                </TabsTrigger>
                <TabsTrigger value="weight" className="text-sm">
                  몸무게
                </TabsTrigger>
              </TabsList>

              <TabsContent value="height" className="mt-0">
                <div className="h-64">
                  <ChartContainer
                    config={{
                      p3: { label: "3rd", color: "#ef4444" },
                      p25: { label: "25th", color: "#f97316" },
                      p50: { label: "50th", color: "#22c55e" },
                      p75: { label: "75th", color: "#3b82f6" },
                      p97: { label: "97th", color: "#8b5cf6" },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="age"
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: "#d1d5db" }}
                          tickLine={{ stroke: "#d1d5db" }}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: "#d1d5db" }}
                          tickLine={{ stroke: "#d1d5db" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="p3" stroke="#ef4444" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p25" stroke="#f97316" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="p75" stroke="#3b82f6" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p97" stroke="#8b5cf6" strokeWidth={1} dot={false} />
                        <ReferenceLine x={ageNum} stroke="#dc2626" strokeDasharray="3 3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>

              <TabsContent value="weight" className="mt-0">
                <div className="h-64">
                  <ChartContainer
                    config={{
                      p3: { label: "3rd", color: "#ef4444" },
                      p25: { label: "25th", color: "#f97316" },
                      p50: { label: "50th", color: "#22c55e" },
                      p75: { label: "75th", color: "#3b82f6" },
                      p97: { label: "97th", color: "#8b5cf6" },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="age"
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: "#d1d5db" }}
                          tickLine={{ stroke: "#d1d5db" }}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: "#d1d5db" }}
                          tickLine={{ stroke: "#d1d5db" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="p3" stroke="#ef4444" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p25" stroke="#f97316" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="p75" stroke="#3b82f6" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="p97" stroke="#8b5cf6" strokeWidth={1} dot={false} />
                        <ReferenceLine x={ageNum} stroke="#dc2626" strokeDasharray="3 3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 다시 계산하기 버튼 */}
        <Button onClick={handleBack} variant="outline" className="w-full h-12 text-base">
          🔄 다시 계산하기
        </Button>

        {/* Bottom Spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  )
}
