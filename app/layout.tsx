import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "성장도표 계산기",
  description: "우리 아이 성장 백분위수 확인",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
