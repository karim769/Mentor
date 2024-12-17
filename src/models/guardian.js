const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const guardian= new Schema({

    name:{

        type:String,
        required:true
    },
    phone:{

        type:String,
        required:true,
        unique:true
    },
    relation:{

        type:String,
        required:true,
    },
    hashPassword:{

        type:String,
        required:true,
    }

});


module.exports=mongoose.model('Guardian',guardian);