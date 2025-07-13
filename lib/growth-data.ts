// 성장 데이터와 유틸리티 함수들을 별도 파일로 분리

export const heightPercentiles = {
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
};

export const weightPercentiles = {
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
};

export function calculatePercentile(
  value: number,
  percentiles: number[]
): string {
  if (value <= percentiles[0]) return "< 3rd";
  if (value <= percentiles[1]) return "3rd - 25th";
  if (value <= percentiles[2]) return "25th - 50th";
  if (value <= percentiles[3]) return "50th - 75th";
  if (value <= percentiles[4]) return "75th - 97th";
  return "> 97th";
}

export function getPercentileColor(percentile: string): string {
  switch (percentile) {
    case "< 3rd":
      return "bg-red-100 text-red-800 border-red-200";
    case "3rd - 25th":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "25th - 50th":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "50th - 75th":
      return "bg-green-100 text-green-800 border-green-200";
    case "75th - 97th":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "> 97th":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function generateChartData(gender: string, type: "height" | "weight") {
  const data = [];
  const percentileData =
    type === "height" ? heightPercentiles : weightPercentiles;

  for (let age = 3; age <= 18; age++) {
    const ageData: any = { age };
    const values =
      percentileData[gender as keyof typeof percentileData][
        age as keyof (typeof percentileData)[keyof typeof percentileData]
      ];

    if (values) {
      ageData.p3 = values[0];
      ageData.p25 = values[1];
      ageData.p50 = values[2];
      ageData.p75 = values[3];
      ageData.p97 = values[4];
    }

    data.push(ageData);
  }

  return data;
}

export function generateDistributionData(
  percentiles: number[],
  currentValue: number
) {
  const data = [];
  const min = Math.min(percentiles[0] * 0.8, currentValue * 0.8);
  const max = Math.max(percentiles[4] * 1.2, currentValue * 1.2);

  for (let i = 0; i <= 100; i++) {
    const value = min + (max - min) * (i / 100);
    let density = 0;

    // 정규분포 근사 계산
    if (value <= percentiles[0]) density = 0.03;
    else if (value <= percentiles[1])
      density =
        0.03 +
        (0.22 * (value - percentiles[0])) / (percentiles[1] - percentiles[0]);
    else if (value <= percentiles[2])
      density =
        0.25 +
        (0.25 * (value - percentiles[1])) / (percentiles[2] - percentiles[1]);
    else if (value <= percentiles[3])
      density =
        0.5 -
        (0.25 * (value - percentiles[2])) / (percentiles[3] - percentiles[2]);
    else if (value <= percentiles[4])
      density =
        0.25 -
        (0.22 * (value - percentiles[3])) / (percentiles[4] - percentiles[3]);
    else density = 0.03;

    data.push({ value: Math.round(value * 10) / 10, density });
  }

  return data;
}
