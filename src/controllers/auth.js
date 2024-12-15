const { validateSignUp, validateLogIn } = require("../services/auth");

async function signUp(req,res,next) {
    
    try {
  
       const result= await validateSignUp(req.body);

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

async function logIn(req,res,next) {
    
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

module.exports={signUp,logIn};