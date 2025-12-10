import mongoose from "mongoose";
import ExperienceModel from "../models/Experience";
import { ExperienceProps } from "../types/experience";

export const experienceServices = {
    async createExperience(data:ExperienceProps){
        const {jobTitle , company , period , description} = data;
        if(!jobTitle || !company || !period || !description){
            throw new Error('All felids are required')
        };

        const newExperience = await ExperienceModel.create({
            jobTitle,
            company,
            period,
            description,
        });

        return newExperience
    },
    async getExperience(){
        const experiences = await ExperienceModel.find({});
        return experiences
    },
    async updateExperience(id:string,data:Partial<ExperienceProps>){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid experience ID");
        }
        const experience = await ExperienceModel.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        )
        return experience
    },
    async deleteExperience(id:string){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid experience ID");
        }
        
        const experience = await ExperienceModel.findOneAndDelete({_id:id});
        return experience
    }
}