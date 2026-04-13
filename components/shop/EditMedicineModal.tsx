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
      });
  }, [product, reset]);

  const onSubmit = async (data: FormData) => {
    if (!product) return;
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("price", data.price);
      fd.append("description", data.description);
      if (file) fd.append("photo", file);
      await editProduct(product._id, fd);
      toast.success("Medicine updated!");
      setFile(null);
      onSuccess();
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-6 text-center text-xl font-bold">Edit medicine</h2>
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
          <span>&#128206;</span> Change image
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
        <Textarea label="Description" {...register("description")} />
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save medicine"}
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
