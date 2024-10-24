import { Request, Response, NextFunction } from "express";
import { Message, User, UserSession } from "../models";
import jwt from 'jsonwebtoken';
import { TokenPayload } from "../types/jwt";
import { secretKey } from "../constants/envVariables";
import { IUser } from "../interfaces/IUser";
import { CustomError } from "../helpers/errorHelpers";
import { IUserSession } from "../interfaces/IUserSession";
import { MessageOwner } from "../enums/MessageOwner";


export async function register(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user: IUser | null = await User.findOne({ username, password })
    if (user) {
        throw new CustomError(`User with ${username} already exists!`, 400)
    }
    else {
        const newUser: IUser = await User.create({ username, password })

        const newUserSession: IUserSession = await UserSession.create({ userId: newUser.id })

        await Message.create({
            content: "Welcome! I am your chatbot. You can ask me anything.",
            userSessionId: newUserSession.id,
            owner: MessageOwner.ChatBot
        })

        let payload: TokenPayload = { id: newUser.id, username: newUser.username }
        const token: string = jwt.sign(payload, secretKey)
        return res.json({ token: token, message: "Successfull Register" })
    }

}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        let payload: TokenPayload = { id: user.id, username: user.username }

        if (!process.env.SECRET_KEY) {
            throw new Error();
        }


        const token: string = jwt.sign(payload, secretKey)
        return res.json({ token: token, message: "Successfull Login" })
    }
    else {
        throw new CustomError(`Invalid Credentials!`, 401)

    }

}
export async function silenceLogin(req: Request, res: Response, next: NextFunction) {
    try {
        /*JWT is send with request header! 
          Format of it: Authorization : Bearer <token>
        */


        const token: string | undefined = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error();
        }


        const decodedToken = jwt.verify(token, secretKey);

        return res.status(200).json({ decodedToken: decodedToken })
    }
    catch (err) {
        // console.log(req.path)
        return res.status(401).send("Unauthorized")



    }

}
