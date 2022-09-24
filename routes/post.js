const router = require("express").Router();
// const { publicPosts, privatePosts } = require("../db")
// const checkAuth = require("../middleware/checkAuth")
const verify = require('./verifytoken')

router.get('/public',(req,res) =>{
    res.json(publicPosts)
})

router.get('/private',verify, (req,res) =>{
    res.json({
        posts:{
            title:'my first post',
            description:'private post'
        }
    })
})


module.exports = router