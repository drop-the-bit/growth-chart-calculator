# 성장도표 계산기 (Growth Chart Calculator)

아이의 키와 몸무게를 입력하여 성장 백분위수를 확인할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **성장 백분위수 계산**: 나이, 성별, 키, 몸무게를 입력하여 백분위수 확인
- **시각적 결과 표시**: 차트와 그래프를 통한 직관적인 결과 제공
- **분포도 차트**: 키와 몸무게의 분포도를 시각화
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **URL 파라미터 지원**: 결과를 URL로 공유 가능

## 📊 백분위수 가이드

- **25th-75th**: 정상 범위
- **< 3rd** 또는 **> 97th**: 전문의 상담 권장
- **3rd-25th, 75th-97th**: 주의 관찰 필요

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📁 프로젝트 구조

```
growth-chart-calculator/
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 레이아웃 컴포넌트
│   ├── page.tsx             # 메인 페이지 (입력 폼)
│   └── result/
│       └── page.tsx         # 결과 페이지
├── lib/
│   └── growth-data.ts       # 성장 데이터 및 유틸리티 함수
├── public/                  # 정적 파일
└── styles/
    └── globals.css          # 추가 전역 스타일
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/growth-chart-calculator.git
   cd growth-chart-calculator
   ```

2. **의존성 설치**
   ```bash
   pnpm install
   ```

3. **개발 서버 실행**
   ```bash
   pnpm dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 📈 사용 방법

1. **아이 정보 입력**
   - 성별 선택 (남자/여자)
   - 나이 선택 (3세-18세)
   - 키 입력 (cm)
   - 몸무게 입력 (kg)

2. **결과 확인**
   - 키 백분위수
   - 몸무게 백분위수
   - BMI 계산
   - 분포도 차트

3. **결과 공유**
   - URL을 복사하여 다른 사람과 공유 가능

## 📊 데이터 소스

이 애플리케이션은 한국 소아 성장 표준을 기반으로 한 백분위수 데이터를 사용합니다:

- **키 데이터**: 3세-18세 남녀별 백분위수
- **몸무게 데이터**: 3세-18세 남녀별 백분위수
- **백분위수**: 3rd, 25th, 50th, 75th, 97th

## ⚠️ 주의사항

- 이 계산기는 **참고용**입니다
- 정확한 진단은 소아과 전문의와 상담하세요
- 성장 지연이나 과도한 성장이 의심되는 경우 전문의 상담을 권장합니다

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**⚠️ 의학적 조언**: 이 도구는 교육 및 참고 목적으로만 제공됩니다. 의학적 진단이나 치료를 대체할 수 없으며, 건강상의 문제가 있을 경우 반드시 의료진과 상담하시기 바랍니다. 