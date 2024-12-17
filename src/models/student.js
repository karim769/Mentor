const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const student= new Schema({

    firstName:{

        type:String,
        required:true
    },
    lastName:{

        type:String,
        required:true
    },
    parentName:{

        type:String,
        required:true
    },
    nationalId:{

        type:String,
        required:true,
        unique:true

    },
    phone:{

        type:String,
        required:true,
        unique:true
    },
    classroom:{

        type:String,
        required:true,
    },
    governorate:{

        type:String,
        required:true,
    },
    hashPassword:{

        type:String,
        required:true,
    },
    guardianId: { 
        type: Schema.Types.ObjectId,   // Reference to another model
        ref: 'Guardian'               // The model you are referencing (Guardian)
    }

});


module.exports=mongoose.model('Student',student);