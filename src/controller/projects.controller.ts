import { projectServices } from "../services/projectsServices";
import { Req, Res } from "../types/express";
import { ProjectsProps } from "../types/project";

export const projectsController = {
    async create(req:Req , res:Res){
        try{
            const {title , description , tech , live , github} = req.body;
             
            let image:string = '';
            if(req.file){
                image = `http://localhost:3000/uploads/${req.file.filename}`;
            }else{
                image = ''
            };

            const project =  await projectServices.createProject({
                title,
                description,
                tech,
                image,
                live,
                github
            })

            res.status(201).json({
                message:'created new projects successfully',
                statusCode:201,
                data:project,
            });

        }catch(error:any){
            res.status(401).json({
                message:error.message,
                statusCode:401,
                error:error.message
            })
        }
    },
    async get(req:Req , res:Res){
        try{
            const projects =  await projectServices.getProjects();

            if(!projects){
                return res.status(404).json({
                    message:'project not found',
                    statusCode:404,
                })
            };

            res.status(200).json({
                message:"get all projects successfully",
                statusCode:200,
                data:projects
            })
        }catch(error:any){
            res.status(500).json({
                message:'Server Internal Error',
                statusCode:500,
                error:error.message,
            })
        }
    },
    async update(req:Req , res:Res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    message:'ID is not found'
                });
            };

            const updateData:Partial<ProjectsProps> = {};

            if(req.file){
                updateData.image = `http://localhost:3000/uploads/${req.file.filename}`
            }

            const allowedFields: (keyof ProjectsProps)[] = ['title' , 'description' , 'tech' , 'image' ,'live' ,'github'];
            for(const key of allowedFields){
                if(req.body[key] !== undefined){
                    updateData[key] = req.body[key]
                }
            };


            const project = await projectServices.updateProject(id , updateData);

            res.status(200).json({
                message:"Updated project successfully",
                statusCode:200,
                data:project
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
            }

            const projectDelete = await projectServices.deleteProject(id);
            res.status(204).json({
                message:"Project deleted successfully",
                statusCode:204,
                data:projectDelete
            })

        }catch(error:any){
            return res.status(500).json({
                message:error.message,
                statusCode:500,
                error:error.message
            })
        }
    }
}