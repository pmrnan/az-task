import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AzTask",
  description: "タスク管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
