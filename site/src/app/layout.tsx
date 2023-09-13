import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeaderAction } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IceBreaker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen p-4">
          <HeaderAction/>

              {children}

          <Footer/>
        </main>
      </body>
    </html>
  );
}
