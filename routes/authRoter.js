
const express=require('express');
const authcontroller =require('../controllers/authcontroller');

const router=express.Router();

router.get('/signup',authcontroller.signup_get)
router.post('/signup',authcontroller.signup_post)


router.get('/login',authcontroller.login_get)
router.post('/login',authcontroller.login_post)

module.exports=router;