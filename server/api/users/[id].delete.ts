import { prisma } from '@/prisma/db'

export default defineEventHandler(async event => {
    const { id } = getRouterParams(event)
    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    return id
})