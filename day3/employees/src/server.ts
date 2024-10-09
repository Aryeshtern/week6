import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase} from './services/database';
import AuthRouter from './routes/authRouter';
import userRouter from './routes/userrouter'


dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/employees', AuthRouter)

app.use('/employees', userRouter)

connectToDatabase();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

