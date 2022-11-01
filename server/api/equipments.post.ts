import { Prisma, PrismaClient } from "@prisma/client";
import { toEquipementStatus } from "@/utils";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let { name, description, stock, status } = await readBody(event)
    if (!name || !description) {
        throw createError({ statusCode: 400, message: "Missing required fields" })
    }
    try {
        const result = await prisma.equipment.create({
            data: {
                name,
                description,
                stock: Math.abs(Number(stock)) ?? 1,
                status: toEquipementStatus(status),
            }
        })
        return result
    } catch (error) {
        throw error
    }
})