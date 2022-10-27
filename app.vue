<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
    import { PrismaClient } from './prisma/generated/client';
    const prisma = new PrismaClient()
    const result = prisma.user.create({
        data: {
            email: "vincent@rouen-webmaster.com",
            firstname: "Vincent",
            lastname: "Houdan",
            password: "123456",
            role: "ADMIN"
        }
    })
    console.log(result)
</script>