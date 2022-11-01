import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
    const { id } = getRouterParams(event)
    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    return id
})