import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categories = [
    { name: 'Products' },
    { name: 'Services' },
]

async function seedData() {
    console.log('Seeding...')

    for (const category of categories) {
        const result = await prisma.category.create({
            data: category,
        })
        console.log(`Created category with id: ${result.id}`)
    }

    console.log('Finished seeding.')
}

seedData()
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
.finally(()=>prisma.$disconnect());