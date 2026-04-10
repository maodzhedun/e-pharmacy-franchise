//app/(auth)/register/page.tsx

import { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your E-Pharmacy franchise account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}