"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TrendingUp, Users, Ruler, BarChart3 } from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  heightPercentiles,
  weightPercentiles,
  calculatePercentile,
  getPercentileColor,
  generateChartData,
  generateDistributionData,
} from "@/lib/growth-data";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL params에서 데이터 가져오기
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const height = searchParams.get("height");
  const weight = searchParams.get("weight");

  // 유효성 검사
  if (!age || !gender || !height || !weight) {
    router.push("/");
    return null;
  }

  const ageNum = Number.parseInt(age);
  const heightNum = Number.parseFloat(height);
  const weightNum = Number.parseFloat(weight);

  // 계산
  const heightData =
    heightPercentiles[gender as keyof typeof heightPercentiles][
      ageNum as keyof (typeof heightPercentiles)[keyof typeof heightPercentiles]
    ];
  const weightData =
    weightPercentiles[gender as keyof typeof weightPercentiles][
      ageNum as keyof (typeof weightPercentiles)[keyof typeof weightPercentiles]
    ];

  if (!heightData || !weightData) {
    router.push("/");
    return null;
  }

  const heightPercentile = calculatePercentile(heightNum, heightData);
  const weightPercentile = calculatePercentile(weightNum, weightData);
  const bmi = weightNum / Math.pow(heightNum / 100, 2);
  const bmiPercentile =
    bmi < 18.5 ? "저체중" : bmi < 23 ? "정상" : bmi < 25 ? "과체중" : "비만";

  const chartData = generateChartData(gender, "height");
  const weightChartData = generateChartData(gender, "weight");
  const heightDistributionData = generateDistributionData(
    heightData,
    heightNum
  );
  const weightDistributionData = generateDistributionData(
    weightData,
    weightNum
  );

  const handleBack = () => {
    const params = new URLSearchParams({
      age,
      gender,
      height,
      weight,
    });
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      {/* Results Header */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg border-b border-sky-400 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 p-2 text-white hover:bg-sky-600 hover:text-white rounded-lg transition"
              aria-label="뒤로가기"
            >
              {/* SVG 아이콘 */}
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-white">성장 분석 결과</h1>
              <p className="text-sm text-sky-100">
                {gender === "male" ? "남자" : "여자"} {age}세 • {height}cm •{" "}
                {weight}kg
              </p>
            </div>
            {/* 우측 placeholder 아이콘 */}
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                visibility: "hidden",
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-medium text-sky-700">
              백분위수 결과
            </h2>
          </div>

          <div className="space-y-4">
            {/* Main Results */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg border border-sky-200">
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-sky-600" />
                  <div>
                    <span className="text-sm font-medium text-sky-700">키</span>
                    <div className="text-xs text-sky-600">{heightNum}cm</div>
                  </div>
                </div>
                <span
                  className={`${getPercentileColor(
                    heightPercentile
                  )} text-sm px-3 py-1 rounded-full`}
                >
                  {heightPercentile}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-cyan-600" />
                  <div>
                    <span className="text-sm font-medium text-cyan-700">
                      몸무게
                    </span>
                    <div className="text-xs text-cyan-600">{weightNum}kg</div>
                  </div>
                </div>
                <span
                  className={`${getPercentileColor(
                    weightPercentile
                  )} text-sm px-3 py-1 rounded-full`}
                >
                  {weightPercentile}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">
                    BMI
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-indigo-700">
                    {Math.round(bmi * 10) / 10}
                  </div>
                  <span className="text-xs border border-indigo-300 text-indigo-600 px-2 py-1 rounded-full">
                    {bmiPercentile}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 키 분포도 차트 */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <h3 className="text-base font-medium text-sky-700 mb-4">키 분포도</h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heightDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis
                  dataKey="value"
                  label={{
                    value: "키 (cm)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="density"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                  fill="#0ea5e9"
                  fillOpacity={0.1}
                />
                <ReferenceLine
                  x={heightNum}
                  stroke="#ef4444"
                  strokeWidth={3}
                  strokeDasharray="none"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 text-xs text-sky-600">
            빨간 선: 우리 아이 ({heightNum}cm)
          </div>
        </div>

        {/* 몸무게 분포도 차트 */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <h3 className="text-base font-medium text-sky-700 mb-4">
            몸무게 분포도
          </h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis
                  dataKey="value"
                  label={{
                    value: "몸무게 (kg)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="density"
                  stroke="#0891b2"
                  strokeWidth={2}
                  dot={false}
                  fill="#0891b2"
                  fillOpacity={0.1}
                />
                <ReferenceLine
                  x={weightNum}
                  stroke="#ef4444"
                  strokeWidth={3}
                  strokeDasharray="none"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 text-xs text-sky-600">
            빨간 선: 우리 아이 ({weightNum}kg)
          </div>
        </div>

        {/* 성장 곡선 차트 */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <h3 className="text-base font-medium text-sky-700 mb-4">
            키 성장 곡선
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis
                  dataKey="age"
                  label={{
                    value: "나이 (세)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "키 (cm)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="p3"
                  stroke="#f87171"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p25"
                  stroke="#fb923c"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p50"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p75"
                  stroke="#38bdf8"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p97"
                  stroke="#a78bfa"
                  dot={false}
                />
                <ReferenceLine
                  x={ageNum}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                />
                <ReferenceLine
                  y={heightNum}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 text-xs text-sky-600">
            빨간 선: 우리 아이 ({ageNum}세, {heightNum}cm)
          </div>
        </div>

        {/* 몸무게 성장 곡선 차트 */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <h3 className="text-base font-medium text-sky-700 mb-4">
            몸무게 성장 곡선
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis
                  dataKey="age"
                  label={{
                    value: "나이 (세)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "몸무게 (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="p3"
                  stroke="#f87171"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p25"
                  stroke="#fb923c"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p50"
                  stroke="#0891b2"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p75"
                  stroke="#38bdf8"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p97"
                  stroke="#a78bfa"
                  dot={false}
                />
                <ReferenceLine
                  x={ageNum}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                />
                <ReferenceLine
                  y={weightNum}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 text-xs text-sky-600">
            빨간 선: 우리 아이 ({ageNum}세, {weightNum}kg)
          </div>
        </div>

        {/* 간단한 설명 */}
        <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6">
          <h3 className="text-base font-medium text-sky-700 mb-3">결과 해석</h3>
          <div className="text-sm text-sky-700 space-y-2">
            <p>
              <strong>키 백분위수:</strong> {heightPercentile} - 같은 나이, 성별
              아이들 중 {heightNum}cm는 {heightPercentile} 구간에 속합니다.
            </p>
            <p>
              <strong>몸무게 백분위수:</strong> {weightPercentile} - 같은 나이,
              성별 아이들 중 {weightNum}kg는 {weightPercentile} 구간에 속합니다.
            </p>
            <p>
              <strong>BMI:</strong> {Math.round(bmi * 10) / 10} ({bmiPercentile}
              ) - 체질량지수는 {bmiPercentile} 범위입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
