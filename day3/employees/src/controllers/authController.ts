import { Request, Response } from "express";
import User from '../models/User';
import { createUser} from '../services/userService';
import { generateToken} from "../utils/auth";

export const register = async (req: Request, res: Response): Promise<void> => {
    const{ userName, password, role, yearsOfExperience, startDate, salary, age, departmentId} =  req.body;
    try{
        const user = await createUser({userName, password, role, yearsOfExperience, startDate, salary, age}, departmentId);
        res.status(201).send({message: 'user registration successful', data: user})
    }catch(err) {
        res.status(400).json({ error: err });
    }
}

export const login = async (req: Request, res: Response) : Promise<void>=> {

    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
    
        if (!user ||!(await user.comparePassword(password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = generateToken(user._id as string, user.role);
        user.lastLogin = new Date();
        await user.save();
        res.json({ message: 'Logged in successfully', token });
    }catch{
        res.status(500).json({ message: 'Server error' });
    }

}
