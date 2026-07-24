import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaesar Adam Rafano — Web Developer",
  description:
    "Web Developer based in Jakarta. I ship real, deployed products — web, mobile, and AI-integrated — as a student, and I'm going deep on front-end. Open to remote and international roles.",
  openGraph: {
    title: "Kaesar Adam Rafano — Web Developer",
    description:
      "Web Developer shipping real, deployed products as a student. Open to remote and international roles.",
    url: "https://adamrafano.vercel.app",
    siteName: "Kaesar Adam Rafano Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaesar Adam Rafano — Web Developer",
    description:
      "Web Developer shipping real, deployed products as a student. Open to remote and international roles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hanken.variable} ${jetbrains.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
