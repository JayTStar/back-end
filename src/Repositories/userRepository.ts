import { Users } from "@prisma/client";
import { prisma } from "../config/db";

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

export async function getById(id: number) {
    const user = await prisma.users.findUnique({
        where: { id },
    });

    return user;
}

export async function getInfo(id: number) {
    const userInfo = await prisma.users.findFirst({
        where: { id },
        include: {
            cargo: true,
            Categoria: true
        },
    });

    const excludePassword = exclude(userInfo, 'senha')

    return excludePassword;
}

export async function getMembros(){
    const membros = await prisma.users.findMany({
        select:{
            id: true,
            matricula:true,
            nome: true,
            cargo: true,
            Categoria: true,
            telefone: true,
            aniversario: true
        },
    });

    return membros;
}

function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user;
}

export async function getCargos() {
    const cargos = await prisma.cargos.findMany();

    return cargos;
}

export async function getCategorias(){
    const categorias = await prisma.categorias.findMany();

    return categorias;
}

export async function editUser(id:number, data) {
    console.log(id)
    const updateUser = await prisma.users.update({
        where:{ id: id},
        data:{
            nome: data.nome,
            matricula: data.matricula,
            idCargo: data.cargo,
            idCategoria: data.Categoria,
            telefone: data.telefone,
            aniversario: data.aniversario
        }
    })

    return updateUser
}

export async function userDelete(id: number){
    const userDelete = await prisma.users.delete({
        where:{
            id: id
        }
    });

    return userDelete;
}