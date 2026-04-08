import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.car.count();
  if (count > 0) {
    console.log(`Seed skipped, ${count} cars already exist.`);
    return;
  }

  await prisma.car.createMany({
    data: [
      {
        sourceUrl: 'https://example.com/cars/1',
        externalId: 'demo-1',
        title: 'Toyota Prius S Touring',
        brand: 'Toyota',
        model: 'Prius',
        year: 2021,
        mileageKm: 31000,
        priceJpy: 2390000,
        totalPriceJpy: 2490000,
        bodyType: 'Hybrid',
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        color: 'Pearl White',
        location: 'Tokyo',
        engineCapacity: '1800cc',
        imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
        description: 'Demo seed row for local development.'
      },
      {
        sourceUrl: 'https://example.com/cars/2',
        externalId: 'demo-2',
        title: 'Nissan Serena Highway Star',
        brand: 'Nissan',
        model: 'Serena',
        year: 2020,
        mileageKm: 48000,
        priceJpy: 1980000,
        totalPriceJpy: 2090000,
        bodyType: 'Minivan',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Black',
        location: 'Osaka',
        engineCapacity: '2000cc',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
        description: 'Another demo row to make UI immediately usable.'
      }
    ]
  });

  console.log('Seed complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
