const express=require('express');

const router=express.Router();

const { guardianSignUp, guardianLogIn, studentSignUp, studentLogIn}=require('../controllers/auth');

router.post('/studentsignup',(req,res,next)=>{
  studentSignUp(req,res,next);
})

router.post('/studentlogin',(req,res,next)=>{

    studentLogIn(req,res,next);
    
    })

router.post('/guardiansignup',(req,res,next)=>{
  
  guardianSignUp(req,res,next);

})

router.post('/guardianlogin',(req,res,next)=>{
  
  guardianLogIn(req,res,next);

})

module.exports=router;

