import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaesar Adam Rafano — PHP & JavaScript Developer",
  description:
    "PHP & JavaScript Developer specializing in Backend Architecture & System Design. Building production-grade web systems with Laravel, Next.js, and REST APIs. Open to remote & international roles.",
  openGraph: {
    title: "Kaesar Adam Rafano — PHP & JavaScript Developer",
    description:
      "PHP & JavaScript Developer specializing in backend architecture and scalable web systems.",
    url: "https://adamrafano.vercel.app",
    siteName: "Kaesar Adam Rafano Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaesar Adam Rafano — PHP & JavaScript Developer",
    description:
      "PHP & JavaScript Developer specializing in backend architecture and scalable web systems.",
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
        className={`${inter.variable} antialiased`}
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
