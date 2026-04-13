//app/(private)/edit-shop/page.tsx

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { getMyShop, updateShop } from "@/services/api";

interface FormData {
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export default function EditShopPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [hasDelivery, setHasDelivery] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getMyShop()
      .then((shop: any) => {
        if (!shop) {
          router.push("/create-shop");
          return;
        }
        reset({
          name: shop.name,
          owner: shop.owner,
          email: shop.email,
          phone: shop.phone,
          address: shop.address,
          city: shop.city,
          zip: shop.zip,
        });
        setHasDelivery(shop.hasDelivery);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v));
      fd.append("hasDelivery", String(hasDelivery));
      await updateShop(fd);
      toast.success("Shop updated!");
      router.push("/shop");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="rounded-3xl bg-white p-6 md:p-10 lg:flex-1">
        <h1 className="mb-2 text-2xl font-bold text-text md:text-3xl">
          Edit data
        </h1>
        <p className="mb-8 text-sm text-gray">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Shop Name"
              {...register("name", { required: "Required" })}
              error={errors.name?.message}
            />
            <Input
              label="Shop Owner Name"
              {...register("owner", { required: "Required" })}
              error={errors.owner?.message}
            />
            <Input
              label="Email address"
              type="email"
              {...register("email", { required: "Required" })}
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Phone Number"
              {...register("phone", { required: "Required" })}
              error={errors.phone?.message}
            />
            <Input
              label="Street address"
              {...register("address", { required: "Required" })}
              error={errors.address?.message}
            />
            <Input
              label="City"
              {...register("city", { required: "Required" })}
              error={errors.city?.message}
            />
          </div>
          <div className="max-w-[200px]">
            <Input
              label="Zip / Postal"
              {...register("zip", { required: "Required" })}
              error={errors.zip?.message}
            />
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
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
      <div className="hidden lg:block lg:w-[400px]">
        <div className="h-[500px] w-full rounded-3xl bg-gray-200" />
      </div>
    </div>
  );
}
