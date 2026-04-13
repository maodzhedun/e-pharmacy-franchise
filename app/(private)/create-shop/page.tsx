//app/(private)/create-shop/page.tsx

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createShop } from "@/services/api";
import { useState } from "react";

interface FormData {
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export default function CreateShopPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [hasDelivery, setHasDelivery] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v));
      fd.append("hasDelivery", String(hasDelivery));
      if (logoFile) fd.append("logo", logoFile);
      await createShop(fd);
      toast.success("Shop created!");
      router.push("/shop");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="rounded-3xl bg-white p-6 md:p-10 lg:flex-1">
        <h1 className="mb-2 text-2xl font-bold text-text md:text-3xl">
          Create your Shop
        </h1>
        <p className="mb-8 text-sm text-text-light">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Shop Name"
              placeholder="Enter text"
              {...register("name", { required: "Required" })}
              error={errors.name?.message}
            />
            <Input
              label="Shop Owner Name"
              placeholder="Enter text"
              {...register("owner", { required: "Required" })}
              error={errors.owner?.message}
            />
            <Input
              label="Email address"
              placeholder="Enter text"
              type="email"
              {...register("email", { required: "Required" })}
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Phone Number"
              placeholder="Enter text"
              {...register("phone", { required: "Required" })}
              error={errors.phone?.message}
            />
            <Input
              label="Street address"
              placeholder="Enter text"
              {...register("address", { required: "Required" })}
              error={errors.address?.message}
            />
            <Input
              label="City"
              placeholder="Enter text"
              {...register("city", { required: "Required" })}
              error={errors.city?.message}
            />
          </div>
          <div className="max-w-[200px]">
            <Input
              label="Zip / Postal"
              placeholder="Enter text"
              {...register("zip", { required: "Required" })}
              error={errors.zip?.message}
            />
          </div>
          {/* Upload Logo — за вимогою ТЗ */}
          <div>
            <p className="mb-2 text-xs font-semibold text-text">Upload Logo</p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-primary">
              {logoFile ? logoFile.name : "Choose file..."}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-text">
              Has own Delivery System?
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  checked={hasDelivery}
                  onChange={() => setHasDelivery(true)}
                />{" "}
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  checked={!hasDelivery}
                  onChange={() => setHasDelivery(false)}
                />{" "}
                No
              </label>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
        </form>
      </div>
      <div className="hidden lg:block lg:w-[400px]">
        <div className="h-[500px] w-full rounded-3xl bg-gray-200" />
      </div>
    </div>
  );
}
