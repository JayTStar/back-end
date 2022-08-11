import {Request, Response} from "express";

import { UserData } from "../Repositories/userRepository.js";
import * as userServices from "../Services/userService.js";


export async function signup(req: Request, res: Response){
    const user: UserData = req.body;

    await userServices.signup(user);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response){
    const user: UserData = req.body;

    const token = await userServices.signin(user);

    res.send(token);
}