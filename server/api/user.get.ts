import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler( event => {

    const result = prisma.user.create({
        data: {
            email: "vincent@rouen-webmaster.com",
            firstname: "Vincent",
            lastname: "Houdan",
            password: "123456",
            role: "ADMIN"
        }
    })

    return { data: result }
})