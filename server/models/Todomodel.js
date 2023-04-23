const mongoose=require("mongoose");

const todoschema=new mongoose.Schema({
    statement:{
        type:String,
        required:true,

    }
})

const model=mongoose.model("todo",todoschema);
module.exports=model;