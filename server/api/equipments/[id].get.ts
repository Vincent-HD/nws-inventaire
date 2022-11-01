import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const result = await prisma.equipment.findUnique({
        where: {
            id: Number(id)
        }
    })
    return result
})