import { experienceServices } from "../services/experienceServices";
import { ExperienceProps } from "../types/experience";
import { Req, Res } from "../types/express";

export const experienceController = {
    async create(req:Req , res:Res){
        try{
            const data = req.body;

            const experience = await experienceServices.createExperience(data);
            res.status(201).json({
                message:'Created new experience successfully',
                statusCode:201,
                data:experience,
            })

        }catch(error:any){
            return res.status(400).json({
                message:error.message,
                statusCode:400,
                error:error.message,
            })
        }
    },
    async get(req:Req , res:Res){
        try{
            const experiences = await experienceServices.getExperience();
            if(!experiences){
                return res.status(404).json({
                    message:'Not found Experience',
                    statusCode:404,
                });
            };

            return res.status(200).json({
                message:'Get all experiences successfully',
                statusCode:200,
                data:experiences,
            });

        }catch(error:any){
            return res.status(500).json({
                message:'Server Internal Error',
                statusCode:500,
                error:error.message
            })
        }
    },
    async update(req:Req , res:Res){
        try{
            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    message:"ID is required",
                    statusCode:400,
                });
            };

            const updateData:Partial<ExperienceProps> = {};

            const allowedFields:(keyof ExperienceProps)[] = ['jobTitle' , 'company' ,'period' , 'description'];
            for(const key of allowedFields){
                if(req.body[key] !== undefined){
                    updateData[key] = req.body[key];
                }
            };


            const experienceUpdate = await experienceServices.updateExperience(id , updateData);

            res.status(200).json({
                message:"Updated successfully experience",
                statusCode:200,
                data:experienceUpdate,
            })

        }catch(error:any){
            return res.status(500).json({
                message:'Server Internal Error',
                statusCode:500,
                error:error.message
            })
        }
    },
    async delete(req:Req , res:Res){
        try{
            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    message:"ID is required",
                    statusCode:400,
                });
            };

            const deleteExperience = await experienceServices.deleteExperience(id);
            res.status(204).json({
                message:'Deleted Experience successfully',
                statusCode:204,
                data:deleteExperience,
            })

        }catch(error:any){
            return res.status(500).json({
                message:'Server Internal Error',
                statusCode:500,
                error:error.message
            })
        }
    }
}