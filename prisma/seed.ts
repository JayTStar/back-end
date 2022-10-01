import { prisma } from "../src/config/db";
import { encryptPassword } from "../src/Utils/userUtils"

async function main(){
    await cargosSeed();
    await categoriasSeed();
    await adminUser();
}

async function cargosSeed(){
    const membro = await prisma.cargos.upsert({
        where: { id: 0, },
        update: {},
        create: { id: 0, nome: "Membro"}
    });

    const capitao = await prisma.cargos.upsert({
        where: { id: 1, },
        update: {},
        create: { id: 1, nome: "Capitão"}
    });

    const lider = await prisma.cargos.upsert({
        where: { id: 2, },
        update: {},
        create: { id: 2, nome: "Lider"}
    });

    const admin = await prisma.cargos.upsert({
        where: { id: 3, },
        update: {},
        create: { id: 3, nome: "Admin"}
    });

}

async function categoriasSeed(){
    const sumo = await prisma.categorias.upsert({
        where: { id: 0, },
        update: {},
        create: { id: 0, nome: "Sumô"}
    });

    const combate = await prisma.categorias.upsert({
        where: { id: 1, },
        update: {},
        create: { id: 1, nome: "Combate"}
    });

    const mini = await prisma.categorias.upsert({
        where: { id: 2, },
        update: {},
        create: { id: 2, nome: "Mini Sumô"}
    });

    const seguidor = await prisma.categorias.upsert({
        where: { id: 3, },
        update: {},
        create: { id: 3, nome: "Seguidor de Linha"}
    });
}

async function adminUser(){

    const senha = encryptPassword("admin");

    const admin = await prisma.users.upsert({
        where: { matricula : "000000"},
        update: {},
        create: {
            matricula: "000000",
            senha: senha,
            nome: null,
            idCargo: null,
            idCategoria: null,
            telefone: null,
            aniversario: null
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })