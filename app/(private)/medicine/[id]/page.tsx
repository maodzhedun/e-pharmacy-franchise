//app/(private)/medicine/[id]/page.tsx4

"use client";
import { useState, useEffect, useCallback, use } from "react";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Pagination from "@/components/ui/Pagination";
import { getProductDetail, addToShop } from "@/services/api";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";
import type { Product, Review } from "@/types";

type Tab = "description" | "reviews";

export default function MedicinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState<Tab>("description");
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res: any = await getProductDetail(id, `page=${reviewPage}&limit=3`);
      setProduct(res.product);
      setReviews(res.reviews);
      setReviewTotalPages(res.reviewTotalPages || 1);
    } catch {}
    setLoading(false);
  }, [id, reviewPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = async () => {
    try {
      await addToShop(id);
      toast.success("Added to shop!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading) return <Loader />;
  if (!product)
    return <p className="py-12 text-center text-gray">Product not found</p>;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <div className="w-full lg:w-[380px]">
        <div className="mb-4 flex h-[280px] items-center justify-center rounded-2xl border border-primary/20 bg-primary-10 p-4 md:h-[340px]">
          {product.photo ? (
            <img
              src={product.photo}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-6xl text-primary/30">&#128138;</span>
          )}
        </div>
        <div className="rounded-2xl bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-text">{product.name}</h1>
              <p className="text-sm text-gray">Brand: {product.suppliers}</p>
            </div>
            <span className="text-xl font-bold text-text">
              &#2547;{product.price}
            </span>
          </div>
          <Button size="sm" className="mt-4" onClick={handleAdd}>
            Add to shop
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl bg-white p-5 md:p-8">
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("description")}
            className={clsx(
              "rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer",
              tab === "description"
                ? "bg-primary text-white"
                : "border border-primary text-primary",
            )}
          >
            Description
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={clsx(
              "rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer",
              tab === "reviews"
                ? "bg-primary text-white"
                : "border border-primary text-primary",
            )}
          >
            Reviews
          </button>
        </div>

        {tab === "description" ? (
          <div className="text-sm leading-relaxed text-text/80">
            {product.description ? (
              product.description.split("\n").map((p, i) => (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-gray">No description available.</p>
            )}
          </div>
        ) : (
          <div>
            {reviews.length === 0 ? (
              <p className="text-gray text-sm">No reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                  <div key={r._id} className="rounded-xl bg-bg p-4">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-text">{r.name}</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Icon
                            key={s}
                            id={
                              s <= (r.rating || 0)
                                ? "icon-star"
                                : "icon-star-empty"
                            }
                            size={14}
                            className={
                              s <= (r.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mb-2 text-xs text-gray">
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-text/80">{r.testimonial}</p>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              page={reviewPage}
              totalPages={reviewTotalPages}
              onChange={setReviewPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
