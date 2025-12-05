import { ReactNode } from "react";
import AuthLayoutClient from "@/components/layouts/Auth/AuthLayoutClient";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
