const mongoose = require("mongoose");
const ConsultantdetailsSchema = new mongoose.Schema(
  {
  
 
    image:{
      data:Buffer,
      contentType:String,

     },
    


    
    
  }
  


);

module.exports = mongoose.model('Consultantdetailsimage',ConsultantdetailsSchema);