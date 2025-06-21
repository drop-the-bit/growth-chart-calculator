"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Calculator, TrendingUp, Users, Ruler } from "lucide-react"

// 성장 데이터 (실제 한국 소아청소년 성장도표 데이터의 근사치)
const heightPercentiles = {
  male: {
    3: [89.0, 91.9, 94.9, 97.8, 100.7],
    4: [95.0, 98.1, 101.2, 104.3, 107.4],
    5: [100.7, 104.0, 107.4, 110.7, 114.0],
    6: [105.9, 109.5, 113.0, 116.5, 120.0],
    7: [110.7, 114.6, 118.4, 122.2, 126.0],
    8: [115.1, 119.2, 123.2, 127.2, 131.2],
    9: [119.2, 123.5, 127.8, 132.1, 136.4],
    10: [123.0, 127.5, 132.0, 136.5, 141.0],
    11: [126.5, 131.3, 136.0, 140.8, 145.5],
    12: [129.8, 135.0, 140.1, 145.2, 150.3],
    13: [133.0, 138.6, 144.1, 149.6, 155.1],
    14: [136.2, 142.2, 148.1, 154.0, 159.9],
    15: [139.4, 145.7, 152.0, 158.3, 164.6],
    16: [142.4, 148.9, 155.4, 161.9, 168.4],
    17: [144.8, 151.5, 158.2, 164.9, 171.6],
    18: [146.7, 153.5, 160.3, 167.1, 173.9],
  },
  female: {
    3: [88.4, 91.2, 94.1, 97.0, 99.9],
    4: [94.1, 97.1, 100.1, 103.1, 106.1],
    5: [99.4, 102.7, 106.0, 109.3, 112.6],
    6: [104.3, 107.9, 111.5, 115.1, 118.7],
    7: [108.8, 112.8, 116.8, 120.8, 124.8],
    8: [113.0, 117.3, 121.6, 125.9, 130.2],
    9: [116.9, 121.5, 126.1, 130.7, 135.3],
    10: [120.5, 125.4, 130.3, 135.2, 140.1],
    11: [123.8, 129.0, 134.2, 139.4, 144.6],
    12: [126.9, 132.4, 137.9, 143.4, 148.9],
    13: [129.8, 135.6, 141.4, 147.2, 153.0],
    14: [132.4, 138.4, 144.4, 150.4, 156.4],
    15: [134.5, 140.7, 146.9, 153.1, 159.3],
    16: [136.2, 142.4, 148.6, 154.8, 161.0],
    17: [137.3, 143.6, 149.9, 156.2, 162.5],
    18: [138.1, 144.4, 150.7, 157.0, 163.3],
  },
}

const weightPercentiles = {
  male: {
    3: [12.1, 13.5, 15.0, 16.7, 18.6],
    4: [13.4, 15.0, 16.7, 18.6, 20.7],
    5: [14.8, 16.6, 18.4, 20.4, 22.7],
    6: [16.3, 18.2, 20.2, 22.4, 24.9],
    7: [17.9, 19.9, 22.1, 24.5, 27.2],
    8: [19.6, 21.8, 24.1, 26.7, 29.6],
    9: [21.4, 23.8, 26.3, 29.1, 32.2],
    10: [23.2, 25.8, 28.5, 31.5, 34.9],
    11: [25.0, 27.9, 30.9, 34.2, 37.9],
    12: [26.9, 30.1, 33.4, 37.0, 41.0],
    13: [28.9, 32.4, 36.0, 39.9, 44.3],
    14: [31.0, 34.8, 38.7, 42.9, 47.6],
    15: [33.2, 37.3, 41.5, 46.0, 51.0],
    16: [35.4, 39.8, 44.3, 49.1, 54.4],
    17: [37.5, 42.2, 47.0, 52.1, 57.7],
    18: [39.4, 44.4, 49.5, 54.9, 60.8],
  },
  female: {
    3: [11.6, 12.9, 14.3, 15.8, 17.6],
    4: [12.9, 14.3, 15.8, 17.6, 19.6],
    5: [14.2, 15.8, 17.5, 19.5, 21.8],
    6: [15.6, 17.3, 19.2, 21.4, 24.0],
    7: [17.0, 18.9, 21.0, 23.4, 26.3],
    8: [18.5, 20.6, 22.9, 25.6, 28.7],
    9: [20.1, 22.4, 24.9, 27.8, 31.2],
    10: [21.7, 24.2, 26.9, 30.1, 33.8],
    11: [23.4, 26.1, 29.0, 32.5, 36.5],
    12: [25.2, 28.1, 31.2, 35.0, 39.3],
    13: [27.0, 30.1, 33.5, 37.6, 42.2],
    14: [28.8, 32.2, 35.8, 40.2, 45.2],
    15: [30.5, 34.2, 38.1, 42.8, 48.1],
    16: [32.1, 36.0, 40.3, 45.2, 50.8],
    17: [33.5, 37.6, 42.2, 47.4, 53.2],
    18: [34.7, 39.0, 43.8, 49.3, 55.3],
  },
}

