import { Request, Response } from "express";
import { getUserById, getAllUsers} from "../services/userService";
import mongoose from "mongoose";
export const getOneUserById = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const userId = req.params.id;
        const user = await getUserById(userId);
        console.log(user);
        res.status(200).json(user);
    }catch(err) {
         res.status(500).send(err);
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(err) {
         res.status(500).send(err);
    }
};