import mongoose from "mongoose";
import SkillModel from "../models/Skills";
import { SkillProps } from "../types/skills";


export const skillServices = {
    async createSkill(data:SkillProps){
        const {name , category} = data;
        if(!name || !category){
            throw new Error('All fields are required');
        }
        
        const existSkill = await SkillModel.findOne({name:name});
        if(existSkill){
            throw new Error('Skill is already');
        };

        const skill = await SkillModel.create({
            name,
            category
        });

        return skill
    },
    async getSkills(){
        const skills = await SkillModel.find({});
        return skills;
    },
    async updateSkill(id:string , data:Partial<SkillProps>){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid user ID');
        };

        const skill = await SkillModel.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        )
        
        return skill
    },
}