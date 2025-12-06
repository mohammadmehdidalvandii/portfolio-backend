import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    period:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const ExperienceModel = mongoose.model('Experience', experienceSchema);

export default ExperienceModel