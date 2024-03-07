import express from "express";
import { CreateRoom,DeleteRoom, FindRoom,FindAllRoom, UpdateRoom } from "../controllers/room.js";
import { verifyToken ,verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelId", verifyAdmin, CreateRoom)
// update data
router.put("/:id",verifyAdmin, UpdateRoom)
// delete
router.delete("/:id/:hotelId",verifyAdmin, DeleteRoom)
// get
router.get("/:id",verifyUser, FindRoom)
// get all
router.get("/",verifyAdmin, FindAllRoom)

export default router;
