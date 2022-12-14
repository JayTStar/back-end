import dotenv from "dotenv";

import * as userRepository from "../Repositories/userRepository";
import * as userUtils from "../Utils/userUtils";
import * as sessionRepository from "../Repositories/sessionRepository";

dotenv.config();

export async function signup(userData: userRepository.UserData, id: number){
    const {matricula, senha, nome, idCargo, idCategoria, telefone, aniversario} = userData;

    const userInfo = await getUserInfo(id);

    if(userInfo.cargo.nome != "Capitão" && userInfo.cargo.nome != "Admin"){
        throw {
            type: "unauthorized",
            message: "Unauthorised request",
        };
    }

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

export async function getUserInfo(id: number){
    const info = await userRepository.getInfo(id);

    return {... info};
}

export async function getMembros(){
    const membros = await userRepository.getMembros()

    return membros
}

export async function getCargos() {
    const cargos = await userRepository.getCargos();

    return cargos;
}

export async function getCategorias(){
    const cargos = await userRepository.getCategorias();

    return cargos;
}

export async function editUser(editId: number, data: object, userid: number) {

    const userInfo = await getUserInfo(userid);

    if(userInfo.cargo.nome != "lider" && userInfo.cargo.nome != "capitao"){
        throw {
            type: "unauthorized",
            message: "Unauthorised request",
        };
    }
    const userUpdate = await userRepository.editUser(editId, data);

    return userUpdate
}

export async function deleteUser(id: number){
    const userDelete = await userRepository.userDelete(id);

    return userDelete
}