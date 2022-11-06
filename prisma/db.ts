import { PrismaClient } from "@prisma/client";

// Declare singletone monobehaviour class
class Database {
    private static instance: Database;
    public prisma?: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient()
        // if (process.env.NODE_ENV === "development") {
        //     this.prisma = new PrismaClient({
        //         datasources: {
        //             db: {
        //                 url: 
        //             }
        //         }
        //     });
        // }
    }
    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
export const prisma = Database.getInstance().prisma 