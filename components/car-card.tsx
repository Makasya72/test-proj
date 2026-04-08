import Image from 'next/image';
import Link from 'next/link';
import { convertJpyToRub, formatJpy, formatKm, formatRub } from '@/lib/utils';

export type CarCardProps = {
  id: string;
  title: string;
  imageUrl?: string | null;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileageKm?: number | null;
  priceJpy?: number | null;
  location?: string | null;
};

export function CarCard(props: CarCardProps) {
  const priceRub = convertJpyToRub(props.priceJpy);

  return (
    <Link
      href={`/cars/${props.id}`}
      className="group overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-[#fcfaf7] shadow-[0_12px_30px_rgba(44,69,89,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(35,49,66,0.12)]"
    >
      <div className="relative aspect-[16/10] bg-[#efe9df]">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={props.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Нет фото
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#233142] shadow">
          {props.year ?? '—'}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-slate-900">
            {props.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm text-slate-500">
            {[props.brand, props.model].filter(Boolean).join(' • ') || 'Неизвестная модель'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#f3efe8] p-4 text-sm text-slate-600">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
              Пробег
            </span>
            <span className="mt-1 block font-medium text-slate-700">
              {formatKm(props.mileageKm)}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
              Локация
            </span>
            <span className="mt-1 block font-medium text-slate-700">
              {props.location ?? '—'}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold tracking-tight text-[#233142]">
            {formatJpy(props.priceJpy)}
          </div>
          <div className="text-sm text-slate-500">{formatRub(priceRub)}</div>
        </div>
      </div>
    </Link>
  );
}