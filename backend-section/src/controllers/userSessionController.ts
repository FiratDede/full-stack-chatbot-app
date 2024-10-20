import { Message, UserSession } from "../models";
import { IUserSession } from "../interfaces/IUserSession";
import { NextFunction, Request, Response } from "express";
import { MessageOwner } from "../enums/MessageOwner";

export async function getUserSession(req: Request, res: Response, next: NextFunction) {
    const userId: String | undefined = req.user?.id
    const id = req.query.id

    let userSession: IUserSession | null = await UserSession.findOne({_id:id, userId });
    return res.json(userSession);

}
export async function getUserSessionAll(req: Request, res: Response, next: NextFunction) {

    const userId: String | undefined = req.user?.id
    let userSessions: Array<IUserSession> | undefined = await UserSession.find({ userId },).sort({ startedAt: -1 });

    return res.json(userSessions);


}

export async function getAllUserSessionIds(req: Request, res: Response, next: NextFunction) {

    const userId: String | undefined = req.user?.id
    let userSessionIds= await UserSession.find({ userId },"_id").sort({ startedAt: -1 });
    let userSessionIdsNewForm = userSessionIds.map(userSessionId => userSessionId._id)

    return res.json(userSessionIdsNewForm);


}

export async function createUserSession(req: Request, res: Response, next: NextFunction) {
    const userId: String | undefined = req.user?.id

    const newUserSession = await UserSession.create({userId: userId})

    const newMessage = await Message.create({content: "Welcome! I am your chatbot. You can ask me anything.",
        userSessionId: newUserSession.id,
        owner: MessageOwner.ChatBot
    })
    
    
    return res.send(newUserSession)

}
