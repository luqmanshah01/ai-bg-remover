import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Background Remover",
  description: "Remove image backgrounds instantly with AI — free, fast, and clean.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
