import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { email, firstname, lastname } = await readBody(event)
    if (!email || !firstname || !lastname) {
        throw createError({ statusCode: 400, message: "Missing required fields" })
    }
    const password = ''
    try {
        const result = await prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                password
            }
        })
        delete result.password
        return result
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw createError({ statusCode: 400, message: "L'adresse mail est déjà utilisée" })
            }
        }
        throw error
    }
})