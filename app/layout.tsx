import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateProvider";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Bime Bazar Task",
  description: "This is a task for interview process of Bime Bazar company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-gray-100`}
      >
        <GlobalStateProvider>{children}</GlobalStateProvider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
