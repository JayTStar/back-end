import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import * as userRepository from "../Repositories/userRepository.js";
import * as userUtils from "../Utils/userUtils.js";
import * as sessionRepository from "../Repositories/sessionRepository.js";

dotenv.config();

export async function signup(userData: userRepository.UserData){
    const {matricula, senha, nome, idCargo, idCategoria, telefone, aniversario} = userData;

    await checkMatricula(matricula);

    const encryptedPassword = userUtils.encryptPassword(senha);

    await userRepository.create({ matricula, senha: encryptedPassword , nome, idCargo, idCategoria, telefone, aniversario});
}

export async function checkMatricula(matricula: string){
    const user = await userRepository.getByMatricula(matricula);

    if(user){
        throw{
            type: "conflict",
            message: "Aluno já cadastrado"
        };
    };
}

export async function signin(userData: userRepository.UserData){
    const user = await userRepository.getByMatricula(userData.matricula);

    if (!user || !userUtils.checkPassword(userData.senha, user.senha)) {
        throw {
            type: "unauthorized",
            message: "Matrícula ou senha invalidos",
        };
    };

    const token = userUtils.generateToken(user.id);

    await sessionRepository.create({ idUser: user.id, token });

    return token;
}