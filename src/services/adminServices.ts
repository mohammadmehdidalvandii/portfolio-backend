import AdminModel from "../models/Admin";
import { LoginProps, RegisterProps } from "../types/auth";
import { comparePassword, generateToken, hashedPassword } from "../utils/auth";

export const adminServices = {
    async createAdmin(data:RegisterProps){
        const {email , password } = data;
        if(!email || !password){
            throw new Error('Missing required Fields')
        }
        const existing = await AdminModel.findOne({email:email});
        if(existing) throw new Error('Admin exist already');

        // hashPassword
        const hashPassword = await hashedPassword(password);
        const admin = await AdminModel.create({
            email,
            password:hashPassword,
            role:'ADMIN'
        });

        return admin

    },
    async loginAdmin(data:LoginProps){
        const {email , password} = data;
        if(!email || !password){
            throw new Error('Password or Email not valid');
        };

        const admin = await AdminModel.findOne({email:email});
        if(!admin) throw new Error('Email not found');

        // compare password;
        const isPasswordValid = await comparePassword(password, admin.password);
        if(!isPasswordValid) throw new Error('Password or Email not valid');


        const token = generateToken({
            _id:admin._id,
            email:admin.email,
        });


        return token

    }
}