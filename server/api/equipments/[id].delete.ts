import { prisma } from '@/prisma/db'

export default defineEventHandler(async event => {
    const { id } = getRouterParams(event)
    await prisma.equipment.delete({
        where: {
            id: Number(id)
        }
    })
    return id
})