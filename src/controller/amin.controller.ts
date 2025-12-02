import { adminServices } from "../services/adminServices";
import { Req, Res } from "../types/express";

export const adminController = {
    async register(req:Req , res:Res){
        try{
            const data = req.body;
            const newAdmin = await adminServices.createAdmin(data);
            res.status(201).json({
                message:'Created Admin successfully',
                statusCode:201,
                data:[newAdmin],
            })
        }catch(error:any){
            res.status(400).json({
                message:error.message,
                statusCode:400,
            })
        }
    },
    async login(req:Req , res:Res){
        try{
            const {email , password} = req.body;
            const token = await adminServices.loginAdmin({email, password});

            res.cookie('token', token,{
                httpOnly:true,
                sameSite:'none',
                secure:true,
                path:'/',
                maxAge: 60 * 60 * 1000,
            });

            res.status(200).json({
                message:"Login successfully ✅",
                statusCode:200,
                data:{token}
            })

        }catch(error:any){
            res.status(401).json({
                message:"Invalid email or password",
                statusCode:401,
            })
        }
    }
}