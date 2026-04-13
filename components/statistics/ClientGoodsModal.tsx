//components/statistics/ClientGoodsModal.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import { getClientGoods } from "@/services/api";
import type { ClientGoods } from "@/types";

interface Props {
  open: boolean;
  clientId: string | null;
  onClose: () => void;
}

export default function ClientGoodsModal({ open, clientId, onClose }: Props) {
  const [data, setData] = useState<ClientGoods | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open || !clientId) return;
    setLoading(true);
    getClientGoods(clientId)
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [open, clientId]);

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-6 text-center text-xl font-bold">
        The client&apos;s goods
      </h2>
      {loading ? (
        <Loader />
      ) : (
        data && (
          <>
            <div className="mb-4 rounded-xl bg-primary-10 p-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-xs text-gray">Name</span>
                <p className="font-semibold">{data.customer.name}</p>
              </div>
              <div>
                <span className="text-xs text-gray">Email</span>
                <p className="font-semibold truncate">{data.customer.email}</p>
              </div>
              <div>
                <span className="text-xs text-gray">Spent</span>
                <p className="font-semibold">{data.customer.spent}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
              {data.goods.map((g) => (
                <div
                  key={g._id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-bg rounded-xl p-2 transition"
                  onClick={() => {
                    onClose();
                    router.push(`/medicine/${g._id}`);
                  }}
                >
                  {g.photo ? (
                    <img
                      src={g.photo}
                      alt=""
                      className="h-14 w-14 rounded-lg object-contain border border-border p-1"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-gray-100" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text">{g.name}</p>
                    <p className="text-xs text-gray">{g.category}</p>
                    <p className="text-xs font-semibold text-text">
                      &#2547; {g.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </Modal>
  );
}