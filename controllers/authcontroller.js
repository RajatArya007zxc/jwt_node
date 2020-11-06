
///// Now we rquire the userModel from the user.js for accessing the schema of database db
const userModel=require('../models/user');


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

         console.log(err)
         res.status(400).send('error ,user not created')
    }
    


}


module.exports.login_post=async (req,res)=>{
    // console.log(req.body)

    //now destructuring the data comming from the req
    const {email,password}=req.body
    res.send('user login')
}