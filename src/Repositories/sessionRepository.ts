import { Sessions } from "@prisma/client";
import { prisma } from "../config/db.js";

type CreateSessionData = Omit<Sessions, "id">

export async function create(sessionData: CreateSessionData){
    await prisma.sessions.create({
        data: sessionData
    })
}

export async function get(token: string){
    const session = prisma.sessions.findFirst({
        where: {token}
    });
    return session;
}