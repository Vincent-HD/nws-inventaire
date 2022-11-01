import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
    const { renterId, equipmentId } = useQuery(event)
    if (renterId && !isNaN(Number(renterId))) {
        const loans = await prisma.loans.findMany({
            where: {
                renterId: Number(renterId),
            }
        })
        return loans
    }
    if (equipmentId && !isNaN(Number(equipmentId))) {
        const loans = await prisma.loans.findMany({
            where: {
                equipmentId: Number(equipmentId),
            }
        })
        return loans
    }
    const result = await prisma.loans.findMany()
    return result
})