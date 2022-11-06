import { prisma } from '@/prisma/db'

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id: Number(id)
        }
    })
    delete result.password
    return result
})