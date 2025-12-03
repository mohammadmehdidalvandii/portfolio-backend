import mongoose from "mongoose";
import HeroModel from "../models/Hero";
import { HeroProps } from "../types/hero";

export const heroServices = {
    async createHero(data:HeroProps){
        const {name , title , bio , email , github , linkedin , image} = data;
        if(!name || !title || !bio || !email || !github || !linkedin || !image){
            throw new Error('All Felids required');
        };

        await HeroModel.deleteMany({});

        const hero = await HeroModel.create({
            name,
            title,
            bio,
            email,
            github,
            linkedin,
            image,
        });

        return  hero;
    },
    async heroGet(){
        const hero = await HeroModel.find({});
        return hero ;
    },
    async heroUpdate(id:string ,data:Partial<HeroProps>){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid user ID');
        };
        const HeroNew = await HeroModel.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        );
        return HeroNew
    }
}