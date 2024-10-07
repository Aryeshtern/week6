import express from "express";
import connectToMongo from "./DAL/db";
import dotenv from 'dotenv';
import {errorHandler} from './middelware/errorMiddleware'
import User from './models/User'
import Router from './routers/userRouter'

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToMongo();

app.use(errorHandler)

app.get('/', (req, res) => {
    console.log(User.find({username: "dgg"}))
    res.send('Hello, World!')
})

app.use('', Router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
