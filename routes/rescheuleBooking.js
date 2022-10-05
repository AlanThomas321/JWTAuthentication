// import express from "express";
const express = require("express")
const RescheuleBooking = require ('../model/RescheuleBooking')
// import RescheuleBooking from '../model/RescheuleBooking.js';


const router = express.Router();

// create booking
router.post("/",  async(req,res)=>{
   
const newRescheuleBooking= new RescheuleBooking(req.body)
    try{
const savedRescheuleBooking =await newRescheuleBooking.save()
res.status(200).json(savedRescheuleBooking)
   } 
   catch(err){
    res.status(500).json(err)
   }
});



// update booking
router.put("/:id",  async(req,res)=>{
   
    
        try{
            const updateRescheuleBooking= await  RescheuleBooking.findByIdAndUpdate(req.params.id,
                {$set: req.body},
                {new:true})

    res.status(200).json(updateRescheuleBooking);
       } 
       catch(err){
        res.status(500).json(err)
       }
    });
    



// Retrieve reschdule from the database.
router.get("/find/:id",  async(req,res ,next)=>{
// export const getHotel = async (req, res, next) => {
    try {
      const selectRescheuleBooking = await RescheuleBooking.findById(req.params.id);
      res.status(200).json(selectRescheuleBooking);
    } catch (err) {
      next(err);
    }
  });


//list all reshedule datails


router.get("/all",  async(req,res ,next)=>{
    try {
      const selectallRescheuleBooking = await RescheuleBooking.find(req.body)
      res.status(200).json(selectallRescheuleBooking);
    } catch (err) {
      next(err);
    }
  });




// router.get("/",(req,res)=>{
//     res.send("hello ,this is wwwauth end point")
// })
module.exports = router;