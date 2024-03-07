import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Önceki adımda oluşturduğunuz bağlantıyı içe aktarın

const Hotel = sequelize.define('Hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cheapestPrice: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rooms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
 
  // Diğer sütunlar...
});

export default Hotel;
/*import { DataTypes } from 'sequelize';
import sequelize from '../config.js'; // Veritabanı bağlantısını içe aktarın

const Hotel = sequelize.define('Hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  rooms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  cheapestPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Modelin senkronize edilmesi (veritabanına eklenmesi)
async function syncModel() {
  try {
    await Hotel.sync({ force: true }); // force: true, mevcut tabloyu siler ve yeniden oluşturur
    console.log('Model senkronize edildi.');
  } catch (error) {
    console.error('Model senkronize edilirken hata oluştu:', error);
  }
}

// syncModel(); // Modeli senkronize etmek için gerekiyorsa çağırın

export default Hotel;
*/