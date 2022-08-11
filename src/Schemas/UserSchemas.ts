import joi from "joi";
import { Users } from "@prisma/client";

export const signupSchema = joi.object<Users>({
    matricula: joi.string().required(),
    senha: joi.string().required().min(6),
    nome: joi.string().required(),
    idCargo: joi.number(),
    idCategoria: joi.number().required(),
    telefone: joi.string().min(10).max(11).required(),
    aniversario: joi.date().required()
});

export const signinSchema = joi.object<Users>({
    matricula: joi.string().required(),
    senha: joi.string().required().min(6)
})