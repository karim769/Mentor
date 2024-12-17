const bcrypt=require('bcrypt');

const Student =require('../models/Student');
const Guardian=require('../models/guardian');
const { genToken, getPayloadFromToken } = require('./tokens');


async function validateSignUp (studentInfo,token){


    try {

    if(!token)

      throw {message:"You can't reach this route try to log in",status:400} 

     const guardianPayload=await getPayloadFromToken(token);      

      const {firstName,lastName,parentName, nationalId, phone,classroom,governorate,password} = studentInfo;

      if(!firstName||!lastName||!parentName||!nationalId||!phone||!classroom||!governorate||!password)

        throw {message:'This Filed required',status:400};
        

      const student = await Student.findOne({
        $or: [
          { phone:phone },
          { nationalId: nationalId }
        ]
      });


      if(student){

        throw {message:'The phone or national number already exist',status:409};

      }

       const hashPassword= await bcrypt.hash(password,12);
       const guardianId=GuardianPayload.id;
       const newStudent=new Student({firstName,lastName,parentName,nationalId,phone,classroom,governorate,hashPassword,guardianId});
       const savedItem = await newStudent.save();
       return {savedItem,message:'Sign up successfully,Enter as student and log in'};

    } catch (error) {

        throw error;
        
    }


}

async function validateLogIn(studentInfo) {
    
try {
    
   return await logInByPhoneAndPassword(studentInfo,Student);

} catch (error) {
    
  throw error;
}

} 


async function validateGuardianSignUp(GuardianInfo) {
  
  try {

    const {name,phone,relation,password}=GuardianInfo;


    if(!name||!relation||!phone||!password)

      throw {message:'This Filed required',status:400};
      

    const guardian = await Guardian.findOne({phone:phone });


    if(guardian){

      throw {message:'The phone number already exist',status:409};

    }

    const hashPassword= await bcrypt.hash(password,12);
    const newGuardian=new Guardian({name,phone,relation,hashPassword});
    const savedItem = await newGuardian.save();
    const payload={id:savedItem._id};
    const token=await genToken(payload);
    return {savedItem,message:'Sign up successfully',token};


    
  } catch (error) {

    throw error;
    
  }

}


async function validateGuardianLogIn(guardianInfo) {
  

  try {
    
    return await logInByPhoneAndPassword(guardianInfo,Guardian);
 
 } catch (error) {
     
   throw error;
 }

}

async function logInByPhoneAndPassword(itemInfo,Item){

  try {
    
    const {phone,password} =itemInfo;
  
    if(!phone||!password)
  
      throw {message:'This Filed required',status:400};
      
  
      const item = await Item.findOne({ phone:phone });
  
      if(!item)
  
        throw {message:'Try to sign up ',status:409};
  
       const match=await bcrypt.compare(password,item.hashPassword);
  
      if(!match)
  
        throw {message:'Incorrect password ',status:409};
  
        const payload={id:item._id};
        const token=await genToken(payload);
        return {item,message:'Log in successfully',token};
  
  
  } catch (error) {
      
    throw error;
  }

}

module.exports={
  validateSignUp,
  validateLogIn,
  validateGuardianLogIn,
  validateGuardianSignUp
};