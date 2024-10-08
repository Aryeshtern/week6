import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface authRequest extends Request {
    user: any;
}

// Middleware to verify JWT token

export const authenticateToken = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                res.status(403).json({ message: 'Invalid token.' });
                return;
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided.' });
        return;
    }
};