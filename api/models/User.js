
import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Önceki adımda oluşturduğunuz bağlantıyı içe aktarın

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // E-posta adresinin benzersiz olmasını sağlar
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // E-posta adresinin benzersiz olmasını sağlar
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Varsayılan olarak kullanıcıların yönetici olmadığını belirtir
  },
  
});

export default User;