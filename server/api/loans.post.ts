import { Loans } from "@prisma/client";
import { prisma } from '@/prisma/db'
import { isDateValid } from "~~/composables/useUtils";
import { isNuxtError } from "#app"; //? It's supposed to be auto-imported, but it's apparently not.
import { H3Error } from "h3";

type LoanCreateQuery = {
    equipmentId: number;
    renterId: number;
    loanStartDate: Date | string | undefined;
    loanEndDate: Date | string | undefined;
};

export default defineEventHandler(async (event) => {
    const { renterId, equipmentId, loanStartDate, loanEndDate } = await readBody<LoanCreateQuery>(event);
    console.log("Creating loan for equipment", equipmentId, "rented by", renterId, "from", loanStartDate, "to", loanEndDate);
    if (!renterId || !equipmentId || !loanEndDate) {
        throw createError({ statusCode: 400, message: "Missing renterId or equipmentId or endDate" });
    }
    try {
        const startDateObj = new Date(loanStartDate);
        const endDateObj = new Date(loanEndDate);
        if ((loanStartDate && !isDateValid(startDateObj)) || !isDateValid(endDateObj)) {
            throw createError({ statusCode: 400, message: "Invalid date" });
        }
        const result = await prisma.loans.create({
            data: {
                equipmentId,
                renterId,
                loanStartDate: startDateObj,
                loanEndDate: endDateObj,
            },
            include: {
                equipment: true,
                renter: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        role: true,
                        email: true,
                        loans: false,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
            },
        });

        return result;
    } catch (error) {
        switch (true) {
            case error?.code === "P2003":
                throw createError({ statusCode: 400, message: "L'équipement ou le locataire n'est pas valide" });
            default:
                console.error(error);
                throw createError({ statusCode: 500, message: "Une erreur est survenue" });
        }
    }
});
