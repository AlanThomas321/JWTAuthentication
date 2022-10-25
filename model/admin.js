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
        
    },
    cateogory: {
        type: String,
        
      },
      experience: {
        type: Number,
        min: 0,
        max: 100,
      },
    About: {
        type: [String],
      },
    ContactNumber:{
        type:Number,
        
        min:6
    },
   
    // image:{
    //     data:Buffer,
    //     contentType:String,
  
    //    },
  
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
