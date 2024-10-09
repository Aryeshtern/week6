import { Request, Response } from "express";
import { getUserById} from "../services/userService";
export const getOneUserById = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const userId = req.params.userId;
        const user = getUserById(userId);
        res.status(200).send(user);
    }catch(err) {
         res.status(500).send(err);
    }
};