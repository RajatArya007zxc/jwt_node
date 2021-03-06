const mongoose=require('mongoose')
const {isEmail}=require('validator')

const bcrypt =require('bcrypt');

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


//////// IMPORTANT note always use next() at the end whenever we used mongoose middleware and hooks

//fire a function after doc saved into db
userSchema.post('save',(doc,next)=>{    //// after saving the data(save) the post is called
    //console.log(doc)
    next();
})

////// Fire a function before

userSchema.pre('save',async function(next){

   // console.log("before created",this)



   const saltCreate=await bcrypt.genSalt();
  
  this.password=await bcrypt.hash(this.password,saltCreate);



   //// for hasing download bcrypt lib
    next();

})

//// static method to login user

userSchema.statics.login =async function(email,password){   /// "login" whaterver we write but itss used when login
    const user=await this.findOne({email})  /// this means the userSchema 

    if(user){

       const auth=await bcrypt.compare(password,user.password)
       if(auth){
           return user
       }
       throw Error('password not correct ')

    }
    throw Error('incorrect email')
}


const userModel=mongoose.model('user',userSchema);

module.exports=userModel;


//the validator library only useful for string