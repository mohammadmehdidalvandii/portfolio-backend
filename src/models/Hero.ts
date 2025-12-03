import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    github:{
        type:String,
        required:true,
    },
    linkedin:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
});

const HeroModel = mongoose.model('Hero' , heroSchema);

export default HeroModel;