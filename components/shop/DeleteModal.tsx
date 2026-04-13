//components/shop/DeleteModal.tsx

"use client";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { deleteProduct } from "@/services/api";
import toast from "react-hot-toast";
import { useState } from "react";
import type { Product } from "@/types";

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteModal({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await deleteProduct(product._id);
      toast.success("Product deleted");
      onSuccess();
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-2 text-center text-xl font-bold">Confirm deletion</h2>
      <p className="mb-6 text-center text-sm text-gray">
        Are you sure you want to delete this item?
      </p>
      {product && (
        <div className="mx-auto mb-6 flex flex-col items-center gap-2">
          {product.photo && (
            <img
              src={product.photo}
              alt=""
              className="h-[100px] w-[120px] rounded-xl border border-primary/20 object-contain p-2"
            />
          )}
          <p className="font-semibold text-text">{product.name}</p>
          <p className="text-xs text-gray">{product.suppliers}</p>
        </div>
      )}
      <div className="flex justify-center gap-3">
        <Button onClick={handleConfirm} disabled={loading}>
          {loading ? "Deleting..." : "Confirm"}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
