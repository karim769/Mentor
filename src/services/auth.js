const bcrypt=require('bcrypt');

const Student =require('../models/Student');
const { genToken } = require('./tokens');


async function validateSignUp (studentInfo){


    try {

      const { firstName,lastName,parentName, nationalId, phone,classroom,governorate,password} = studentInfo;

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
       const newStudent=new Student({firstName,lastName,parentName,nationalId,phone,classroom,governorate,hashPassword});
       const savedItem = await newStudent.save();
       const payload={id:savedItem._id};
       const token=await genToken(payload);
       return {savedItem,message:'Sign up successfully',token};

    } catch (error) {

        throw error;
        
    }


}

async function validateLogIn(studentInfo) {
    
try {
    
  const {phone,password} =studentInfo;

  if(!phone||!password)

    throw {message:'This Filed required',status:400};
    

    const student = await Student.findOne({ phone:phone });

    if(!student)

      throw {message:'Try to sign up ',status:409};

     const match=await bcrypt.compare(password,student.hashPassword);

    if(!match)

      throw {message:'Incorrect password ',status:409};

      const payload={id:student._id};
      const token=await genToken(payload);
      return {student,message:'Log in successfully',token};


} catch (error) {
    
  throw error;
}

} 

module.exports={validateSignUp,validateLogIn};