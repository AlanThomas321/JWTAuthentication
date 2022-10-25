
const express = require("express")
const Consultantdetails = require ('../model/admin');
const multer =require('multer');
const consultantimage =require('../model/Consultantdetails')


const router = express.Router();

// create booking
// router.post("/",  async(req,res)=>{

   
// const newConsultantdetails= new Consultantdetails(req.body)
//     try{
// const savedConsultantdetails =await newConsultantdetails.save()
// res.status(200).json(savedConsultantdetails)
//    } 
//    catch(err){
//     res.status(500).json(err)
//    }
// });

// update booking
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
  
    
//list all reshedule datails


router.get("/all",  async(req,res ,next)=>{
    try {
      const selectallconsultantdetails = await Consultantdetails.find(req.body)
      res.status(200).json(selectallconsultantdetails);
    } catch (err) {
      next(err);
    }
  });



//keyword using select
router.get("/",  async(req,res ,next)=>{
    try {
        let filter ={};
        if(req.query.category){
        filter ={categories:req.query.category.split(',')}
        }
      const selectconsultantdetails = await Consultantdetails.find({categories:filter}).populate('category')
      res.status(200).json(selectconsultantdetails);
    } catch (err) {
      next(err);
    }
  });




router.get("/search/:key",async (req,resp)=>{
  let data = await Consultantdetails.find(
      {
          "$or":[
              
              {cateogory:{$regex:req.params.key}}
          ]
      }
  )
  resp.send(data);

})


router.get("/searchs/:keys",async (req,resp)=>{
  let data = await Consultantdetails.find(
      {
          "$or":[
              
              {name:{$regex:req.params.keys}}
          ]
      }
  )
  resp.send(data);

})





// router.get("/",(req,res)=>{
//     res.send("hello ,this is wwwauth end point")
// })


//storage 
const Storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  },
});

const upload =multer({
  storage:Storage
}).single('testImage')

router.post("/upload",(req,res)=>{
upload(req,res,(err)=>{
  if(err){
    console.log(err)
  }
  else{
    const newImage =new consultantimage({
      photo:{
        data:req.file.filename,
        contentType:('image/png' || 'image/jpg')

      }
    })
    newImage.save()
    .then(()=>res.send("sucessfully given the file")).catch(err=>console.log(err))
  }
})
})






// Retrieve reschdule from the database.
router.get("/uploadimageget/:id",  async(req,res ,next)=>{
      try {
        const uploadimageget = await consultantimage.findById(req.params.id);
        res.status(200).json(uploadimageget);
      } catch (err) {
        next(err);
      }
    });

module.exports = router;