const router = require("express").Router();
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const Consultantdetails = require('../model/admin')


// admin signup
router.post('/register',[
    check("email","Please provide valid E-Mail")
    .isEmail(),
    check("password","Password should be of greater than 5 characters")
    .isLength({
        min:6
    })
], async(req,res) =>{
      // validate data
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
       return res.status(400)
       .json({
           errors:errors.array()
       })
      }
       // check if user exist
       const emailExist = await admin.findOne({email: req.body.email});
       if(emailExist) return res.send("E-Mail al-ready exist");
       
       // hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);
       
       // create new user
       const Admin = new admin({
           name:req.body.name,
           email:req.body.email,
           password:hashedPassword,
           date:req.body.date
       });
       try {
           const savedUser = await Admin.save();
           res.send({person_id: Admin._id});
       } catch (err) {
           res.status(400).send(err);
       }
   
});


// login
router.post('/Login',
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
const Admin = await admin.findOne({email: req.body.email});
    if(!Admin) return res.send("User does not exist");
    // password correct
    const validPass = await bcrypt.compare(req.body.password, Admin.password);
    if(!validPass) return res.status(400).send("Invalid Password")

    // create token
    const maxAge = 3*24*60*60;
    const token = JWT.sign({_id: Admin._id},"secretCode",{expiresIn: maxAge});
    res.cookie('jwt_Admin',token,{maxAge:maxAge*1000});
    // res.header('auth-token',token).send(token).json({person_id:Admin._id});
    res.header('auth-token',token).send({person_id:Admin._id}); 
});

// add unavailable dates
router.post('/addDate/:id',
[
    check("provide valid Date")
    .isDate()
], async (req,res) =>{
    let id = req.params.id;
    
    admin.findByIdAndUpdate(id,{
        unavailableDates: req.body.unavailableDates
    },(err,result) =>{
        if (err) {
            res.json(err)  
        } else {
            res.send(" Date added successfully")
        }
    })
});

// logout
router.get('/Logout',(req,res) =>{
    res.cookie('jwt_Admin','',{maxAge:1});
    res.send("User Logged out")
})

router.put("/:id",  async(req,res)=>{
   
    
    try{
        const updateConsultantdetails= await  Consultantdetails.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true})

res.status(200).json(updateConsultantdetails);
   } 
   catch(err){
    res.status(500).json(err)
   }
});

module.exports = router