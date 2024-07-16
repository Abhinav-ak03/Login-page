
//importing dependencies
const express=require('express');
const path=require('path');
const session=require("express-session");
const{v4:uuidv4}=require("uuid");
const nocache=require("nocache")
const router=require('./router')




const app=express();
//port setting

const port=process.env.port||3000;
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


//session managing
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

//routing

app.use('/',router);


//server starting

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000 ")});













