import mongoose from "mongoose";
import ProjectsModel from "../models/Projects";
import { ProjectsProps } from "../types/project";

export const projectServices = {
    async createProject(data:ProjectsProps){
        const {title , description , tech , live , image , github} = data;
        if(!title || !description || !tech || !live || !image || !github){
            throw new Error('All felids required')
        };

        const project = await ProjectsModel.create({
            title,
            description,
            tech,
            live,
            image,
            github
        });
        return project
    },
    async getProjects(){
        const projects = await ProjectsModel.find({}).sort({createAt:-1});
        return projects;
    },
    async updateProject(id:string , data:Partial<ProjectsProps>){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid project id')
        };
        const project = await ProjectsModel.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        );

        return project
    }
}