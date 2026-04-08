import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { convertJpyToRub, formatJpy, formatKm, formatRub } from '@/lib/utils';

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await db.car.findUnique({ where: { id } });

  if (!car) notFound();

  const priceRub = convertJpyToRub(car.priceJpy);

  const specs = [
    ['Марка', car.brand],
    ['Модель', car.model],
    ['Год', car.year?.toString()],
    ['Пробег', formatKm(car.mileageKm)],
    ['Тип кузова', car.bodyType],
    ['Топливо', car.fuelType],
    ['Коробка', car.transmission],
    ['Цвет', car.color],
    ['Локация', car.location],
    ['Двигатель', car.engineCapacity]
  ];

  return (
    <div className="space-y-8">
      <Link
        href="/cars"
        className="inline-flex rounded-full border border-[#e6ddd0] bg-[#fcfaf7] px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:text-[#233142]"
      >
        ← Назад в каталог
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="overflow-hidden rounded-[32px] border border-[#e6ddd0] bg-[#fcfaf7] shadow-[0_12px_30px_rgba(44,69,89,0.06)]">
          <div className="relative aspect-[16/10] bg-[#efe9df]">
            {car.imageUrl ? (
              <Image src={car.imageUrl} alt={car.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">Нет фото</div>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#e6ddd0] bg-[#fcfaf7] p-6 shadow-[0_12px_30px_rgba(44,69,89,0.06)]">
          <div className="inline-flex rounded-full border border-[#d6ccbe] bg-[#f3efe8] px-3 py-1 text-xs font-medium text-slate-500">
            Карточка автомобиля
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {car.title}
          </h1>

          <div className="mt-6 rounded-[24px] bg-gradient-to-br from-[#edf3f8] to-[#f7f4ee] p-5">
            <div className="text-3xl font-bold text-[#233142]">{formatJpy(car.priceJpy)}</div>
            <div className="mt-1 text-base text-slate-500">{formatRub(priceRub)}</div>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[#eee6db] bg-[#f8f5f0] px-4 py-3"
              >
                <span className="text-slate-500">{label}</span>
                <span className="max-w-[60%] text-right font-medium text-slate-900">
                  {value || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-[#e6ddd0] bg-[#fcfaf7] p-6 shadow-[0_12px_30px_rgba(44,69,89,0.06)]">
        <h2 className="text-2xl font-semibold text-slate-900">Описание</h2>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
          {car.description || 'Дополнительное описание отсутствует.'}
        </p>

        <div className="mt-6 rounded-2xl bg-[#f3efe8] px-4 py-3 text-xs text-slate-500">
          <span className="font-medium text-slate-600">Источник:</span>{' '}
          <span className="break-all">{car.sourceUrl}</span>
        </div>
      </section>
    </div>
  );
}