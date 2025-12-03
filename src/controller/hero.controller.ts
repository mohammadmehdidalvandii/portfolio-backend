import { heroServices } from "../services/HeroServices";
import { Req, Res } from "../types/express";
import { HeroProps } from "../types/hero";


export const heroController = {
    async create(req:Req , res:Res){
        try{
        const {name , title , email , bio , github , linkedin} = req.body;
        
        let image:string ='';
        if(req.file){
            image = `http://localhost:3000/uploads/${req.file.filename}`;
        }else{
            image = '';
        };

        console.log('img', image)

        const hero = await heroServices.createHero({
            name,
            title,
            email,
            bio,
            github,
            linkedin,
            image
        });

        res.status(201).json({
            message:'Created new Hero successfully',
            statusCode:201,
            data:hero
        });
        }catch(error:any){
            res.status(401).json({
                message:error.message,
                statusCode:401,
                error:error.message,
            })
        }
    },
    async getHero(req:Req, res:Res){
        try{
            const hero = await heroServices.heroGet();
            if(!hero){
                return res.status(404).json({
                    message:'Hero not found',
                    statusCode:404,
                })
            }

            res.status(200).json({
                message:"Hero get successfully",
                statusCode:200,
                data:hero,
            });
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal Error ",
                statusCode:500,
                error:error.message,
            })
        }
    },
    async updateHero(req:Req , res:Res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    message:'ID is not found',
                    statusCode:400,
                });
            };

            const updateData:Partial<HeroProps> = {};
            if(req.file){
                updateData.image = `http://localhost:3000/uploads/${req.file.filename}`;
            };

            const allowedFields : (keyof HeroProps)[] = ['name','title','bio','github','email','linkedin'];
            for(const key of allowedFields){
                if(req.body[key] !==undefined){
                    updateData[key] = req.body[key]
                }
            };

            const hero = await heroServices.heroUpdate(id , updateData);

            res.status(200).json({
                message:'hero section updated successfully',
                statusCode:200,
                data:hero,
            });

        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Error",
                statusCode:500,
                error:error.message,
            })
        }
    }
}