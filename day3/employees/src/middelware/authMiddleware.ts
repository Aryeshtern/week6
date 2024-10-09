import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface authRequest extends Request {
    user?: { userId: string, userRole: 'Employee' | 'Administrator'};
}

export const authenticateToken = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(401).json({ message: 'No token provided.' });
        return;
    }
    try{
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded:any) => {
            req.user = decoded;
        });
        next();
    }catch{
        res.status(403).json({ message: 'Invalid token.' });
        return;
    }
        
};

export const checkTokenIfAdmin = async (req: authRequest, res: Response, next: NextFunction) : Promise<void>=> {
    if(!req.user || req.user.userRole !== 'Administrator'){
        res.status(403).json({ message: 'Unauthorized access.' });
        return;
    }
    next();
}