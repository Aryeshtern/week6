import { Response, Request } from "express";
import jsonwebtoken  from 'jsonwebtoken';
import User from '../models/User';
import Game from '../models/Game';
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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user || await bcrypt.compare(password, password)) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', token });
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const addGame = async (req: Request, res: Response): Promise<void> => {
    try{
        const { title, genre, releaseDate, publisher, tages , price} = req.body;
        const game = new Game({
            title,
            genre,
            price,
            releaseDate,
            publisher,
            tages,
        });
        await game.save();
        res.status(201).json({ message: 'Game added successfully' });
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

