import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('seeding...')
    await prisma.trip.createMany({
        data: [
            {
                title: "Serengeti 5-Day Safari",
                description: "Witness the Great Migration. Game drives, luxury lodges, and sunset dinners.",
                location: "Serengeti, Tanzania",
                price: 2400,
                image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
                startDate: new Date("2026-02-15"),
                endDate: new Date("2026-02-15"),
                duration: 5
            },
            {
                title: "Maasai Mara 3-Day Safari",
                description: "Experience the Maasai culture and wildlife in their natural habitat.",
                location: "Maasai Mara, Kenya",
                price: 1200,
                image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
                startDate: new Date("2026-03-15"),
                endDate: new Date("2026-03-15"),
                duration: 3
            },
            {
                title: "Murchison Falls 3-Day Adventure",
                description: "Boat cruise to the falls, rhino tracking, and wildlife in uganda's largest park.",
                location: "Murchison Falls, Uganda",
                price: 850,
                image: "https://images.unsplash.com/photo-1500534314201-a16ddbcd2292?w=800",
                startDate: new Date("2026-03-05"),
                endDate: new Date("2026-03-08"),
                duration: 3
            }
        ]
    })
    console.log('Database seeded successfully')
}
main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })