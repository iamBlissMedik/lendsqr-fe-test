import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Providers } from "./Providers";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Lendsqr assessment test",
  description: "Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
