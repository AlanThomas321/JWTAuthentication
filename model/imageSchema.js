const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    image:{
        data:Buffer,
        contentType:String
    }
});

module.exports = imageModel = mongoose.model('imageModel',imageSchema)