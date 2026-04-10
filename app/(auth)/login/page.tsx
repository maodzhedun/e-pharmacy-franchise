//app/(auth)/login/page.tsx

import { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your E-Pharmacy franchise account.",
};

export default function LoginPage() {
  return <LoginForm />;
}