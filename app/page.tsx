"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Baby, Calculator, Info } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // URL 파라미터에서 이전 입력값들을 읽어서 기본값으로 설정
  useEffect(() => {
    const prevAge = searchParams.get("age");
    const prevGender = searchParams.get("gender");
    const prevHeight = searchParams.get("height");
    const prevWeight = searchParams.get("weight");

    if (prevAge) setAge(prevAge);
    if (prevGender) setGender(prevGender);
    if (prevHeight) setHeight(prevHeight);
    if (prevWeight) setWeight(prevWeight);
  }, [searchParams]);

  const ageOptions = Array.from({ length: 16 }, (_, i) => i + 3);
  const isFormValid = !!(age && gender && height && weight);

  const handleCalculate = () => {
    if (!isFormValid) return;

    const params = new URLSearchParams({
      age,
      gender,
      height,
      weight,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg border-b border-sky-400 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <Baby className="h-6 w-6 text-white" />
            <h1 className="text-lg font-bold text-white">성장도표 계산기</h1>
          </div>
          <p className="text-sm text-sky-100 text-center mt-1">
            우리 아이 성장 백분위수 확인
          </p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-medium text-sky-700">
              아이 정보 입력
            </h2>
          </div>

          <div className="space-y-4">
            {/* 성별 선택 */}
            <div>
              <label className="text-sm font-medium text-sky-700 block mb-2">
                성별
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender("male")}
                  className={`h-12 text-sm transition-all duration-200 rounded-lg border ${
                    gender === "male"
                      ? "bg-sky-500 hover:bg-sky-600 text-white border-sky-500"
                      : "border-sky-300 text-sky-600 hover:bg-sky-50 hover:border-sky-400"
                  }`}
                >
                  👦 남자
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`h-12 text-sm transition-all duration-200 rounded-lg border ${
                    gender === "female"
                      ? "bg-sky-500 hover:bg-sky-600 text-white border-sky-500"
                      : "border-sky-300 text-sky-600 hover:bg-sky-50 hover:border-sky-400"
                  }`}
                >
                  👧 여자
                </button>
              </div>
            </div>

            {/* 나이 선택 */}
            <div>
              <label className="text-sm font-medium text-sky-700 block mb-2">
                나이 (만)
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full h-12 border border-sky-300 rounded-lg px-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              >
                <option value="">나이를 선택하세요</option>
                {ageOptions.map((ageOption) => (
                  <option key={ageOption} value={ageOption.toString()}>
                    {ageOption}세
                  </option>
                ))}
              </select>
            </div>

            {/* 키와 몸무게 입력 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-sky-700 block mb-2">
                  키 (cm)
                </label>
                <input
                  type="number"
                  placeholder="120"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full h-12 text-center text-lg border border-sky-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  min="50"
                  max="200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-sky-700 block mb-2">
                  몸무게 (kg)
                </label>
                <input
                  type="number"
                  placeholder="25"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full h-12 text-center text-lg border border-sky-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  min="5"
                  max="150"
                />
              </div>
            </div>

            {/* 결과 보기 버튼 */}
            <button
              onClick={handleCalculate}
              disabled={!isFormValid}
              className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-200 ${
                isFormValid
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-sky-100 text-sky-400 cursor-not-allowed"
              }`}
            >
              📊 결과 보기
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-medium text-sky-700">
              백분위수 가이드
            </h2>
          </div>
          <div className="text-sm text-sky-700 space-y-2">
            <p>
              <strong>백분위수란?</strong> 같은 나이, 성별 100명 중 몇
              번째인지를 나타냅니다.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span>25th-75th: 정상 범위</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-200 rounded"></div>
                <span>
                  {"< 3rd"} 또는 {"> 97th"}: 전문의 상담 권장
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs text-sky-600 bg-sky-100 p-3 rounded-lg border border-sky-200 mt-3">
            ⚠️ 이 계산기는 참고용입니다. 정확한 진단은 소아과 전문의와
            상담하세요.
          </div>
        </div>
      </div>
    </div>
  );
}
