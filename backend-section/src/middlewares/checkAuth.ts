import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { TokenPayload } from "../types/jwt";
import { secretKey } from "../constants/envVariables";

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    /*JWT is send with request header! 
      Format of it: Authorization : Bearer <token>
    */

    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error();
    }


    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;


    req.user = decodedToken;

    next();
  }
  catch (err) {

    return res.status(401).send({ message: "Auth Failed " })

  }
}