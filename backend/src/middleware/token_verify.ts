import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';

export const tokenAccess = async (req: Request,res: Response,next: NextFunction)=>{
    
    const token = req.header("Authorization")
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

    if(!token) return res.sendStatus(401)
    
        jwt.verify(token,JWT_SECRET,(err,user)=>{
            if(err) return res.sendStatus(403)
                req.body.user = user
            next()
        })
}