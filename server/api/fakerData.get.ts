import { prisma } from '@/prisma/db'
import { faker } from '@faker-js/faker'
import { Equipment, Status, User } from '@prisma/client'

export default defineEventHandler(async (event) => {
    const randomValue = Math.random()
    const users: Partial<User>[] = []
    faker.setLocale('fr')
    const newUsers = {
        count: 0,
        users: []
    }        

    for (let i = 0; i < Math.floor(randomValue * 30) + 15; i++) {
        const createdAt = faker.date.past()
        const updatedAt = faker.date.between(createdAt, new Date())
        users.push({
            email: faker.internet.email(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            password: faker.internet.password(),
            role: 'USER',
            createdAt,
            updatedAt
        })
    }
    console.log(`Génération de ${users.length} utilisateurs`)
    newUsers.count = (await prisma.user.createMany({data: users as User[]})).count
    newUsers.users = await prisma.user.findMany()
    
    const newEquipments = {
        count: 0,
        equipments: []
    }
    const equipments: Partial<Equipment>[] = []
    for (let i = 0; i < Math.floor(randomValue * 200) + 15; i++) {
        const createdAt = faker.date.past()
        const updatedAt = faker.date.between(createdAt, new Date())
        const status: Status = Math.random() < 0.5 ? 'AVAILABLE' : Math.random() < 0.8 ? 'UNAVAILABLE' : 'UNLOANABLE'
        equipments.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            status,
            createdAt,
            updatedAt,
            stock: Math.floor(Math.random() * 10 + 1),
        })
    }
    console.log(`Génération de ${equipments.length} équipements`)
    newEquipments.count = (await prisma.equipment.createMany({data: equipments as Equipment[]})).count
    newEquipments.equipments = await prisma.equipment.findMany()
    await prisma.$disconnect()
    return {users: newUsers, equipments: newEquipments}
})