import express from "express";
import { DeleteHotel, FindHotel,FindAllHotel, UpdateHotel, CreateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

/// create data
router.post("/", verifyAdmin, CreateHotel)
/*
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/

/// update data
router.put("/:id",verifyAdmin, UpdateHotel)
/*
router.put("/:id", async (req, res) => {
    try {
        const hotelId = req.params.id;
        const updatedHotel = await Hotel.update(req.body, {
            where: { id: hotelId }
        });
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

*/
// delete
router.delete("/:id",verifyAdmin, DeleteHotel)

/*
router.delete("/:id", async (req, res) => {
    const hotelId = req.params.id;
    try {
        const deletedHotel = await Hotel.destroy({
            where: { id: hotelId }
        });
        if (!deletedHotel) {
            res.status(404).json({ message: "Silinecek otel bulunamadı." });
            return;
        }
        res.status(200).json({ message: "Otel başarıyla silindi." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/
// get all
router.get("/", FindAllHotel)
/*
router.get("/", async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/

// get

router.get("/:id", FindHotel)
/*
router.get("/:id", async (req, res,next) => {
    const hotelId ="xxxxx" //req.params.id;
    try {
       
        const hotel = await Hotel.findByPk(hotelId);
   
        if (!hotel) {
           return next(CreateError(401,"Yor are not auttenticated"));
        }
        res.status(200).json(hotel);
    } catch (err) {
       // res.status(500).json({ error: err.message });
       next(err) 
    }
});
*/



export default router;
