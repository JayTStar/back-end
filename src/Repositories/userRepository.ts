import { Users } from "@prisma/client";
import { prisma } from "../config/db.js";

export type UserData = Omit<Users, "id">;

export async function create(userData: UserData) {
    await prisma.users.create({
        data: userData,
    });
}

export async function getByMatricula(matricula:string){
    const user = await prisma.users.findFirst({where: {matricula}});

    return user;
}