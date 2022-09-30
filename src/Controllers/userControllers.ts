import {Request, Response} from "express";

import { UserData } from "../Repositories/userRepository.js";
import * as userServices from "../Services/userService.js";


export async function signup(req: Request, res: Response){
    const user: UserData = req.body;

    const userid : number = res.locals.tokenData.userId;

    const userInfo = await userServices.getUserInfo(userid);

    if(userInfo.cargo.nome != "lider" && userInfo.cargo.nome != "capitao"){
        throw {
            type: "unauthorized",
            message: "Unauthorised request",
        };
    }
    else{
        const userUpdate = await userServices.signup(user);

        res.send(userUpdate);
    }
}

export async function signin(req: Request, res: Response){
    const user: UserData = req.body;

    const token = await userServices.signin(user);

    res.send(token);
}

export async function getUserInfo(req: Request, res: Response) {

    let id : number;

    if(req.params.id){
        id = parseInt(req.params.id);
    }
    else{
        id = res.locals.tokenData.userId;
    }

    const userInfo = await userServices.getUserInfo(id);

    res.send(userInfo);
}

export async function getMembros(req:Request, res: Response){
    const membros = await userServices.getMembros()

    res.send(membros);
}

export async function getCargos(req: Request, res: Response){
    const cargos = await userServices.getCargos();

    res.send(cargos);
}

export async function getCategorias(req: Request, res: Response){
    const categorias = await userServices.getCategorias();

    res.send(categorias);
}

export async function editUser(req: Request, res: Response) {
    const userid : number = res.locals.tokenData.userId;

    const editId : number = parseInt(req.params.id);
    const data = req.body;

    const userInfo = await userServices.getUserInfo(userid);

    if(userInfo.cargo.nome != "lider" && userInfo.cargo.nome != "capitao"){
        throw {
            type: "unauthorized",
            message: "Unauthorised request",
        };
    }
    else{
        const userUpdate = await userServices.editUser(editId, data);

        res.send(userUpdate);
    }
}

export async function deleteUser(req: Request, res: Response){
    const id : number = parseInt(req.params.id);

    const userDelete = await userServices.deleteUser(id)
}