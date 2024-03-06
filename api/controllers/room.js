import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { CreateError } from "../utils/error.js";


export const CreateRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    console.log(hotelId);
    console.log(req.body);
    

    try {
        // Yeni oda kaydediliyor
        const savedRoom = await newRoom.save();

        // Odaya ait id otel kaydına ekleniyor
        try {
            const hotel = await Hotel.findByPk(hotelId);
            if (!hotel) {
                throw CreateError(404, "Hotel not found");
            }
            await hotel.update({ $push: { rooms: savedRoom.id } });
            res.status(200).json(savedRoom);
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

export  const UpdateRoom =async (req,res,next) =>{
    try {
        const RoomId = req.params.id;
        const updatedRoom = await Room.update(req.body, {
            where: { id: RoomId }
        });
        res.status(200).json(updatedRoom);
    } catch (err) {
        //res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const DeleteRoom =async (req,res,next) =>{
    const roomId = req.params.id;
    try {
        const deletedRoom = await Room.destroy({
            where: { id: roomId }
        });
        if (!deletedRoom) {
            res.status(404).json({ message: "Silinecek room bulunamadı." });
            return;
        }
        res.status(200).json({ message: "Room başarıyla silindi." });
    } catch (err) {
        //res.status(500).json({ error: err.message });
        next(err)
    }
}

export  const FindRoom =async (req,res,next) =>{
    const roomId =req.params.id;
   // res.send(RoomId);
    try {
       
        const room = await Room.findByPk(roomId);
   
        if (!room) {
           return next(CreateError(401,"Yor are not auttenticated"));
        }
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err) 
    }
    
}
export  const FindAllRoom =async (req,res,next) =>{
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (err) {
       // res.status(500).json({ error: err.message });
        next(err)
    }
}
