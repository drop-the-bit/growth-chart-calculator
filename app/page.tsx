"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Baby, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 성별 선택 컴포넌트를 메모이제이션
const GenderSelector = memo(
  ({
    selectedGender,
    onGenderSelect,
  }: {
    selectedGender: string;
    onGenderSelect: (gender: string) => void;
  }) => {
    const handleMaleClick = useCallback(() => {
      onGenderSelect("male");
    }, [onGenderSelect]);

    const handleFemaleClick = useCallback(() => {
      onGenderSelect("female");
    }, [onGenderSelect]);

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">성별</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={selectedGender === "male" ? "default" : "outline"}
            onClick={handleMaleClick}
            className="h-12 text-sm transition-none select-none"
            type="button"
          >
            👦 남자
          </Button>
          <Button
            variant={selectedGender === "female" ? "default" : "outline"}
            onClick={handleFemaleClick}
            className="h-12 text-sm transition-none select-none"
            type="button"
          >
            👧 여자
          </Button>
        </div>
      </div>
    );
  }
);

GenderSelector.displayName = "GenderSelector";

// 나이 선택 컴포넌트를 메모이제이션
const AgeSelector = memo(
  ({
    selectedAge,
    onAgeSelect,
    ageOptions,
  }: {
    selectedAge: string;
    onAgeSelect: (age: string) => void;
    ageOptions: number[];
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">나이 (만)</Label>
        <Select value={selectedAge} onValueChange={onAgeSelect}>
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
    );
  }
);

AgeSelector.displayName = "AgeSelector";

// 키와 몸무게 입력 컴포넌트를 메모이제이션
const HeightWeightInputs = memo(
  ({
    height,
    weight,
    onHeightChange,
    onWeightChange,
  }: {
    height: string;
    weight: string;
    onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
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
            onChange={onHeightChange}
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
            onChange={onWeightChange}
            className="h-12 text-center text-lg placeholder:text-gray-400 placeholder:font-normal"
            inputMode="numeric"
            min="5"
            max="150"
          />
        </div>
      </div>
    );
  }
);

HeightWeightInputs.displayName = "HeightWeightInputs";

// 결과 보기 버튼 컴포넌트를 메모이제이션
const CalculateButton = memo(
  ({
    isFormValid,
    onCalculate,
  }: {
    isFormValid: boolean;
    onCalculate: () => void;
  }) => {
    return (
      <Button
        onClick={onCalculate}
        className="w-full h-12 text-base font-medium transition-none select-none"
        disabled={!isFormValid}
        type="button"
      >
        📊 결과 보기
      </Button>
    );
  }
);

CalculateButton.displayName = "CalculateButton";

// 정보 섹션 컴포넌트를 메모이제이션
const InfoSection = memo(() => {
  return (
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
            <strong>백분위수란?</strong> 같은 나이, 성별 100명 중 몇 번째인지를
            나타냅니다.
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
  );
});

InfoSection.displayName = "InfoSection";

// 헤더 컴포넌트를 메모이제이션
const Header = memo(() => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <Baby className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-bold text-gray-900">성장도표 계산기</h1>
        </div>
        <p className="text-sm text-gray-600 text-center mt-1">
          우리 아이 성장 백분위수 확인
        </p>
      </div>
    </div>
  );
});

Header.displayName = "Header";

// 입력 카드 섹션 컴포넌트를 메모이제이션
const InputCard = memo(
  ({
    gender,
    age,
    height,
    weight,
    ageOptions,
    isFormValid,
    onGenderSelect,
    onAgeSelect,
    onHeightChange,
    onWeightChange,
    onCalculate,
  }: {
    gender: string;
    age: string;
    height: string;
    weight: string;
    ageOptions: number[];
    isFormValid: boolean;
    onGenderSelect: (gender: string) => void;
    onAgeSelect: (age: string) => void;
    onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: () => void;
  }) => {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            아이 정보 입력
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <GenderSelector
            selectedGender={gender}
            onGenderSelect={onGenderSelect}
          />
          <AgeSelector
            selectedAge={age}
            onAgeSelect={onAgeSelect}
            ageOptions={ageOptions}
          />
          <HeightWeightInputs
            height={height}
            weight={weight}
            onHeightChange={onHeightChange}
            onWeightChange={onWeightChange}
          />
          <CalculateButton
            isFormValid={isFormValid}
            onCalculate={onCalculate}
          />
        </CardContent>
      </Card>
    );
  }
);

InputCard.displayName = "InputCard";

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

  // Memoize age options to prevent unnecessary re-renders
  const ageOptions = useMemo(
    () => Array.from({ length: 16 }, (_, i) => i + 3),
    []
  );

  // Memoize disabled state
  const isFormValid = useMemo(
    () => !!(age && gender && height && weight),
    [age, gender, height, weight]
  );

  const handleCalculate = useCallback(() => {
    if (!age || !gender || !height || !weight) return;

    // URL params로 데이터 전달
    const params = new URLSearchParams({
      age,
      gender,
      height,
      weight,
    });

    router.push(`/result?${params.toString()}`);
  }, [age, gender, height, weight, router]);

  const handleGenderSelect = useCallback((selectedGender: string) => {
    setGender(selectedGender);
  }, []);

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeight(e.target.value);
    },
    []
  );

  const handleWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWeight(e.target.value);
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Header />

      <div className="px-4 py-4 space-y-6">
        {/* Input Section */}
        <InputCard
          gender={gender}
          age={age}
          height={height}
          weight={weight}
          ageOptions={ageOptions}
          isFormValid={isFormValid}
          onGenderSelect={handleGenderSelect}
          onAgeSelect={setAge}
          onHeightChange={handleHeightChange}
          onWeightChange={handleWeightChange}
          onCalculate={handleCalculate}
        />

        {/* Info Section */}
        <InfoSection />

        {/* Bottom Spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
