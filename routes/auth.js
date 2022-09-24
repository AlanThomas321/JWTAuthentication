const router = require("express").Router();
const { check, validationResult } = require("express-validator")
// const {users} = require("../db")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const fs = require('fs')
const user = require('../model/User');

// vaidation

const Joi = require("@hapi/joi");

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
        password:hashedPassword
    });
    try {
        const savedUser = await per.save();
        res.send({person_id: per._id});
    } catch (err) {
        res.status(400).send(err);
    }
});
// cookie login
router.post('cLogin',(req,res) =>{

})

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
    const maxAge = 3*2460*60;
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


// old one





module.exports = router