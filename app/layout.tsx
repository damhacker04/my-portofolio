import type { Metadata } from "next";
import { Archivo, Newsreader, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
        className={`${archivo.variable} ${newsreader.variable} ${inter.variable} antialiased`}
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
