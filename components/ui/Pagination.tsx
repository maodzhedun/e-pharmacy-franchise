//components/ui/Pagination.tsx

"use client";

interface Props {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1))
      pages.push(i);
    else if (pages[pages.length - 1] !== "...") pages.push("...");
  }
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      <button
        onClick={() => onChange(1)}
        disabled={page === 1}
        className="px-2 py-1 text-sm text-gray disabled:opacity-30"
      >
        &laquo;
      </button>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 text-sm text-gray disabled:opacity-30"
      >
        &lsaquo;
      </button>
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={i}
            onClick={() => onChange(p)}
            className={`min-w-[36px] rounded-full px-3 py-1.5 text-sm font-medium transition ${p === page ? "bg-primary text-white" : "text-text hover:bg-primary-10"}`}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-1 text-gray">
            ...
          </span>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-2 py-1 text-sm text-gray disabled:opacity-30"
      >
        &rsaquo;
      </button>
      <button
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        className="px-2 py-1 text-sm text-gray disabled:opacity-30"
      >
        &raquo;
      </button>
    </div>
  );
}