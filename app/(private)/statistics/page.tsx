//app/(private)/statistics/page.tsx

"use client";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import ClientGoodsModal from "@/components/statistics/ClientGoodsModal";
import { getStatistics } from "@/services/api";
import type { Customer, IncomeExpense } from "@/types";

interface Stats {
  totalProducts: number;
  totalSuppliers: number;
  totalCustomers: number;
  recentCustomers: Customer[];
  incomeExpenses: IncomeExpense[];
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  useEffect(() => {
    getStatistics()
      .then((res: any) => {
        setStats(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!stats)
    return (
      <p className="py-12 text-center text-gray">Failed to load statistics</p>
    );

  const kpis = [
    {
      label: "All products",
      value: stats.totalProducts.toLocaleString(),
      icon: "📦",
    },
    {
      label: "All suppliers",
      value: stats.totalSuppliers.toLocaleString(),
      icon: "👥",
    },
    {
      label: "All customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: "👤",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-text md:text-3xl">
        Statistics
      </h1>

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-gray">
              <span>{k.icon}</span>
              {k.label}
            </div>
            <p className="text-2xl font-bold text-text">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Customers */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-text">Recent Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Spent</th>
                  <th className="pb-3 font-medium">Medicine</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCustomers.map((c) => (
                  <tr key={c._id} className="border-t border-border">
                    <td className="py-3 text-text">{c.name}</td>
                    <td className="py-3 text-text">{c.email}</td>
                    <td className="py-3 text-text">{c.spent}</td>
                    <td className="py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedClient(c._id)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Income/Expenses */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-text">Income/Expenses</h2>
          <p className="mb-3 text-xs text-gray">Today</p>
          <div className="flex flex-col gap-3">
            {stats.incomeExpenses.map((ie) => (
              <div
                key={ie._id}
                className="flex items-center justify-between border-t border-border pt-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      ie.type === "Income" && "bg-income/10 text-income",
                      ie.type === "Expense" && "bg-expense/10 text-expense",
                      ie.type === "Error" && "bg-gray-200 text-gray",
                    )}
                  >
                    {ie.type}
                  </span>
                  <span className="text-sm text-text">{ie.name}</span>
                </div>
                <span
                  className={clsx(
                    "text-sm font-medium",
                    ie.type === "Income" && "text-income",
                    ie.type === "Expense" && "text-expense",
                    ie.type === "Error" && "text-text",
                  )}
                >
                  {ie.type === "Expense" ? "" : "+"}
                  {ie.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ClientGoodsModal
        open={!!selectedClient}
        clientId={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  );
}
