import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "A simple weather dashboad built with Next.js and the OpenWeatherMap API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}