import Hotel from "../models/Hotel.js"
import { CreateError } from "../utils/error.js";

export  const CreateHotel =async (req,res,next) =>{
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
      //  res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const UpdateHotel =async (req,res,next) =>{
    try {
        const hotelId = req.params.id;
        const updatedHotel = await Hotel.update(req.body, {
            where: { id: hotelId }
        });
        res.status(200).json(updatedHotel);
    } catch (err) {
        //res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const DeleteHotel =async (req,res,next) =>{
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
        //res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const FindHotel =async (req,res,next) =>{
    const hotelId =req.params.id;
   // res.send(hotelId);
    try {
       
        const hotel = await Hotel.findByPk(hotelId);
   
        if (!hotel) {
           return next(CreateError(401,"Yor are not auttenticated"));
        }
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err) 
    }
    
}
export  const FindAllHotel =async (req,res,next) =>{
    try {
        const hotels = await Hotel.findAll();
        res.status(200).json(hotels);
    } catch (err) {
       // res.status(500).json({ error: err.message });
        next(err)
    }
}