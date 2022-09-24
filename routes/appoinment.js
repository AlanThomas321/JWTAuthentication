const router = require("express").Router();

router.get('/new',(req,res) =>{
    res.render('appoinment')
})

module.exports = router