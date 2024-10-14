import { ObjectId, Query } from "mongoose";
import UserSession, { IUserSession } from "../models/UserSession";
import questions from "../constants/questions";


import { NextFunction, Request, Response } from "express";

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
    
    
    return res.send(newUserSession.id)

}
export async function createQuestionAndSavePreviousAnswer(req: Request, res: Response, next: NextFunction) {
    const userId: String | undefined = req.user?.id
    const { answer, userSessionId } = req.body;
    let userSession: IUserSession | null = await UserSession.findOne({_id:userSessionId, userId: userId})
    if(userSession){
        let formattedAnswer = {kind: "Answer",content: answer}
        let newQuestion = {kind: "Question", content: questions[Math.ceil(userSession.questionsAndAnswers.length / 2 )]}
        userSession.questionsAndAnswers.push(formattedAnswer)
        userSession.questionsAndAnswers.push(newQuestion)

      

       await userSession.save();


       return res.json({newQuestion,formattedAnswer});
        
    }
    else{
        throw Error("Error!")
    }



    

}