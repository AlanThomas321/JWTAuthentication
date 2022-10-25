const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        min:6,
        max:255,
        required:true,
    },
    email:{
        type:String, 
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String, 
        required:true,
        min:6,
        max:1024
    },
    about:{
        type:String
    },
    ContactNumber:{
        type:Number, 
        min:6
    },
    date:{
        type:Date
        
    },
    image:{
        data:Buffer,
        contentType:String
    }

   
});

module.exports = mongoose.model('User',userSchema);