module.exports.signup_get=(req,res)=>{
    res.render('signup')
}

module.exports.login_get=(req,res)=>{
    res.render('login')
}


module.exports.signup_post=(req,res)=>{

    //now destructuring the data comming from the req
    const {email,password}=req.body
    res.render('new signup')
}


module.exports.login_post=(req,res)=>{
    // console.log(req.body)

    //now destructuring the data comming from the req
    const {email,password}=req.body
    res.send('user login')
}