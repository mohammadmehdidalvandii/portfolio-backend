import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tech:{
        type:[String],
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    live:{
        type:String,
        required:true,
    },
    github:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

const ProjectsModel = mongoose.model('Projects', projectsSchema);

export default  ProjectsModel;