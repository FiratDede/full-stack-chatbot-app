import express, {Request,Response,NextFunction} from "express";
import User, { IUser } from "../models/User";
import jwt, {Secret} from 'jsonwebtoken';
import { TokenPayload } from "../types/jwt";
import UserSession from "../models/UserSession";


export async function register(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user = await User.create({username,password})

    if(user){
       await UserSession.create({userId: user.id})
    }


    const secretKey: Secret = process.env.SECRET_KEY || "try"

    let payload: TokenPayload={id: user.id,username: user.username}

    const token: string = jwt.sign(payload, secretKey)
    return res.json({token: token, message: "Successfull Register"})

    
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const {username,password} = req.body;
    const user = await User.findOne({username,password}); 
    if(user){
        let payload: TokenPayload={id: user.id,username: user.username}

        if(!process.env.SECRET_KEY){
            throw new Error();
          }

        const secretKey: Secret = process.env.SECRET_KEY || "try"
        
        const token: string = jwt.sign(payload, secretKey)
        return res.json({token: token, message: "Successfull Login"})
    }
    else{
        return res.status(401).json({message: "Unauthorized"});
    }
    
}
export async function silenceLogin(req: Request, res: Response, next: NextFunction) {
    try {
        /*JWT is send with request header! 
          Format of it: Authorization : Bearer <token>
        */
      if(!process.env.SECRET_KEY){
        throw new Error();
      }
    const secretKey: Secret = process.env.SECRET_KEY
    

    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    
    if(!token){
        throw new Error();
      }
    

    const decodedToken  =  jwt.verify(token, secretKey);

    return res.status(200).json({decodedToken: decodedToken})
    }
    catch(err){
        // console.log(req.path)
        return res.status(401).send("Unauthorized")

       

    }
    
}
