import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Каталог Carsensor',
  description: 'Каталог японских автомобилей'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#f6f3ee] text-slate-900">
        <header className="sticky top-0 z-30 border-b border-[#e7dfd4] bg-[#f8f5f0]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/cars" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#233142] text-sm font-bold text-white shadow-sm">
                CS
              </div>
              <div>
                <div className="text-sm font-semibold leading-none text-slate-900">
                  Каталог Carsensor
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Японские автомобили
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
              <Link href="/cars" className="transition hover:text-[#233142]">
                Каталог
              </Link>
              <Link href="/login" className="transition hover:text-[#233142]">
                Вход
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}