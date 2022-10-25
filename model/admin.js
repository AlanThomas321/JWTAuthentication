// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         min:6,
//         max:255
//     },
//     qualification:{
//         type:String,
//         required:true
//     },
//     ContactNumber:{
//         type:Number,
//         required:true,
//         min:6
//     },
//     About:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         min:6,
//         max:255
//     },
//     password:{
//         type:String,
//         required:true,
//         min:6,
//         max:1024
//     },
//     sessionDate:{
//         type:Date
        
//     },
//     unavailableDates:{
//        type: [Date]
//     },
    
// },
// {timestamps:true});

// module.exports = mongoose.model('Admin',adminSchema);


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
    cateogory: {
        type: String,
        required: true,
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




