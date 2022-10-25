const express = require('express');
const imageModel = require('../model/imageSchema'); 
const multer = require('multer') 

const imageroute = express.Router();
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
});
const upload = multer({storage:Storage}).single('testImage');

 
imageroute.post('/image/upload',(req,res) => {
     upload(req,res,(err) => {
        if(err){
            console.log(err)
        }
        else{
            const newImage = new imageModel({
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
imageroute.get('/image/find/:id',async (req, res) => { 
    try {
        const findImage = await imageModel.findById(req.params.id);
        res.status(200).json(findImage);
      } catch (err) {
        next(err);
      }
   
});

 
module.exports = imageroute