import express from 'express'
const app = express();
import mysql from 'mysql2';
import config from './config.js';

import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const pool = mysql.createPool(config.database);
//middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500  
    const errorMesssage=err.errorMesssage ||  "Something went wrong"
    //return res.status(500).json("Hello error from handler")
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMesssage,
        stack: err.stack,
    })
})

/*
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu:', err);
    return;
  }
  console.log('MySQL veritabanına başarıyla bağlandı!');

  connection.query('SELECT * FROM nodetest', (err, rows) => {
    if (err) {
      console.error('Sorgu çalıştırılırken hata oluştu:', err);
      return;
    }
    console.log('Sonuçlar:', rows);
    connection.release();
  });
});
*/


app.listen (8800 ,()=>{console.log("backend connection succesfull!")})