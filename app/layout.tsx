import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "성장도표 계산기",
  description: "우리 아이 성장 백분위수 확인",
  generator: "v0.dev",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
