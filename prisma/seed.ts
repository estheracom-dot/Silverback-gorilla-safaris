import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('seeding database...')
    await prisma.$connect()
    console.log('connected!')
    await prisma.$disconnect()
}

main().catch(console.error)