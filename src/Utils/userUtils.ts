import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, +process.env.SALT);
    return encryptedPassword;
}

export function checkPassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash)) {
        return false;
    }
    return true;
}

export function generateToken(userId: number) {
    const data = {
        userId,
    };
    const expirationTime = 60 * 60 * 24 * 7;
    const config = { expiresIn: expirationTime };
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(data, secretKey, config);
    return token;
}