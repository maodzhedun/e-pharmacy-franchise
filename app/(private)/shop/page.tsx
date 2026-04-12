//app/(private)/shop/page.tsx

"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/shop/ProductCard";
import AddMedicineModal from "@/components/shop/AddMedicineModal";
import EditMedicineModal from "@/components/shop/EditMedicineModal";
import DeleteModal from "@/components/shop/DeleteModal";
import {
  getMyShop,
  getShopProducts,
  getAllMedicine,
  addToShop,
} from "@/services/api";
import toast from "react-hot-toast";
import type { Shop, Product } from "@/types";

type Tab = "drugstore" | "all";

export default function ShopPage() {
  const router = useRouter();
  const [shop, setShop] = useState<(Shop & { _id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("drugstore");

  const [ownProducts, setOwnProducts] = useState<Product[]>([]);
  const [ownPage, setOwnPage] = useState(1);
  const [ownTotal, setOwnTotal] = useState(0);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allPage, setAllPage] = useState(1);
  const [allTotal, setAllTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterName, setFilterName] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editProd, setEditProd] = useState<Product | null>(null);
  const [deleteProd, setDeleteProd] = useState<Product | null>(null);

  const fetchShop = useCallback(async () => {
    try {
      const s: any = await getMyShop();
      if (!s) {
        router.push("/create-shop");
        return;
      }
      setShop(s);
    } catch {
      router.push("/create-shop");
    }
    setLoading(false);
  }, [router]);

  const fetchOwn = useCallback(async () => {
    if (!shop) return;
    const res: any = await getShopProducts(
      shop._id,
      `page=${ownPage}&limit=12`,
    );
    setOwnProducts(res.products);
    setOwnTotal(res.totalPages || 1);
  }, [shop, ownPage]);

  const fetchAll = useCallback(async () => {
    if (!shop) return;
    const params = new URLSearchParams({ page: String(allPage), limit: "12" });
    if (filterCategory) params.set("category", filterCategory);
    if (filterName) params.set("name", filterName);
    const res: any = await getAllMedicine(shop._id, params.toString());
    setAllProducts(res.products);
    setAllTotal(res.totalPages || 1);
    if (res.categories) setCategories(res.categories);
  }, [shop, allPage, filterCategory, filterName]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);
  useEffect(() => {
    if (shop && tab === "drugstore") fetchOwn();
  }, [shop, tab, fetchOwn]);
  useEffect(() => {
    if (shop && tab === "all") fetchAll();
  }, [shop, tab, fetchAll]);

  const handleFilter = () => {
    setAllPage(1);
    fetchAll();
  };
  const handleAddToShop = async (id: string) => {
    if (!shop) return;
    try {
      await addToShop(shop._id, id);
      toast.success("Added to shop!");
      fetchOwn();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading) return <Loader />;
  if (!shop) return null;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            {shop.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray">
            <span>
              Owner: <strong className="text-text">{shop.owner}</strong>
            </span>
            <span>&#9737; {shop.address}</span>
            <span>&#9742; {shop.phone}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push("/edit-shop")}
          >
            Edit data
          </Button>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            Add medicine
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-6 border-b border-border">
        <button
          onClick={() => setTab("drugstore")}
          className={clsx(
            "pb-3 text-sm font-medium transition cursor-pointer",
            tab === "drugstore"
              ? "border-b-2 border-primary text-text"
              : "text-gray",
          )}
        >
          Drug store
        </button>
        <button
          onClick={() => setTab("all")}
          className={clsx(
            "pb-3 text-sm font-medium transition cursor-pointer",
            tab === "all" ? "border-b-2 border-primary text-text" : "text-gray",
          )}
        >
          All medicine
        </button>
      </div>

      {tab === "all" && (
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="">Product category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search medicine"
            className="rounded-full border border-border bg-white px-4 py-3 text-sm outline-none"
          />
          <Button size="sm" onClick={handleFilter}>
            &#9655; Filter
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {(tab === "drugstore" ? ownProducts : allProducts).map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            variant={tab === "drugstore" ? "own" : "all"}
            onEdit={() => setEditProd(p)}
            onDelete={() => setDeleteProd(p)}
            onAddToShop={() => handleAddToShop(p._id)}
            onDetails={() => router.push(`/medicine/${p._id}`)}
          />
        ))}
      </div>

      {(tab === "drugstore" ? ownProducts : allProducts).length === 0 && (
        <p className="py-12 text-center text-gray">No products found</p>
      )}

      <Pagination
        page={tab === "drugstore" ? ownPage : allPage}
        totalPages={tab === "drugstore" ? ownTotal : allTotal}
        onChange={tab === "drugstore" ? setOwnPage : setAllPage}
      />

      <AddMedicineModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        shopId={shop._id}
        onSuccess={fetchOwn}
      />
      <EditMedicineModal
        open={!!editProd}
        product={editProd}
        shopId={shop._id}
        onClose={() => setEditProd(null)}
        onSuccess={fetchOwn}
      />
      <DeleteModal
        open={!!deleteProd}
        product={deleteProd}
        shopId={shop._id}
        onClose={() => setDeleteProd(null)}
        onSuccess={fetchOwn}
      />
    </div>
  );
}