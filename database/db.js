const mongoose=require('mongoose')
require('dotenv').config()

const mongodb_connectString=process.env.MONGO_URI

const connectDB=async ()=>{
    try{

        await mongoose.connect(mongodb_connectString)
        console.log('Database connected')
    }catch(error){
        console.log('Database not connected',error)
        process.exit() // stops the app
    }
}

module.exports=connectDB