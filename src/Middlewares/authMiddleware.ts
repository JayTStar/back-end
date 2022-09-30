import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Sessions } from "@prisma/client";

import * as sessionRepository from "../repositories/sessionRepository.js";
import * as userRepository from "../repositories/userRepository.js";

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction){
    const authorization: string = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "").trim();

    try {
        const secret = process.env.JWT_SECRET_KEY;
        const tokenData = jwt.verify(token, secret);
        const session: Sessions = await sessionRepository.get(token);

        if (!token || !session || !tokenData) {
            throwUnauthorizedError();
        }

        await checkUserExists(tokenData);

        res.locals.tokenData = tokenData;
        next();
    } catch {
        throwUnauthorizedError();
    }
}

async function checkUserExists(tokenData) {
    const { userId } = tokenData;
    const user = await userRepository.getById(userId);

    if (!user) {
        throw {
            type: "notFound",
            message: "User not found",
        };
    }
}

function throwUnauthorizedError() {
    throw {
        type: "unauthorized",
        message: "Invalid token",
    };
}