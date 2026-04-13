//components/forms/LoginForm.tsx

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: FormData) => {
    try {
      const res: any = await loginUser(data);
      setAuth(res.user, "");
      toast.success("Logged in!");
      router.push("/shop");
    } catch (e: any) {
      toast.error(e.message || "Login failed");
    }
  };

  return (
    <div className="w-full md:max-w-[300px] lg:w-[323px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email address"
            className="h-[40px] w-full rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-text-light focus:border-primary sm:h-[44px] sm:px-5 sm:text-sm md:h-[46px]"
          />
          {errors.email && (
            <p className="mt-1 pl-4 text-xs text-danger">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 chars" },
            })}
            type="password"
            placeholder="Password"
            className="h-[40px] w-full rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-text-light focus:border-primary sm:h-[44px] sm:px-5 sm:text-sm md:h-[46px]"
          />
          {errors.password && (
            <p className="mt-1 pl-4 text-xs text-danger">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="pt-1 sm:pt-2 md:pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[40px] w-full rounded-full bg-primary text-xs font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:h-[44px] sm:text-sm md:h-[46px] md:text-base"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </div>
        <p className="text-center text-xs text-text-light sm:text-sm">
          <Link
            href="/register"
            className="text-text-light no-underline hover:text-primary transition-colors"
          >
            Don&apos;t have an account?
          </Link>
        </p>
      </form>
    </div>
  );
}
