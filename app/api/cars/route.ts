import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const brand = searchParams.get('brand') || undefined;
  const model = searchParams.get('model') || undefined;
  const page = Number(searchParams.get('page') || '1');
  const limit = Math.min(Number(searchParams.get('limit') || '12'), 50);
  const sort = searchParams.get('sort') || 'newest';

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

  const [items, total] = await Promise.all([
    db.car.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    }),
    db.car.count({ where })
  ]);

  return NextResponse.json({
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit))
    }
  });
}
