import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Önceki adımda oluşturduğunuz bağlantıyı içe aktarın

const Room = sequelize.define('rooms', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  maxPeople: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomNumbers:[{number: Number,unavailableDates:{type: [Date]}}],
  },
  {timestamps:true}
);

/*
[
  {number:101,unavailableDates:[01.05.2023,02.05.2023]},
  {number:102,unavailableDates:[01.05.2023,02.05.2023]},
]
*/
export default Room;
