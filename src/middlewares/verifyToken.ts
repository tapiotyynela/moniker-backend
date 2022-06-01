import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { RequestWithUser } from "../types/request";

export const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            const jwtSecretKey = process.env.JWT_SECRET_KEY as string
            // token = token.trim();            
            const decoded = jwt.verify(token, jwtSecretKey)
            if (decoded) {
                req.user = decoded;    
            }
            next();
        } catch (error) { 
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(400).json({ error: 'Authorization header is missing.' })
    }
}