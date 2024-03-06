import jwt from "jsonwebtoken"
import {CreateError}  from "./error.js"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(CreateError(401,"You are not authenticated!"))
    }
    jwt.verify(token,process.env.JWT,(err,user) => {
        if(err) return next(CreateError(403,"Token is not valid!"))
        console.log("sssss");
    console.log(user);
        req.user=user; // yeni propetiy tanimliyoruz bu durumda req.hello=user da diyebiliriz 
       // console.log(req);
        next()
    })

}


export const verifyUser = (req,res,next) => {
    
   // console.log(req.user.id);
    verifyToken(req,res,()=>{
       // console.log("asasas");
        //console.log(req.user.id);
        //console.log(req.params.id);
        if(String(req.user.id) === req.params.id || req.user.is_admin){
            //console.log("ssssaSDASAsd");
            next()
        }else {
            return next(CreateError(403,"You are not authorized!"))
        }
    })

}

export const verifyAdmin = (req,res,next) => {
    
    // console.log(req.user.id);
     verifyToken(req,res,()=>{
        // console.log("asasas");
         //console.log(req.user.id);
         //console.log(req.params.id);
         if(req.user.is_admin){
             //console.log("ssssaSDASAsd");
             next()
         }else {
             return next(CreateError(403,"You are not authorized!"))
         }
     })
 
 }