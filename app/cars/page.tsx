import { db } from '@/lib/db';
import { CarCard } from '@/components/car-card';
import { FilterBar } from '@/components/filter-bar';
import { Pagination } from '@/components/pagination';

export default async function CarsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const brand = typeof params.brand === 'string' ? params.brand : undefined;
  const model = typeof params.model === 'string' ? params.model : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';
  const page = Number(typeof params.page === 'string' ? params.page : '1');
  const limit = 12;

  const where = {
    brand: brand ? { contains: brand, mode: 'insensitive' as const } : undefined,
    model: model ? { contains: model, mode: 'insensitive' as const } : undefined
  };

  const orderBy = (() => {
    switch (sort) {
      case 'price_asc':
        return { priceJpy: 'asc' as const };
      case 'price_desc':
        return { priceJpy: 'desc' as const };
      case 'mileage_asc':
        return { mileageKm: 'asc' as const };
      case 'year_desc':
        return { year: 'desc' as const };
      default:
        return { createdAt: 'desc' as const };
    }
  })();

  const [cars, total] = await Promise.all([
    db.car.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    }),
    db.car.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-[#ddd4c7] bg-gradient-to-br from-[#233142] via-[#2c4559] to-[#7c8ea3] px-6 py-8 text-white shadow-[0_20px_60px_rgba(35,49,66,0.18)]">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
            Актуальный каталог
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Найдите японский автомобиль в современном каталоге
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Переведённые характеристики, чистые карточки, цены в йенах и рублях,
            а также удобный интерфейс в стиле автомобильного сервиса.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <div className="h-fit rounded-[28px] border border-[#e6ddd0] bg-[#fcfaf7] p-5 shadow-[0_10px_30px_rgba(44,69,89,0.06)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Фильтры</h2>
            <p className="mt-1 text-sm text-slate-500">Поиск по марке, модели и параметрам.</p>
          </div>
          <FilterBar brand={brand} model={model} sort={sort} />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 rounded-[28px] border border-[#e6ddd0] bg-[#fcfaf7] p-5 shadow-[0_10px_30px_rgba(44,69,89,0.05)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Доступные автомобили</h2>
              <p className="mt-1 text-sm text-slate-500">
                Найдено: {total}
              </p>
            </div>
            <div className="rounded-full bg-[#eef3f7] px-4 py-2 text-sm text-slate-600">
              Сортировка: <span className="font-medium text-[#233142]">{sort}</span>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#d5cabd] bg-[#fcfaf7] p-12 text-center text-slate-500 shadow-sm">
              Автомобили не найдены. Попробуйте изменить фильтры.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Pagination page={page} totalPages={totalPages} query={{ brand, model, sort }} />
          </div>
        </div>
      </section>
    </div>
  );
}