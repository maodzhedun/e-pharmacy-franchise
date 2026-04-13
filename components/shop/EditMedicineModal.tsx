//components/shop/EditMedicineModal.tsx

"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { editProduct } from "@/services/api";
import toast from "react-hot-toast";
import type { Product } from "@/types";

const CATEGORIES = [
  "Medicine",
  "Head",
  "Hand",
  "Heart",
  "Leg",
  "Dental Care",
  "Skin Care",
  "Eye Care",
  "Vitamins & Supplements",
  "Orthopedic Products",
  "Baby Care",
];

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}
interface FormData {
  name: string;
  price: string;
  description: string;
  category: string;
}

export default function EditMedicineModal({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (product)
      reset({
        name: product.name,
        price: product.price,
        description: product.description || "",
        category: product.category || "Medicine",
      });
  }, [product, reset]);

  const onSubmit = async (data: FormData) => {
    if (!product) return;
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("price", data.price);
      fd.append("description", data.description);
      fd.append("category", data.category);
      if (file) fd.append("photo", file);
      await editProduct(product._id, fd);
      toast.success("Product updated!");
      setFile(null);
      onSuccess();
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-6 text-center text-xl font-bold">
        Edit Product Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="mx-auto flex h-[120px] w-[140px] items-center justify-center rounded-2xl border border-primary/30 bg-primary-10 overflow-hidden">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="h-full w-full object-contain p-2"
            />
          ) : product?.photo ? (
            <img
              src={product.photo}
              alt=""
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <span className="text-4xl text-primary/40">&#128138;</span>
          )}
        </div>
        <label className="mx-auto flex cursor-pointer items-center gap-1 text-xs text-gray underline">
          Change Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Medicine Name"
            {...register("name", { required: "Required" })}
            error={errors.name?.message}
          />
          <Input
            label="Price"
            {...register("price", { required: "Required" })}
            error={errors.price?.message}
          />
        </div>
        {/* Category dropdown — за вимогою ТЗ */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-text">Category</label>
          <select
            {...register("category")}
            className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-primary"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Textarea label="Description" {...register("description")} />
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
