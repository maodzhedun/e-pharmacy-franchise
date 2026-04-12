//components/shop/ProductCard.tsx

"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Product } from "@/types";

interface Props {
  product: Product;
  variant: "own" | "all";
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToShop?: () => void;
  onDetails?: () => void;
}

export default function ProductCard({
  product,
  variant,
  onEdit,
  onDelete,
  onAddToShop,
  onDetails,
}: Props) {
  return (
    <div className="flex flex-col rounded-2xl border border-primary/20 bg-white overflow-hidden">
      <div className="relative flex h-[180px] items-center justify-center bg-primary-10 p-4 md:h-[200px]">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="300px"
          />
        ) : (
          <div className="h-full w-full rounded-xl bg-gray-100" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-text">{product.name}</h3>
            <p className="text-xs text-gray">{product.suppliers}</p>
          </div>
          <span className="text-sm font-bold text-text whitespace-nowrap">
            &#2547;{product.price}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          {variant === "own" ? (
            <>
              <Button size="sm" onClick={onEdit}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={onAddToShop}>
                Add to shop
              </Button>
              <button
                onClick={onDetails}
                className="text-xs text-text underline cursor-pointer hover:text-primary"
              >
                Details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}