import { prisma } from '@/prisma/db'

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const result = await prisma.equipment.findUnique({
        where: {
            id: Number(id)
        }
    })
    return result
})