const { validateSignUp, validateLogIn, validateGuardianSignUp, validateGuardianLogIn } = require("../services/auth");

async function studentSignUp(req,res,next) {
    
    try {
      
      const guardianToken=req.cookies.token;
       const result= await validateSignUp(req.body,guardianToken);

       res
        .status(201)
      .json(result.message);
       } catch (err) {
        next(err);
       }

}

async function studentLogIn(req,res,next) {
    
    try {
        
       const result=await validateLogIn(req.body);
       res
       .cookie('token', result.token, {
        httpOnly: true,      // Ensure cookie is not accessible via JavaScript
      })
      .status(201)
      .json(result.message);
    } catch (err) {

        next(err);
    }

}

async function guardianSignUp(req,res,next) {
  
  try {

    const result= await validateGuardianSignUp(req.body)

    res
    .cookie('token', result.token, {
     httpOnly: true,      // Ensure cookie is not accessible via JavaScript
   })
   .status(201)
   .json(result.message);
    
  } catch (error) {
    
    next(error);
  }

}

async function guardianLogIn(req,res,next) {
  
  try {
    
    const result=await validateGuardianLogIn(req.body);
    res
    .cookie('token', result.token, {
     httpOnly: true,      // Ensure cookie is not accessible via JavaScript
   })
   .status(201)
   .json(result.message);

  } catch (error) {
    
    next(error)
  }

}


module.exports={studentSignUp,studentLogIn,guardianLogIn,guardianSignUp};