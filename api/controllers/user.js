import User from "../models/User.js"
import { CreateError } from "../utils/error.js";

export  const UpdateUser =async (req,res,next) =>{
    try {
        console.log( req.body);
        const UserId = req.params.id;
        const updatedUser = await User.update(req.body, {
            where: { id: UserId }
        });
        console.log(updatedUser);
        if (!updatedUser) {

            res.status(404).json({ message: "Kayit  bulunamadı." });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        //res.status(500).json({ error: err.message });
        next(err)   
    }
}

export  const DeleteUser =async (req,res,next) =>{
    const UserId = req.params.id;
    try {
        const deletedUser = await User.destroy({
            where: { id: UserId }
        });
        if (!deletedUser) {
            res.status(404).json({ message: "Silinecek otel bulunamadı." });
            return;
        }
        res.status(200).json({ message: "Otel başarıyla silindi." });
    } catch (err) {
        //res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const FindUser =async (req,res,next) =>{
    const UserId =req.params.id;
   // res.send(UserId);
    try {
       
        const User = await User.findByPk(UserId);
   
        if (!User) {
           return next(CreateError(401,"Yor are not auttenticated"));
        }
        res.status(200).json(User);
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err) 
    }
    
}
export  const FindAllUser =async (req,res,next) =>{
    try {
        const Users = await User.findAll();
        res.status(200).json(Users);
    } catch (err) {
       // res.status(500).json({ error: err.message });
        next(err)
    }
}