import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectToDB } from "./config/db";
import AuthRoutes from './routes/authRoutes';
import HeroRoutes from './routes/heroRoutes';
import SkillsRoutes from './routes/skillsRoutes';
import ExperienceRouter from './routes/experienceRoutes';
import ProjectRouter from './routes/projectRoutes';
import path from "path";

const app = express();

dotenv.config();

const uploadsDir = path.join(process.cwd(), "uploads");
console.log("up", uploadsDir)
app.use('/uploads', express.static(uploadsDir))

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({origin:'http://localhost:5173'}));

// Connect to Database
connectToDB();

// Routers 
app.use('/api/auth', AuthRoutes);
app.use('/api/hero', HeroRoutes);
app.use('/api/skills', SkillsRoutes);
app.use('/api/experience', ExperienceRouter);
app.use('/api/projects', ProjectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server Running On Port ${PORT}`)
});
