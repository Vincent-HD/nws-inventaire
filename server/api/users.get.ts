import { prisma } from '@/prisma/db'

export default defineEventHandler(async event => {
    const result = await prisma.user.findMany()
    return result
})