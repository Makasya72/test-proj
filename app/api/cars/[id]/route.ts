import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await db.car.findUnique({ where: { id } });

  if (!car) {
    return NextResponse.json({ message: 'Car not found' }, { status: 404 });
  }

  return NextResponse.json(car);
}
