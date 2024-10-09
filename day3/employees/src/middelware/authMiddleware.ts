import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface authRequest extends Request {
    user?: { userId: string, role: 'Employee' | 'Administrator'};
}

export const authenticateToken = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(401).json({ message: 'No token provided.' });
        return;
    }
    try{
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (decoded: any) => {
        req.user = decoded;
        next();
        });
    }catch{
        res.status(403).json({ message: 'Invalid token.' });
        return;
    }
        
    
};