import Link from 'next/link';

type PaginationProps = {
  page: number;
  totalPages: number;
  query?: {
    brand?: string;
    model?: string;
    sort?: string;
  };
};

function buildHref(page: number, query?: PaginationProps['query']) {
  const params = new URLSearchParams();

  if (query?.brand) params.set('brand', query.brand);
  if (query?.model) params.set('model', query.model);
  if (query?.sort) params.set('sort', query.sort);
  params.set('page', String(page));

  return `/cars?${params.toString()}`;
}

export function Pagination({ page, totalPages, query }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#e6ddd0] bg-[#fcfaf7] p-2 shadow-sm">
      <Link
        href={buildHref(Math.max(1, page - 1), query)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          page <= 1
            ? 'pointer-events-none text-slate-300'
            : 'text-slate-700 hover:bg-[#eef3f7]'
        }`}
      >
        Назад
      </Link>

      <div className="rounded-xl bg-[#233142] px-4 py-2 text-sm font-semibold text-white">
        {page} / {totalPages}
      </div>

      <Link
        href={buildHref(Math.min(totalPages, page + 1), query)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          page >= totalPages
            ? 'pointer-events-none text-slate-300'
            : 'text-slate-700 hover:bg-[#eef3f7]'
        }`}
      >
        Вперёд
      </Link>
    </div>
  );
}