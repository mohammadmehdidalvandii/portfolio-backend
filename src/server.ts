import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectToDB } from "./config/db";
import AuthRoutes from './routes/authRoutes';

const app = express();

dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Connect to Database
connectToDB();

// Routers 
app.use('/api/auth', AuthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server Running On Port ${PORT}`)
});
