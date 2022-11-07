import { prisma } from '@/prisma/db'

export default defineEventHandler(async event => {
    const { renterId, equipmentId } = useQuery(event)
    if (renterId && !isNaN(Number(renterId))) {
        const loans = await prisma.loans.findMany({
            where: {
                renterId: Number(renterId),
            },
            include: {
                equipment: true,
                renter: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        role: true,
                        email: true,
                        loans: false,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
            },
        })
        return loans
    }
    if (equipmentId && !isNaN(Number(equipmentId))) {
        const loans = await prisma.loans.findMany({
            where: {
                equipmentId: Number(equipmentId),
            },
            include: {
                equipment: true,
                renter: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        role: true,
                        email: true,
                        loans: false,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
            },
        })
        return loans
    }
    const result = await prisma.loans.findMany({
        include: {
            equipment: true,
            renter: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    role: true,
                    email: true,
                    loans: false,
                    createdAt: true,
                    updatedAt: true,
                }
            },
        },
    })
    return result
})