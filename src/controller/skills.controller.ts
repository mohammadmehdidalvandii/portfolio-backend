import { skillServices } from "../services/SkillServices";
import { Req, Res } from "../types/express";
import { SkillProps } from "../types/skills";

export const skillsController = {
    async  create(req:Req , res:Res){
        try{
            const data = req.body;

            const skill = await skillServices.createSkill(data);

            res.status(201).json({
                message:"Created skill successfully",
                statusCode:201,
                data:skill,
            });

        }catch(error:any){
            return res.status(400).json({
                message:error.message,
                statusCode:400,
                error:error.message,
            })
        }
    },
    async get(req:Req ,res:Res){
        try{
            const skills = await skillServices.getSkills();
            if(!skills){
                return res.status(404).json({
                    message:'Not found skills',
                    statusCode:404,
                });
            };

            return res.status(200).json({
                message:'get all skills successfully',
                statusCode:200,
                data:skills,
            })
        }catch(error:any){
            return res.status(500).json({
                message:'Server Internal Error',
                statusCode:500,
                error:error.message
            })
        }
    },
    async update(req:Req, res:Res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    message:"Id is required",
                    statusCode:400,
                })
            };

            const updateData:Partial<SkillProps> = {};

            const allowedFields: (keyof SkillProps)[] =['name' ,'category'];
            for(const key of allowedFields){
                if(req.body[key] !== undefined){
                    updateData[key] = req.body[key];
                }
            };

            const skillUpdate = await skillServices.updateSkill(id , updateData);

            res.status(200).json({
                message:'Skill by id updated successfully',
                statusCode:200,
                data:skillUpdate,
            })


        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Error",
                statusCode:500,
                error:error.message,
            })
        }
    }
}