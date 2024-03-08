import Hotel from "../models/Hotel.js"
import { CreateError } from "../utils/error.js";
import { QueryTypes } from 'sequelize'; // QueryTypes'ı içe aktarın

import sequelize from '../database.js'; // Önceki adımda oluşturduğunuz bağlantıyı içe aktarın

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
export const FindAllHotel = async (req, res, next) => {
    const featured = req.query.featured === 'true' ? true : false;
    const min = req.query.min;
    const max = req.query.max;
    const limit = parseInt(req.query.limit);

    try {
        let sql = 'SELECT * FROM Hotels WHERE featured = ?';
        let params = [featured];

        // Eğer min ve max belirtilmişse, cheapestPrice aralığını da ekleyelim
        if (min !== undefined && max !== undefined) {
            sql += ' AND cheapestPrice BETWEEN ? AND ?';
            params.push(min, max);
        }

        // Son olarak, limit belirtilmişse, sorguya limit ekleyelim
        if (!isNaN(limit)) {
            sql += ' LIMIT ?';
            params.push(limit);
        }

        const hotels = await sequelize.query(sql, {
            replacements: params,
            type: QueryTypes.SELECT
        });
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};
    /*
    const { max, min, ...others } = req.query;
    const featured = req.query.featured === 'true' ? true : false;
        
    try {
        const options = {
            ...others,
            cheapestPrice : {$gt:1,$lt:999},
            limit: parseInt(req.query.limit), // limit değerini query'den alıp tamsayıya dönüştür
            where: { featured: featured },
        };
        console.log(min);
        console.log(max);
        
        if (min && max) {
            options.where.cheapestPrice = { $between: [min, max] };
     
        }
        const hotels = await Hotel.findAll(options);

        res.status(200).json(hotels);
    } catch (err) {
       // res.status(500).json({ error: err.message });
        next(err)
    }
    */


export const CountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");  // gelen sorgudaki istanbul,izmir,bursa bunu dizi haline cevirir ["istanbul","izmir","bursa"]
    try {
        const list = await Promise.all(cities.map(async city => { // promise.all her  sehir icin  asenkron calisir .cities.map() ile her bir şehir üzerinde döngü oluşturulur. map metodu, her bir şehir için bir dizi oluşturur ve her bir dizi öğesi için bir asenkron işlev çalıştırır.
            const count = await Hotel.count({ where: { city: city } });
            return count;
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export  const CountByType=async (req,res,next) =>{
    try {
        const hotelCount = await Hotel.count({ where: { type: "hotel" } });
        const apartmentCount = await Hotel.count({ where: { type: "apartment" } });
        const resortCount = await Hotel.count({ where: { type: "resort" } });
        const villaCount = await Hotel.count({ where: { type: "villa" } });
        const cabinCount = await Hotel.count({ where: { type: "cabin" } });
        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"apartment", count:apartmentCount},
            {type:"resort", count:resortCount},
            {type:"villa", count:villaCount},
            {type:"cabin", count:cabinCount},
        ]); 
    } catch (err) {
        next(err)
    }
}