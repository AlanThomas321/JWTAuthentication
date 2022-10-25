const router = require("express").Router();
const { check, validationResult } = require("express-validator")
// const {users} = require("../db")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const fs = require('fs')
const user = require('../model/User');
const multer = require("multer");

// vaidation

const Joi = require("@hapi/joi");

const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
});
const upload = multer({storage:Storage}).single('testImage');
const schema = {
    name: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
};


router.post('/register',[
    check("email","Please provide a valid E-Mail")
    .isEmail(),
    check("password","Password should be of greater than 5 characters")
    .isLength({
        min:6
    })
] ,async(req,res) =>{

    // validate data
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
    return res.status(400)
    .json({
        errors:errors.array()
    })
   }
    // check if user exist
    const emailExist = await user.findOne({email: req.body.email});
    if(emailExist) return res.send("E-Mail al-ready exist");
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // create new user
    const per = new user({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        date:req.body.date
    });
    try {
        const savedUser = await per.save();
        res.send({person_id: per._id});
    } catch (err) {
        res.status(400).send(err);
    }
});


// login
router.post('/Logins',
[
    check("email","Please provide a valid E-Mail")
    .isEmail(),
    check("password","Password should be of greater than 5 characters")
    .isLength({
        min:6
    })
], async (req,res)=>{
    // validate data before login
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
    return res.status(400)
    .json({
        errors:errors.array()
    })
   }
//    check if user in database
const users = await user.findOne({email: req.body.email});
    if(!users) return res.send("User does not exist");
    // password correct
    const validPass = await bcrypt.compare(req.body.password, users.password);
    if(!validPass) return res.status(400).send("Invalid Password")

    // create token
    const maxAge = 3*24*60*60;
    const token = JWT.sign({_id: users._id},"secretCode",{expiresIn: maxAge});
    res.cookie('jwt',token,{maxAge:maxAge*1000});
    res.header('auth-token',token).send(token);
   

    
})

// edit details
router.post('/editUser/:id',
[
    check("email","Please provide a valid E-Mail")
    .isEmail(),
    check("password","Password should be of greater than 5 characters")
    .isLength({
        min:6
    })
], async(req,res) =>{
    let id = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword
    },(err,result) =>{
        if (err) {
            res.json(err)  
        } else {
            res.send(" User updated successfully")
        }
    })
});


router.get('/Logout',(req,res) =>{
    // res.cookie('jwt','',{maxAge:1})
    // res.send("user logged out")
    res.cookie('jwt','',{maxAge:1});
    res.send("User Logged out")
})


// storage
const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file, cb) =>{
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')

// upload screenshot
router.post('/upload/:id',(req,res) =>{
    upload(req,res,(err) =>{
        if (err) {
            console.log(err)
        } else {
            let id = req.params.id;
            user.findByIdAndUpdate(id,{
                image:{
                    data:req.file.filename,
                    contentType: "image/png",
                }
            },(err,result) =>{
                if (err) {
                    res.json(err)
                } else {
                    res.send("image uploaded successfully")
                }
            })
        }
    })
})

//User detail fetch
  
router.get("/find/:id",  async(req,res ,next)=>{
  
        try {
          const findUser = await user.findById(req.params.id);
          res.status(200).json(findUser);
        } catch (err) {
          next(err);
        }
      });
//update user

// router.put("/:id",  async(req,res)=>{
    
//     try{
//         const updateUserdetails= await  Consultantdetails.findByIdAndUpdate(req.params.id,
//             {$set: req.body},
//             {new:true})

// res.status(200).json(updateConsultantdetails);
//    } 
//    catch(err){
//     res.status(500).json(err)
//    }
// });

router.put("/update/:id",async(req,res)=>{
    // let upid = req.params.id;
    // let upname = req.body.name;
    // let upemail = req.body.email;
    try{
        const userDetails = await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        
         res.status(200).json(userDetails);
            } 
           catch(err){
           res.status(500).json(err)
            }
   
    });

 //filter
 
router.get('/search/:key',async(req,res) => {
    let categ = await Consultantdetails.find(
        {
            "$or":[
                {cateogory:{$regex:req.params.key}}
            ]
        }
    )
    res.send(categ)
})


router.post('/image/upload',(req,res) => {
    upload(req,res,(err) => {
       if(err){
           console.log(err)
       }
       else{
           const newImage = new user({
               image:{
                   data:req.file.filename,
                   contentType:('image/png' || 'image/jpg' || 'image/jpeg')
               }
           })
           newImage.save()
           .then(() => res.send('successfully uploaded'))
           .catch(err => console.log(err))
       }
    })
})


//find one image
router.get('/image/find/:id',async (req, res) => { 
   try {
       const findImage = await user.findById(req.params.id);
       res.status(200).json(findImage);
     } catch (err) {
       next(err);
     }
  
});



 


module.exports = router