const express=require('express');

const router=express.Router();

const {signUp,logIn}=require('../controllers/auth');

router.post('/signup',(req,res,next)=>{
  signUp(req,res,next);
})

router.post('/login',(req,res,next)=>{

    logIn(req,res,next);
    
    })

module.exports=router;

