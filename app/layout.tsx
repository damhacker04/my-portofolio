import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaesar Adam Rafano — Full-Stack Engineer",
  description:
    "Full-Stack Engineer specializing in backend architecture, REST API design, and AI-integrated systems. Open to remote freelance and international internship opportunities.",
  openGraph: {
    title: "Kaesar Adam Rafano — Full-Stack Engineer",
    description:
      "Full-Stack Engineer specializing in backend architecture and scalable web systems.",
    url: "https://adamrafano.vercel.app",
    siteName: "Kaesar Adam Rafano Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaesar Adam Rafano — Full-Stack Engineer",
    description:
      "Full-Stack Engineer specializing in backend architecture and scalable web systems.",
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
