import { ReactNode } from "react";
import AuthLayoutClient from "@/components/layouts/Auth/AuthLayoutClient";
import localFont from "next/font/local";
const avenirNext = localFont({
  src: [
    {
      path: "../../../public/fonts/avenir-next/AvenirNext-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/avenir-next/AvenirNext-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenir-next",
});
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutClient>
      <div
        className={avenirNext.className}
        style={{
          width: "100%",
        }}
      >
        {children}
      </div>
    </AuthLayoutClient>
  );
}
