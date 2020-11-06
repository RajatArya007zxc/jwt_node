const mongoose=require('mongoose')
const {isEmail}=require('validator')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please Enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please Enter a Valid Email'] 
    },
    password:{
        type:String,
        required:[true, 'Please Enter Password'],
        minlength:[6,'Minimum Password length is 6 character']

    }
})

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;


//the validator library only useful for string