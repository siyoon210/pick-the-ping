import type {Metadata} from "next";
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "캐치! 티니핑 이미지 퀴즈",
  description: "캐치! 티니핑 이미지 퀴즈",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body>
    {children}
    <Analytics />
    <SpeedInsights />
    </body>
    </html>
  );
}
