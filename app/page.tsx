"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Baby, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomePage() {
  const router = useRouter()
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

  // Memoize age options to prevent unnecessary re-renders
  const ageOptions = useMemo(() => 
    Array.from({ length: 16 }, (_, i) => i + 3), []
  )

  // Memoize disabled state
  const isFormValid = useMemo(() => 
    !!(age && gender && height && weight), [age, gender, height, weight]
  )

  const handleCalculate = useCallback(() => {
    if (!age || !gender || !height || !weight) return

    // URL params로 데이터 전달
    const params = new URLSearchParams({
      age,
      gender,
      height,
      weight,
    })

    router.push(`/result?${params.toString()}`)
  }, [age, gender, height, weight, router])

  const handleGenderSelect = useCallback((selectedGender: string) => {
    setGender(selectedGender)
  }, [])

  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value)
  }, [])

  const handleWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <Baby className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-bold text-gray-900">성장도표 계산기</h1>
          </div>
          <p className="text-sm text-gray-600 text-center mt-1">우리 아이 성장 백분위수 확인</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              아이 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Gender Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">성별</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={gender === "male" ? "default" : "outline"}
                  onClick={() => handleGenderSelect("male")}
                  className="h-12 text-sm"
                >
                  👦 남자
                </Button>
                <Button
                  variant={gender === "female" ? "default" : "outline"}
                  onClick={() => handleGenderSelect("female")}
                  className="h-12 text-sm"
                >
                  👧 여자
                </Button>
              </div>
            </div>

            {/* Age Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">나이 (만)</Label>
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="나이를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((ageOption) => (
                    <SelectItem key={ageOption} value={ageOption.toString()}>
                      {ageOption}세
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Height and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium">
                  키 (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="120"
                  value={height}
                  onChange={handleHeightChange}
                  className="h-12 text-center text-lg placeholder:text-gray-400 placeholder:font-normal"
                  inputMode="numeric"
                  min="50"
                  max="200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  몸무게 (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="25"
                  value={weight}
                  onChange={handleWeightChange}
                  className="h-12 text-center text-lg placeholder:text-gray-400 placeholder:font-normal"
                  inputMode="numeric"
                  min="5"
                  max="150"
                />
              </div>
            </div>

            {/* 결과 보기 버튼 */}
            <Button
              onClick={handleCalculate}
              className="w-full h-12 text-base font-medium"
              disabled={!isFormValid}
            >
              📊 결과 보기
            </Button>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-4 w-4" />
              백분위수 가이드
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>백분위수란?</strong> 같은 나이, 성별 100명 중 몇 번째인지를 나타냅니다.
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <span>25th-75th: 정상 범위</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>
                    {"< 3rd"} 또는 {"> 97th"}: 전문의 상담 권장
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              ⚠️ 이 계산기는 참고용입니다. 정확한 진단은 소아과 전문의와 상담하세요.
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  )
}
