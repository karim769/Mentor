const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


async function genToken(payload) {
    
try {

 const token=await jwt.sign(payload,process.env.SECRET_KEY);
    
 if(!token)
    throw new Error('invalid generate token');

 return token;

} catch (error) {
    
    throw error;
}


}


module.exports={genToken};