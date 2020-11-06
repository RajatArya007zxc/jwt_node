
///// Now we rquire the userModel from the user.js for accessing the schema of database db
const userModel=require('../models/user');

/// the response we will getting "error ,user not created" if we add validator also .It will solve by the adding the function and improve the catch{}

/// 
const handleError=(err)=>{

     console.log(err.message,err.code)
     
     let errors={email:'',password:''};


 ///// duplicate error code
 ///// this is used when any one of them (from email and password) is wrong while putting
 if(err.code ===11000)
{
    errors.email="that email is Already exist"
    
    return errors;
}




     ////// ///// / / /
     //                  Validation Error
     if(err.message.includes('user validation failed')){ 
        //  console.log(err)
       // console.log(Object.values(err.errors))  //now we get the array

       Object.values(err.errors).forEach(({properties})=>{    //destructure e=> e.properties  to {properties}

        errors[properties.path] =properties.message
       })
     }
     return errors;
}


module.exports.signup_get=(req,res)=>{    
    res.render('signup')
}

module.exports.login_get=(req,res)=>{
    res.render('login')
}


module.exports.signup_post=async (req,res)=>{   //////// now we change this to async(below also) because we use await (because of user who is promise and wait for some time to exexute)


    //now destructuring the data comming from the req
    const {email,password}=req.body

    try{
const user=await userModel.create({email,password}) 

 res.status(201).json(user)  //201 success 
    }
    catch(err){
  
        //handleError(err);    // now we change this to variable for returning the value  (1) and change the (2)
        var errors=handleError(err);
        // console.log(err)
        // res.status(400).send('error ,user not created')   (2) send back to json
         res.status(400).json({errors})
    }
    


}


module.exports.login_post=async (req,res)=>{
    // console.log(req.body)

    //now destructuring the data comming from the req
    const {email,password}=req.body
    res.send('user login')
}

















/*

helpful resource



it is the op of  Object.values(err.errors).forEach(({properties})=>{  console.log(properties)})


user validation failed: email: Please Enter a Valid Email, password: Minimum Password length is 6 character undefined
{
  message: 'Please Enter a Valid Email',
  type: 'user defined',
  validator: <ref *1> [Function: isEmail] { default: [Circular *1] },
  path: 'email',
  value: 'sd'
}
{
  validator: [Function (anonymous)],
  message: 'Minimum Password length is 6 character',
  type: 'minlength',
  minlength: 6,
  path: 'password',
  value: '12'
}





*/

