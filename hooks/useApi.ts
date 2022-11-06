import { User } from "@prisma/client"

export const getUsers = async () => {
    return await $fetch<User[]>('/api/users')
}