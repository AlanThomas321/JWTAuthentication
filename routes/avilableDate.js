const router = require("express").Router();
const admin = require('../model/admin');

//Admin available  date
router.post('/book/:id',async (req,res) =>{
    let id = req.params.id;

    // const unavailableDates = await admin.findById(id)
    // console.log(unavailableDates)

    const unavailable = await admin.exists({unavailableDates:req.body.sessionDate})
    console.log(unavailable)

    admin.findByIdAndUpdate(id,{
        sessionDate: req.body.sessionDate
    },(err,result) =>{
        if (err) {
            res.json(err)  
        } else {
            res.send(" Session Booked Successfully")
        }
    }
    )
})


// Retrieve reschdule from the database.
router.get("/find/:id",  async(req,res ,next)=>{
    
        try {
          const selectconsultantbyid = await admin.findById(req.params.id);
          res.status(200).json(selectconsultantbyid);
        } catch (err) {
          next(err);
        }
      });


      

module.exports = router