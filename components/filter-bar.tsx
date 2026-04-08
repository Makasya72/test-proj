type FilterBarProps = {
  brand?: string;
  model?: string;
  sort?: string;
};

export function FilterBar({ brand = '', model = '', sort = 'newest' }: FilterBarProps) {
  return (
    <form action="/cars" className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="brand" className="text-sm font-medium text-slate-700">
          Марка
        </label>
        <input
          id="brand"
          name="brand"
          defaultValue={brand}
          placeholder="Toyota, BMW, Alfa Romeo..."
          className="w-full rounded-2xl border border-[#e7dfd4] bg-[#f7f3ee] px-4 py-3 text-sm outline-none transition focus:border-[#7c8ea3] focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="model" className="text-sm font-medium text-slate-700">
          Модель
        </label>
        <input
          id="model"
          name="model"
          defaultValue={model}
          placeholder="Prius, Giulia, Jimny..."
          className="w-full rounded-2xl border border-[#e7dfd4] bg-[#f7f3ee] px-4 py-3 text-sm outline-none transition focus:border-[#7c8ea3] focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="sort" className="text-sm font-medium text-slate-700">
          Сортировка
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="w-full rounded-2xl border border-[#e7dfd4] bg-[#f7f3ee] px-4 py-3 text-sm outline-none transition focus:border-[#7c8ea3] focus:bg-white"
        >
          <option value="newest">Сначала новые</option>
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
          <option value="mileage_asc">Пробег: по возрастанию</option>
          <option value="year_desc">Год: сначала новее</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="submit"
          className="rounded-2xl bg-[#233142] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1b2633]"
        >
          Применить
        </button>

        <a
          href="/cars"
          className="flex items-center justify-center rounded-2xl border border-[#e7dfd4] bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f7f3ee]"
        >
          Сбросить
        </a>
      </div>
    </form>
  );
}