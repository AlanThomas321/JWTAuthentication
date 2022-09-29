const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    qualification:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:Number,
        required:true,
        min:6
    },
    About:{
        type:String,
        required:true
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
    sessionDate:{
        type:Date
        
    },
    unavailableDates:{
       type: [Date]
    },
    
},
{timestamps:true});

module.exports = mongoose.model('Admin',adminSchema);