const percentileLabels = ["3rd", "25th", "50th", "75th", "97th"]

function calculatePercentile(value: number, percentiles: number[]): string {
  if (value <= percentiles[0]) return "< 3rd"
  if (value <= percentiles[1]) return "3rd - 25th"
  if (value <= percentiles[2]) return "25th - 50th"
  if (value <= percentiles[3]) return "50th - 75th"
  if (value <= percentiles[4]) return "75th - 97th"
  return "> 97th"
}

function getPercentileColor(percentile: string): string {
  switch (percentile) {
    case "< 3rd":
      return "bg-red-100 text-red-800"
    case "3rd - 25th":
      return "bg-orange-100 text-orange-800"
    case "25th - 50th":
      return "bg-yellow-100 text-yellow-800"
    case "50th - 75th":
      return "bg-green-100 text-green-800"
    case "75th - 97th":
      return "bg-blue-100 text-blue-800"
    case "> 97th":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function generateChartData(gender: string, type: "height" | "weight") {
  const data = []
  const percentileData = type === "height" ? heightPercentiles : weightPercentiles

  for (let age = 3; age <= 18; age++) {
    const ageData: any = { age }
    const values =
      percentileData[gender as keyof typeof percentileData][age as keyof (typeof percentileData)[typeof gender]]

    if (values) {
      ageData.p3 = values[0]
      ageData.p25 = values[1]
      ageData.p50 = values[2]
      ageData.p75 = values[3]
      ageData.p97 = values[4]
    }

    data.push(ageData)
  }

  return data
}

export default function GrowthCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [results, setResults] = useState<{
    heightPercentile: string
    weightPercentile: string
    bmi: number
    bmiPercentile: string
  } | null>(null)

  const handleCalculate = () => {
    if (!age || !gender || !height || !weight) return

    const ageNum = Number.parseInt(age)
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)

    if (ageNum < 3 || ageNum > 18) return

    const heightData =
      heightPercentiles[gender as keyof typeof heightPercentiles][
        ageNum as keyof (typeof heightPercentiles)[typeof gender]
      ]
    const weightData =
      weightPercentiles[gender as keyof typeof weightPercentiles][
        ageNum as keyof (typeof weightPercentiles)[typeof gender]
      ]

    if (!heightData || !weightData) return

    const heightPercentile = calculatePercentile(heightNum, heightData)
    const weightPercentile = calculatePercentile(weightNum, weightData)

    const bmi = weightNum / Math.pow(heightNum / 100, 2)
    const bmiPercentile = bmi < 18.5 ? "저체중" : bmi < 23 ? "정상" : bmi < 25 ? "과체중" : "비만"

    setResults({
      heightPercentile,
      weightPercentile,
      bmi: Math.round(bmi * 10) / 10,
      bmiPercentile,
    })
  }

  const chartData = gender ? generateChartData(gender, "height") : []
  const weightChartData = gender ? generateChartData(gender, "weight") : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            소아청소년 성장도표 계산기
          </h1>
          <p className="text-gray-600">아이의 키와 몸무게가 또래와 비교해 어느 정도인지 확인해보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                정보 입력
              </CardTitle>
              <CardDescription>아이의 기본 정보를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">나이 (만)</Label>
                  <Select value={age} onValueChange={setAge}>
                    <SelectTrigger>
                      <SelectValue placeholder="나이 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 16 }, (_, i) => i + 3).map((ageOption) => (
                        <SelectItem key={ageOption} value={ageOption.toString()}>
                          {ageOption}세
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="성별 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남자</SelectItem>
                      <SelectItem value="female">여자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">키 (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="예: 120.5"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">몸무게 (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="예: 25.3"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full" disabled={!age || !gender || !height || !weight}>
                백분위수 계산하기
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                계산 결과
              </CardTitle>
              <CardDescription>또래 아이들과 비교한 성장 백분위수</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Ruler className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm text-gray-600 mb-1">키 백분위수</div>
                      <Badge className={getPercentileColor(results.heightPercentile)}>{results.heightPercentile}</Badge>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-sm text-gray-600 mb-1">몸무게 백분위수</div>
                      <Badge className={getPercentileColor(results.weightPercentile)}>{results.weightPercentile}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">BMI (체질량지수)</div>
                    <div className="text-2xl font-bold text-purple-700">{results.bmi}</div>
                    <Badge variant="outline" className="mt-1">
                      {results.bmiPercentile}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 3rd-97th 백분위: 정상 범위</p>
                    <p>• {"< 3rd"} 백분위: 평균보다 작음</p>
                    <p>• {">"}97th 백분위: 평균보다 큼</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">정보를 입력하고 계산 버튼을 눌러주세요</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {gender && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Height Chart */}
            <Card>
              <CardHeader>
                <CardTitle>키 성장 곡선 ({gender === "male" ? "남자" : "여자"})</CardTitle>
                <CardDescription>나이별 키 백분위수 차트</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    p3: { label: "3rd", color: "hsl(var(--chart-1))" },
                    p25: { label: "25th", color: "hsl(var(--chart-2))" },
                    p50: { label: "50th", color: "hsl(var(--chart-3))" },
                    p75: { label: "75th", color: "hsl(var(--chart-4))" },
                    p97: { label: "97th", color: "hsl(var(--chart-5))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" label={{ value: "나이 (세)", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "키 (cm)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="p3" stroke="var(--color-p3)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p25" stroke="var(--color-p25)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="p75" stroke="var(--color-p75)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p97" stroke="var(--color-p97)" strokeWidth={1} dot={false} />
                      {age && height && <ReferenceLine x={Number.parseInt(age)} stroke="red" strokeDasharray="5 5" />}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Weight Chart */}
            <Card>
              <CardHeader>
                <CardTitle>몸무게 성장 곡선 ({gender === "male" ? "남자" : "여자"})</CardTitle>
                <CardDescription>나이별 몸무게 백분위수 차트</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    p3: { label: "3rd", color: "hsl(var(--chart-1))" },
                    p25: { label: "25th", color: "hsl(var(--chart-2))" },
                    p50: { label: "50th", color: "hsl(var(--chart-3))" },
                    p75: { label: "75th", color: "hsl(var(--chart-4))" },
                    p97: { label: "97th", color: "hsl(var(--chart-5))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" label={{ value: "나이 (세)", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "몸무게 (kg)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="p3" stroke="var(--color-p3)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p25" stroke="var(--color-p25)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="p75" stroke="var(--color-p75)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="p97" stroke="var(--color-p97)" strokeWidth={1} dot={false} />
                      {age && weight && <ReferenceLine x={Number.parseInt(age)} stroke="red" strokeDasharray="5 5" />}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle>백분위수 해석 가이드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">백분위수란?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  같은 나이, 같은 성별의 100명 중에서 몇 번째에 해당하는지를 나타내는 수치입니다.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 50th 백분위: 평균 (100명 중 50번째)</li>
                  <li>• 75th 백분위: 100명 중 75번째</li>
                  <li>• 25th 백분위: 100명 중 25번째</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">주의사항</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 이 계산기는 참고용이며, 정확한 진단은 의료진과 상담하세요</li>
                  <li>• 3rd 백분위 미만이나 97th 백분위 초과시 전문의 상담을 권합니다</li>
                  <li>• 성장은 개인차가 있으므로 지속적인 관찰이 중요합니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
