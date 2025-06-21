import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomEditor } from "@/app/components/bottom-editor";
import { PageProvider } from "@/app/context/PageContext";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Dynamic Pages",
  description: "A simple page navigator with dynamic content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#162542]`}
      >
        <PageProvider>
          <main className="container mx-auto h-full min-h-screen flex flex-col justify-evenly p-8">
            {children}
            <BottomEditor />
          </main>
        </PageProvider>
      </body>
    </html>
  );
}
