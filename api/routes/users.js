import express from "express";
import { DeleteUser, FindUser,FindAllUser, UpdateUser } from "../controllers/user.js";
import { verifyToken ,verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
/*
router.get("/checkauthentication",verifyToken,(req,res, next) =>{
    res.send("Hello user you are loggin ")

})

router.get("/checkuser/:id",verifyUser,(req,res, next) =>{
    res.send("Hello user you are loggin and you can delete your account ")

})

router.get("/checkadmin/:id",verifyAdmin,(req,res, next) =>{
    res.send("Hello user you are loggin and you are admin  you can delete  ")

})
*/
/// update data
router.put("/:id",verifyUser, UpdateUser)
// delete
router.delete("/:id",verifyUser, DeleteUser)
// get
router.get("/:id",verifyUser, FindUser)
// get all
router.get("/",verifyAdmin, FindAllUser)

export default router;
