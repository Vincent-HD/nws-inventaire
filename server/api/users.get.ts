import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
    return "Vasy allo ?"
    const result = await prisma.user.findMany()
    return result
})