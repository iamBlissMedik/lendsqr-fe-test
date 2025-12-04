import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avenirNext = localFont({
  src: [
    {
      path: "../../public/fonts/avenir-next/AvenirNext-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenir-next/AvenirNext-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenir-next",
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
      <body className={avenirNext.variable}>{children}</body>
    </html>
  );
}
