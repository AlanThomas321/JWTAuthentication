const router = require("express").Router();
const admin = require('../model/admin');
const user =require('../model/User')

// Retrieve Consultantadmin panel
router.get("/findconsultant/:id",  async(req,res ,next)=>{
    
        try {
          const findconsultant = await admin.findById(req.params.id);
          res.status(200).json(findconsultant);
        } catch (err) {
          next(err);
        }
      });
      // Retrieve useradmin panel
router.get("/finduser/:id",  async(req,res ,next)=>{
    
    try {
      const finduser = await user.findById(req.params.id);
      res.status(200).json(finduser);
    } catch (err) {
      next(err);
    }
  });


  //list all consultant datails


router.get("/allconsultant",  async(req,res ,next)=>{
    try {
      const allconsultant = await admin.find(req.body)
      res.status(200).json(allconsultant);
    } catch (err) {
      next(err);
    }
  });

  //list all user details


router.get("/alluser",  async(req,res ,next)=>{
    try {
      const alluser = await user.find(req.body)
      res.status(200).json(alluser);
    } catch (err) {
      next(err);
    }
  });


        // Retrieve useradmin panel
router.delete("/deleteuser/:id",  async(req,res ,next)=>{
    
    try {
      const finduser = await user.findByIdAndDelete(req.params.id);
      res.status(200).send({message:"delet user"});
    } catch (err) {
      next(err);
    }
  });
  // Retrieve admin panel
  router.delete("/deleteconsultant/:id",  async(req,res ,next)=>{
    
    try {
      const findadmin = await user.findByIdAndDelete(req.params.id);
      res.status(200).send({message:"delet admin"});
    } catch (err) {
      next(err);
    }
  });



      module.exports = router;
    
    