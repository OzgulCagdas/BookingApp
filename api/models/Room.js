
import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Önceki adımda oluşturduğunuz bağlantıyı içe aktarın

const Room = sequelize.define('Room', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rooms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
 
  // Diğer sütunlar...
});

export default Room;
