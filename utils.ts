import { Equipment, Status } from "@prisma/client";

export const toEquipementStatus = (status: string): Status  => {
    return Status[status] ?? Status.AVAILABLE
}

export const isDateValid = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
}