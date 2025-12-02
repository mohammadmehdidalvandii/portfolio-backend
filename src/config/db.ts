import mongoose  from 'mongoose';

const database = process.env.URL || 'mongodb://localhost:27017/portfolio';

const connectToDB = async ()=>{
    try{
        if(mongoose.connections[0].readyState){
            console.log("Using database connection");
            return true
        }
        const connection = await mongoose.connect(database);
        if(connection){
            console.log("Connect to DB successfully ✅");
            return true
        }

    }catch(error){
        console.log("Database connection error=>", error);
        process.exit(1)
    }
};


export {connectToDB}