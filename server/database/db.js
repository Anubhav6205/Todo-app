const mongoose=require("mongoose");
const dotenv=require('dotenv')
dotenv.config();
MONGO_URI=process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Mongoose connection successful")
}).catch((error)=>{
    console.log(`Error encountered: ${error}`)
})

