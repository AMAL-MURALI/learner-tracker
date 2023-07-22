const mongoose=require('mongoose');
const dotenv=require('dotenv')
const connectDB= async()=>{
    try {
        //mongodb connection string
        dotenv.config({path:'./.env'})
        const con =await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
        
        console.log(`MongoDB connected:${con.connection.host}`);
    } catch (err) {
        console.log(err);
        
    }
}

module.exports=connectDB