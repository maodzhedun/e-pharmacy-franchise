//components/forms/RegisterForm.tsx

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerUser } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: FormData) => {
    try {
      const res: any = await registerUser(data);
      setAuth(res.user, "");
      toast.success("Registered successfully!");
      router.push("/create-shop");
    } catch (e: any) {
      toast.error(e.message || "Registration failed");
    }
  };

  const inputClass =
    "h-[40px] w-full rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-gray focus:border-primary sm:h-[44px] sm:px-5 sm:text-sm md:h-[46px]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
      <div>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Min 2 chars" },
          })}
          placeholder="User Name"
          className={inputClass}
        />
        {errors.name && (
          <p className="mt-1 pl-4 text-xs text-expense">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email address"
          className={inputClass}
        />
        {errors.email && (
          <p className="mt-1 pl-4 text-xs text-expense">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone number"
          className={inputClass}
        />
        {errors.phone && (
          <p className="mt-1 pl-4 text-xs text-expense">
            {errors.phone.message}
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
          className={inputClass}
        />
        {errors.password && (
          <p className="mt-1 pl-4 text-xs text-expense">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="pt-1 sm:pt-2 md:pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[40px] w-full rounded-full bg-primary text-xs font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50 sm:h-[44px] sm:text-sm md:h-[46px] md:text-base"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </div>
      <p className="text-center text-xs text-gray sm:text-sm">
        <Link
          href="/login"
          className="text-gray no-underline hover:text-primary transition-colors"
        >
          Already have an account?
        </Link>
      </p>
    </form>
  );
}