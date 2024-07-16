//importing 
var express=require("express");
const nocache = require('nocache');


var router=express.Router();


router.use(nocache())


const credential={
    email:"admin@gmail.com",
    password:"Admin@123"
}

//routing login page
router.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect("/dashboard")
    }else{
        res.render('base',{titl:"Login Page",error:"",email:""})
    }
})

//login user
router.post('/login',(req,res)=>{
    console.log("reached ");
    let email=req.body.email
    let pass=req.body.password

//regex pattern

    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
   const passPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!emailPattern.test(email)){
        res.render('base',{email,titl:"Login Page",error:"Invalid email"})
    }
    if(!passPattern.test(pass)){
        res.render('base',{email,titl:"Login Page",error:"Invalid password"})
    }
    if(req.body.email==credential.email&& req.body.password==credential.password){
req.session.user=req.body.email;

res.redirect('/dashboard');
    }
    else{
        res.render('base',{titl:"Login Page",error:"Invalid credentials",email:""})
    }


});
//rout for dashboard

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})

    }
    else{
        res.redirect("/")
    }
})
router.get('/logout',(req,res)=>{
   req.session.destroy()
   res.redirect("/")
})


module.exports=router;






