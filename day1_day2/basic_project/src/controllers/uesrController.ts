import { Response, Request } from "express";
import jsonwebtoken  from 'jsonwebtoken';
import User from '../models/User'
import bcrypt from 'bcrypt'; 

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log("user registration");
        const { userName, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch(err) {
        console.error(err);
    }
}

