import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
});

const SkillModel = mongoose.model('Skills', skillsSchema);

export default SkillModel;