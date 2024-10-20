import { Request, Response, NextFunction } from "express";
import { Message, UserSession } from "../models";
import { IUserSession } from "../interfaces/IUserSession";
import { MessageOwner } from "../enums/MessageOwner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { apiKey } from "../constants/envVariables";
import { IMessage } from "../interfaces/IMessage";

export async function insertMessage(req: Request, res: Response, next: NextFunction) {
    const userId: String | undefined = req.user?.id
    const { userSessionId, question } = req.body;

    let userSession: IUserSession | null = await UserSession.findOne({ _id: userSessionId, userId });
    if (userSession === null) {
        res.status(400).send("User Session not found!")
        return;
    }
    if (userSession.userId.toString() !== userId) {
        res.status(400).send("User Session not belongs to appropriate user!")
        return;
    }

    await Message.create({ content: question, userSessionId, owner: MessageOwner.User })


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = question;

    const result = await model.generateContent(prompt);

    const answer: string = result.response.text();


    const newMessage: IMessage  = await Message.create({ content: answer, userSessionId, owner: MessageOwner.ChatBot, })

    
    // console.log(answer);
    res.status(200).send(newMessage);
    return;

}

export async function getAllMessages(req: Request, res: Response, next: NextFunction) {
    const userSessionId = req.query.userSessionId
    const userId: String | undefined = req.user?.id
    let userSession: IUserSession | null = await UserSession.findOne({ _id: userSessionId, userId });

    if (userSession === null) {
        res.status(400).send("User Session not found!")
        return;
    }
    if (userSession.userId.toString() !== userId) {
        res.status(400).send("User Session not belongs to appropriate user!")
        return;
    }

   const messages = await Message.find({userSessionId}).sort({createdAt: "asc"})

   res.status(200).json(messages);
   return;


}