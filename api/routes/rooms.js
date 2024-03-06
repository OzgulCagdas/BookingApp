import express from "express";
import Room from "../models/Room.js";

const router = express .Router();

router.post("/",async (req,res) => {
const newRoom = new Room(req.body)
    try {
        const savedHotel= await newRoom.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        err.status(500).json(err)
        
    }
})
export default router